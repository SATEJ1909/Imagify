import { z } from 'zod';

// User authentication schemas
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password too long'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Image generation schemas
export const generateImageSchema = z.object({
  prompt: z.string().min(3, 'Prompt must be at least 3 characters').max(1000, 'Prompt too long'),
  style: z.enum(['realistic', 'anime', 'painting', '3d']).optional().default('realistic'),
  aspectRatio: z.enum(['1:1', '16:9', '9:16']).optional().default('1:1'),
});

// Payment schemas
export const paymentSchema = z.object({
  planId: z.enum(['Basic', 'Advanced', 'Business'], {
    errorMap: () => ({ message: 'Invalid plan selected' }),
  }),
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, 'Order ID is required'),
});

// Type exports for use in controllers
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type GenerateImageInput = z.infer<typeof generateImageSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
