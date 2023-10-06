const express = require('express');

const userController = require('../conterollers/usersController');
const router = express.Router();

const verfiyToken = require('../verifyToken');
router.route('/')
    .get(verfiyToken, userController.getAllUsers)

router.route('/register')
    .post(userController.register)

router.route('/login')
    .post(userController.login)

 module.exports =router;