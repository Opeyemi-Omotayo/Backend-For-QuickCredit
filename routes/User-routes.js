const express = require('express');
const UserControllers = require('../controllers/User-controllers')

const router = express.Router();

router.post('/user', UserControllers.getUserById);

module.exports = router;