const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const ErrorMsg = require("../models/Error");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new ErrorMsg(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const loginFn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new ErrorMsg(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new ErrorMsg(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
 // try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  // } catch (err) {
  //   const error = new ErrorMsg(
  //     "Could not log you in, please check your credentials and try again.",
  //     500
  //   );
  //   return next(error);
  // }

  if (!isValidPassword) {
    const error = new ErrorMsg(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username, email: existingUser.email, role: existingUser.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new ErrorMsg(
      "Logging in failed, please try again later.",
      403
    );
    return next(error);
  }

  res.json({
    token: token
  });
};

exports.getUsers = getUsers;
exports.loginFn = loginFn;
