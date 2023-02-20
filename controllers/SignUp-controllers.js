const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SignUp = require('../models/Signup');
const ErrorMsg = require('../models/Error');

const SignupFn = async(req, res, next) => {
    const {username, name, email, number, password, image } = req.body;
    
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

  const createdUser = new SignUp({
   username,
    name,
    email,
    number,
    password: hashedPassword,
    image
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new ErrorMsg(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(201).json({ email: createdUser.email});
};

exports.SignupFn = SignupFn;