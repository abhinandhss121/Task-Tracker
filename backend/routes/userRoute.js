import express from 'express';
import { getCurrentUser, loginUser, registerUser, updatePassword, updateProfile } from "../controller/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter= express.Router();

//public links
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

//private links
userRouter.get('/me',authMiddleware,getCurrentUser);//without token now we cant access routes,hence imported authMiddleware
userRouter.put('/profile',authMiddleware,updateProfile);
userRouter.put('/password',authMiddleware,updatePassword);
export default userRouter;
