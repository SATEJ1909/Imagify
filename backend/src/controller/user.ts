import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';
import userModel from '../models/userModel';
import transactionModel from '../models/transactionModel';
import { signupSchema, loginSchema, paymentSchema, verifyPaymentSchema } from '../validation';

// Plan configuration
const PLANS = {
    Basic: { credits: 100, amount: 10 },
    Advanced: { credits: 500, amount: 50 },
    Business: { credits: 5000, amount: 250 },
} as const;

// Initialize Razorpay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input
        const parseResult = signupSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: parseResult.error.flatten().fieldErrors,
            });
            return;
        }

        const { name, email, password } = parseResult.data;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'Email already registered' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input
        const parseResult = loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: parseResult.error.flatten().fieldErrors,
            });
            return;
        }

        const { email, password } = parseResult.data;

        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: 'User not found' });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const userCredit = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'User found',
            user: {
                creditBalance: user.creditBalance,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Get credits error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const paymentRazorpay = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input
        const parseResult = paymentSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: parseResult.error.flatten().fieldErrors,
            });
            return;
        }

        const { planId } = parseResult.data;
        const userId = req.userId;

        const plan = PLANS[planId];
        if (!plan) {
            res.status(400).json({ success: false, message: 'Invalid plan' });
            return;
        }

        const transactionData = {
            userId,
            plan: planId,
            amount: plan.amount,
            credits: plan.credits,
            date: Date.now(),
        };

        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: plan.amount * 100, // Amount in paise
            currency: 'INR',
            receipt: newTransaction._id.toString(),
        };

        const order = await razorpayInstance.orders.create(options);

        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            order,
        });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const verifyRazor = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input
        const parseResult = verifyPaymentSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: parseResult.error.flatten().fieldErrors,
            });
            return;
        }

        const { razorpay_order_id } = parseResult.data;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);

            if (!transactionData) {
                res.status(404).json({ success: false, message: 'Transaction not found' });
                return;
            }

            if (transactionData.payment) {
                res.status(400).json({ success: false, message: 'Payment already processed' });
                return;
            }

            const userData = await userModel.findById(transactionData.userId);
            if (!userData) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }

            const newCreditBalance = userData.creditBalance + transactionData.credits;

            await userModel.findByIdAndUpdate(userData._id, { creditBalance: newCreditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            res.status(200).json({
                success: true,
                message: 'Payment successful',
                creditBalance: newCreditBalance,
            });
        } else {
            res.status(400).json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const getTransactionHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const transactions = await transactionModel
            .find({ userId, payment: true })
            .sort({ date: -1 })
            .limit(20);

        res.json({ success: true, transactions });
    } catch (error) {
        console.error('Transaction history error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

export const getUserStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        // Import dynamically to avoid circular dependency
        const imageHistoryModel = (await import('../models/imageHistoryModel')).default;

        const [transactionCount, imageCount] = await Promise.all([
            transactionModel.countDocuments({ userId, payment: true }),
            imageHistoryModel.countDocuments({ userId }),
        ]);

        res.json({
            success: true,
            stats: {
                creditBalance: user.creditBalance,
                imagesGenerated: imageCount,
                totalPurchases: transactionCount,
            },
        });
    } catch (error) {
        console.error('User stats error:', error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};