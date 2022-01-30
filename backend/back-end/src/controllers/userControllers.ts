import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateTokens';
import User from '../models/UserModel';
import throwError from '../utils/throwError';
import express from 'express';

interface client extends Request {
  client: string;
}

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      message: 'Successfully Logged in',
      data: [
        {
          _id: user._id,
          name: user.username,
          email: user.email,
          token: generateToken(user._id),
        },
      ],
      success: true,
    });
  } else {
    res.status(401);
    throwError('Invalid email or password', 401);
  }
});

export { authUser };
