const express = require('express');
const userCtrl = require('../controllers/user-controller');
const auth = require('../middleware/auth');
const Log = require('../controllers/sing');

const userRoutes = express.Router();

userRoutes.get('/', userCtrl.getUsers);
userRoutes.get('/:userId', userCtrl.getUser);
userRoutes.get('/profile/:mail', userCtrl.getUserInfo);
userRoutes.post('/', userCtrl.createUser);
userRoutes.post('/login', Log.login);
userRoutes.put('/:userId', userCtrl.replaceUser);
userRoutes.patch('/:userId', userCtrl.updateUser);
userRoutes.delete('/:userId', userCtrl.deleteUser);
userRoutes.get('/me/token', auth.verifyTk, (req, res) => {
  res.status(200).send({ message: 'acceso permitido' });
});

module.exports = userRoutes;
