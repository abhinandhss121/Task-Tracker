import express from 'express';
import { register, login, getCurrentUser, updateProfile, updatePassword } from '../controller/authController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require auth)
router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware, updateProfile);
router.put('/password', authMiddleware, updatePassword);

export default router;