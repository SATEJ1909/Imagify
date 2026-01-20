import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import userModel from '../models/userModel';
import imageHistoryModel from '../models/imageHistoryModel';
import { generateImageSchema } from '../validation';

export const generateImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        // Validate input
        const parseResult = generateImageSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: parseResult.error.flatten().fieldErrors,
            });
            return;
        }

        const { prompt, style, aspectRatio } = parseResult.data;

        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        if (user.creditBalance < 1) {
            res.status(400).json({
                success: false,
                message: 'Insufficient credits',
                creditBalance: user.creditBalance,
            });
            return;
        }

        // Enhance prompt with style if provided
        let enhancedPrompt = prompt;
        if (style && style !== 'realistic') {
            const styleModifiers: Record<string, string> = {
                anime: 'anime style, vibrant colors, detailed illustration',
                painting: 'oil painting style, artistic, textured brushstrokes',
                '3d': '3D render, photorealistic lighting, octane render',
            };
            enhancedPrompt = `${prompt}, ${styleModifiers[style]}`;
        }

        const formData = new FormData();
        formData.append('prompt', enhancedPrompt);

        const apiKey = process.env.CLIPDROP_API;
        if (!apiKey) {
            console.error('CLIPDROP_API key is not defined');
            res.status(500).json({ success: false, message: 'Server configuration error' });
            return;
        }

        const response = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    'x-api-key': apiKey,
                    ...formData.getHeaders(),
                },
                responseType: 'arraybuffer',
                timeout: 60000, // 60 second timeout
            }
        );

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct credit
        const newCreditBalance = user.creditBalance - 1;
        await userModel.findByIdAndUpdate(user._id, { creditBalance: newCreditBalance });

        // Save to image history
        const savedImage = await imageHistoryModel.create({
            userId: user._id,
            prompt,
            imageUrl: resultImage,
            style: style || 'realistic',
            aspectRatio: aspectRatio || '1:1',
        });

        res.json({
            success: true,
            message: 'Image generated successfully',
            creditBalance: newCreditBalance,
            image: resultImage,
            imageId: savedImage._id,
            metadata: {
                prompt,
                style: style || 'realistic',
                aspectRatio: aspectRatio || '1:1',
            },
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('ClipDrop API error:', error.response?.status, error.message);
            if (error.response?.status === 401) {
                res.status(500).json({ success: false, message: 'Image generation service unavailable' });
                return;
            }
            if (error.response?.status === 429) {
                res.status(429).json({ success: false, message: 'Rate limit exceeded, please try again later' });
                return;
            }
        }
        console.error('Generate image error:', error);
        res.status(500).json({ success: false, message: 'Failed to generate image' });
    }
};

export const getImageHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(parseInt(req.query.limit as string) || 12, 50); // Max 50 per page
        const skip = (page - 1) * limit;

        const [images, total] = await Promise.all([
            imageHistoryModel
                .find({ userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('-__v'),
            imageHistoryModel.countDocuments({ userId }),
        ]);

        res.json({
            success: true,
            images,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
                hasMore: page * limit < total,
            },
        });
    } catch (error) {
        console.error('Get image history error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch images' });
    }
};

export const getImageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { imageId } = req.params;

        const image = await imageHistoryModel.findOne({
            _id: imageId,
            userId,
        });

        if (!image) {
            res.status(404).json({ success: false, message: 'Image not found' });
            return;
        }

        res.json({ success: true, image });
    } catch (error) {
        console.error('Get image by ID error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch image' });
    }
};

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { imageId } = req.params;

        const image = await imageHistoryModel.findOneAndDelete({
            _id: imageId,
            userId,
        });

        if (!image) {
            res.status(404).json({ success: false, message: 'Image not found' });
            return;
        }

        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Delete image error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete image' });
    }
};

export const toggleImagePublic = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { imageId } = req.params;

        const image = await imageHistoryModel.findOne({
            _id: imageId,
            userId,
        });

        if (!image) {
            res.status(404).json({ success: false, message: 'Image not found' });
            return;
        }

        image.isPublic = !image.isPublic;
        await image.save();

        res.json({
            success: true,
            message: image.isPublic ? 'Image is now public' : 'Image is now private',
            isPublic: image.isPublic,
        });
    } catch (error) {
        console.error('Toggle image public error:', error);
        res.status(500).json({ success: false, message: 'Failed to update image' });
    }
};

export const getPublicGallery = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
        const skip = (page - 1) * limit;

        const [images, total] = await Promise.all([
            imageHistoryModel
                .find({ isPublic: true })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('prompt imageUrl style aspectRatio likes createdAt')
                .populate('userId', 'name'),
            imageHistoryModel.countDocuments({ isPublic: true }),
        ]);

        res.json({
            success: true,
            images,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
                hasMore: page * limit < total,
            },
        });
    } catch (error) {
        console.error('Get public gallery error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch gallery' });
    }
};