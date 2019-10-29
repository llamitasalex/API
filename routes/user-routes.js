const express = require('express');
const userCtrl = require('../controllers/user-controller').default;

const userRoutes = express.Router();

userRoutes.get('/', userCtrl.getUsers);
userRoutes.get('/:userId', userCtrl.getUser);
userRoutes.post('/', userCtrl.createUser);
userRoutes.post('/:mail', userCtrl.login);
userRoutes.put('/:userId', userCtrl.replaceUser);
userRoutes.patch('/:userId', userCtrl.updateUser);
userRoutes.delete('/:userId', userCtrl.deleteUser);

module.exports = userRoutes;
