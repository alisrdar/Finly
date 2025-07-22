import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.js';
import { Request, Response, NextFunction } from 'express';

interface jwtPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token not Found!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    const user = await User.findById((decoded as jwtPayload).id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized, user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token!' });
  }
};
