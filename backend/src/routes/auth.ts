import express from 'express'
import {registerUser, loginUser, getUser} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';
import { UploadImage } from '../controllers/uploadController.js';

const authRoutes = express.Router();

authRoutes.post('/register',registerUser);

authRoutes.post('/login',loginUser);

authRoutes.get('/getUser', protect, getUser);

authRoutes.post('/upload-image', upload.single('image'), UploadImage );

export default authRoutes