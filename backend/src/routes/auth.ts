import express from 'express'
import {registerUser, loginUser, getUser} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';
import { UploadImage } from '../controllers/uploadController.js';

const authRouter = express.Router();

authRouter.post('/register',registerUser);

authRouter.post('/login',loginUser);

authRouter.get('/getUser', protect, getUser);

authRouter.post('/upload-image', upload.single('image'), UploadImage );

export default authRouter