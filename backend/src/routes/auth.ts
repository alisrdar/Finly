import express from 'express'
import {registerUser, loginUser, getUser} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';
import { UploadImage } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/getUser', protect, getUser);

router.post('/upload-image', upload.single('image'), UploadImage );

export default router