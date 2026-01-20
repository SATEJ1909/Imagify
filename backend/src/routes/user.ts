import express from 'express';
import {
    signup,
    login,
    userCredit,
    paymentRazorpay,
    verifyRazor,
    getTransactionHistory,
    getUserStats,
} from '../controller/user';
import { userAuth } from '../middleware/auth';

const userRouter = express.Router();

// Public routes
userRouter.post('/signup', signup);
userRouter.post('/login', login);

// Protected routes
userRouter.get('/credits', userAuth, userCredit);
userRouter.post('/razorpay', userAuth, paymentRazorpay);
userRouter.post('/verifyPayment', userAuth, verifyRazor);
userRouter.get('/transactions', userAuth, getTransactionHistory);
userRouter.get('/stats', userAuth, getUserStats);

export default userRouter;