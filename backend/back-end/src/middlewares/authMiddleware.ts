import jwt, { decode } from 'jsonwebtoken';
import express from 'express';
import { Request } from 'express';
import User from '../models/UserModel';

const protect = async (req: Request, res: express.Response, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(req);
      req = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized , token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Unauthorized !');
  }
  //   next();
};

export default protect;
