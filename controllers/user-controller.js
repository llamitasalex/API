/* eslint-disable no-console */
/* eslint-disable consistent-return */
// const Token = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const configtk = require('../configtk/configtk');

function getUser(req, res) {
  const { userId } = req.params;

  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({ message: 'error al realizar la peticion' });
    if (!user) return res.status(404).send({ message: 'El usuario no existe' });

    return res.status(200).send({ user });
  });
}

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: 'error al realizar la peticion' });
    if (!users) return res.status(404).send({ message: 'No exiten usuarios' });

    return res.status(200).send({ users });
  });
}

function createUser(req, res) {
  const user = new User(req.body);

  user.save((err, newUser) => {
    if (err) return res.status(400).send({ message: 'error guardando el usuario', err });

    return res.status(200).send({ message: 'Saved user', newUser });
  });
}

function replaceUser(req, res) {
  const { userId } = req.params;
  const { mail } = req.body;
  const { password } = req.body;
  const { name } = req.body;
  const { surname } = req.body;

  if (!mail || !name || !surname || !password) {
    return res.status(400).send({ message: 'faltan datos' });
  }

  const userReplacement = req.body;

  User.findById(userId, (err, user) => {
    if (err) return res.status(404).send({ message: 'No user to replace found', err });

    user.replaceOne(userReplacement, (error) => {
      if (error) return res.status(500).send({ error });

      return res.status(200).send({ message: 'User replaced' });
    });
  });
}

function updateUser(req, res) {
  const { userId } = req.params;
  const update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) return res.status(500).send({ message: `Error al actualizar el usuario: ${err}` });


    return res.status(200).send({ message: 'usuario actualizado', user: userUpdated });
  });
}

function deleteUser(req, res) {
  const { userId } = req.params;

  User.findByIdAndDelete(userId, (err, user) => {
    if (err) return res.status(500).send({ message: `Error al borrar el usuario: ${err}` });
    if (!user) return res.status(404).send({ message: 'usuario no encontardo' });

    return res.status(200).send({ message: 'Usuario borrado', user });
  });
}

function login(req, res) {
  const { password } = req.body;
  const { mail } = req.params;
  // const token = Token.encrypttk;

  User.findOne({ mail }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'No existe usuario' });

    user.comparePassword(password, (isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const payload = { email: mail };
        const token = jwt.sign(payload, configtk.clave, { expiresIn: 1440 });
        return res.status(200).send({ token, message: 'contarseña correcta' });
      }
      return res.status(404).send({ message: 'login incorrecto' });
    });
  });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
  login,
};
