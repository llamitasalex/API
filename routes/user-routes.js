const express = require('express');
const userCtrl = require('../controllers/user-controller');
const auth = require('../middleware/auth');
const Log = require('../controllers/sing');

const userRoutes = express.Router();

userRoutes.get('/', userCtrl.getUsers);
userRoutes.get('/:userId', userCtrl.getUser);
userRoutes.post('/', userCtrl.createUser);
userRoutes.post('/:mail', Log.login);
userRoutes.put('/:userId', userCtrl.replaceUser);
userRoutes.patch('/:userId', userCtrl.updateUser);
userRoutes.delete('/:userId', userCtrl.deleteUser);
userRoutes.get('/me/token', auth.verifyTk);

module.exports = userRoutes;
