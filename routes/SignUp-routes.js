const express = require("express");
const { check } = require("express-validator");

const SignupControllers = require("../controllers/SignUp-controllers");
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.post(
  "/registration",
  fileUpload.single('image'),
  [
    check("username").not().isEmpty(),
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("number").isNumeric(),
    check("password").isLength({ min: 6 }),
  ],
  SignupControllers.SignupFn
);

//router.post("/loanrequests", SignupControllers.loanRequest);

module.exports = router;
