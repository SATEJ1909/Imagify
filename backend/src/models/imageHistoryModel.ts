import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IImageHistory extends Document {
    userId: Types.ObjectId;
    prompt: string;
    imageUrl: string;
    style: 'realistic' | 'anime' | 'painting' | '3d';
    aspectRatio: '1:1' | '16:9' | '9:16';
    isPublic: boolean;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}

const imageHistorySchema = new Schema<IImageHistory>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            index: true,
        },
        prompt: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        style: {
            type: String,
            enum: ['realistic', 'anime', 'painting', '3d'],
            default: 'realistic',
        },
        aspectRatio: {
            type: String,
            enum: ['1:1', '16:9', '9:16'],
            default: '1:1',
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient user gallery queries
imageHistorySchema.index({ userId: 1, createdAt: -1 });

// Index for public gallery browsing
imageHistorySchema.index({ isPublic: 1, createdAt: -1 });

const imageHistoryModel =
    mongoose.models.imageHistory ||
    mongoose.model<IImageHistory>('imageHistory', imageHistorySchema);

export default imageHistoryModel;
