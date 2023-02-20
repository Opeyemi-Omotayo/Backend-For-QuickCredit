const express = require('express');
const LoginControllers = require('../controllers/Login-controllers')

const router = express.Router();

router.post('/signup', LoginControllers);