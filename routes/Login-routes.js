const express = require('express');
const LoginControllers = require('../controllers/Login-controllers')

const router = express.Router();

router.post('/login', LoginControllers.loginFn);

module.exports = router;