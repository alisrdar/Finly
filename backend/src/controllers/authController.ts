import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User, { IUser } from '../models/User.js' //IUser is TS interface

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '1hr' })
}

// interface AuthenticatedRequest extends Request {
//   user: IUser;
// }


export const registerUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;

        const exisingUser = await User.findOne({ email });
        if (exisingUser) {
            return res.status(400).json({ message: "User Already exists!" })
        }

        // Adding the user 
        const user = await User.create(
            {
                fullName,
                email,
                password
            });
        await user.save();

        const token = generateToken(user._id as string);

        res.status(201).json({
            message: "User registered Successfully",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl || null
            }
        })
    } catch (error) {
        res.status(500).json({ message: "server Error", error })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // checking if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found!" })
        }

        // Authicating the user
        const isMatch = await user?.comparePassword(password);
        if (!isMatch)
            res.status(400).json({ message: "Invalid emali or Password" });

        const token = generateToken(user?._id as string);
        // response
        res.status(200).json(
            {
                message: "Login Successfull!",
                token,
                user: {
                    id: user?._id,
                    fullName: user?.fullName,
                    email: user?.email,
                    profileImageUrl: user?.profileImageUrl || null,
                },
            }
        )
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
export const getUser = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user)
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Server error",
                error
            })
    }
}

