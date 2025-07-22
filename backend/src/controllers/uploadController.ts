import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary.js";

export const UploadImage = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No File Uploaded!" })
        }

        // buffer
        const base64 = file.buffer.toString('base64');
        const dataUrl = `data:${file.mimetype};base64,${base64}`;

        // upload to cloudinary
        const result = await cloudinary.uploader.upload(dataUrl, {
            folder: 'Finley'
        });

        return res.status(200).json({
            message: 'Image uploaded successfully',
            url: result.secure_url
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Image upload failed',
            error
        })
    }
}
