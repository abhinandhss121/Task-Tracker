// import jwt from 'jsonwebtoken';
// import User from '../models/usermodel.js';


// const authMiddleware = async (req, res, next) => {
//   try {
//     // 1. Get token from header
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'No token provided' });
//     }

//     // 2. Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // 3. Find user and attach to request
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error('JWT Error:', err.message);
//     res.status(401).json({ 
//       success: false, 
//       message: 'Not authorized, token failed' 
//     });
//   }
// };

// export default authMiddleware;
import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

import User from '../models/user.js';


const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user and attach to request
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    res.status(401).json({ 
      success: false, 
      message: 'Not authorized, token failed' 
    });
  }
};

export default authMiddleware;