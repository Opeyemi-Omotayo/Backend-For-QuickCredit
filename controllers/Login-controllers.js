const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const ErrorMsg = require("../models/Error");

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

  isValidPassword = await bcrypt.compare(password, existingUser.password);

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
      {
        userId: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role
      },
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
    userId: existingUser.id,
    token: token,
  });
};

exports.loginFn = loginFn;
