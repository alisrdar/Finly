// src/utils/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Debug: Print all environment variables
console.log('=== Environment Variables Debug ===');
console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('CLOUDINARY')));
console.log('CLOUDINARY_CLOUD_NAME:', `"${process.env.CLOUDINARY_CLOUD_NAME}"`);
console.log('CLOUDINARY_API_KEY:', `"${process.env.CLOUDINARY_API_KEY}"`);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '"***SET***"' : '"UNDEFINED"');
console.log('====================================');

export default cloudinary;