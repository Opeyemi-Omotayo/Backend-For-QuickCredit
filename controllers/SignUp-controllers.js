const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const ErrorMsg = require('../models/Error');

const SignupFn = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorMsg('Invalid inputs passed, please check your data.', 422)
    );
  }

    const {username, name, email, number, password, image , role} = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new ErrorMsg(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new ErrorMsg(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }
    
 let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new ErrorMsg(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
   username,
    name,
    email,
    number,
    image,
    password: hashedPassword,
    role
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new ErrorMsg(
      'Signing up failed,please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '5h' }
    );
  } catch (err) {
    const error = new ErrorMsg(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }


  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

exports.SignupFn = SignupFn;