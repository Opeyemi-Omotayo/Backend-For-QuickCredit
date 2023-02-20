const express = require('express');
const SignupControllers = require('../controllers/SignUp-controllers')

const router = express.Router();

router.post('/signup', SignupControllers.SignupFn);

module.exports = router ;