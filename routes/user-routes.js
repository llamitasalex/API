const express = require('express');
const userCtrl = require('../controllers/user-controller');
const Token = require('../middleware/middleware');

const userRoutes = express.Router();

userRoutes.get('/', userCtrl.getUsers);
userRoutes.get('/:userId', userCtrl.getUser);
userRoutes.post('/', userCtrl.createUser);
userRoutes.post('/:mail', userCtrl.login);
userRoutes.put('/:userId', userCtrl.replaceUser);
userRoutes.patch('/:userId', userCtrl.updateUser);
userRoutes.delete('/:userId', userCtrl.deleteUser);
userRoutes.get('/me/token', Token.verifytk);

module.exports = userRoutes;
