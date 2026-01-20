import express from 'express';
import {
    generateImage,
    getImageHistory,
    getImageById,
    deleteImage,
    toggleImagePublic,
    getPublicGallery,
} from '../controller/image';
import { userAuth } from '../middleware/auth';

const imageRouter = express.Router();

// Public routes
imageRouter.get('/explore', getPublicGallery);

// Protected routes
imageRouter.post('/generateImage', userAuth, generateImage);
imageRouter.get('/history', userAuth, getImageHistory);
imageRouter.get('/:imageId', userAuth, getImageById);
imageRouter.delete('/:imageId', userAuth, deleteImage);
imageRouter.patch('/:imageId/toggle-public', userAuth, toggleImagePublic);

export default imageRouter;