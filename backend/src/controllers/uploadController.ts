// backend/src/controllers/uploadController.ts
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";

export const UploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No File Uploaded!" });

    const base64 = file.buffer.toString("base64");
    const dataUrl = `data:${file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUrl, { folder: "Finley" });

    // Persist to DB
    const updatedUser = await User.findByIdAndUpdate(
      req.user!.id,
      { profileImageUrl: result.secure_url },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: "Image upload failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};