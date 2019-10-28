/* eslint-disable consistent-return */

const crypto = require('crypto');
const User = require('../models/user');

function getUser(req, res) {
  const { userId } = req.params;

  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({ message: 'error al realizar la peticion' });
    if (!user) return res.status(404).send({ message: 'El usuario no existe' });

    res.status(200).send({ user });
  });
}

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: 'error al realizar la peticion' });
    if (!users) return res.status(404).send({ message: 'No exiten usuarios' });

    res.status(200).send({ users });
  });
}
function encriptar(user, pass) {
  const hmac = crypto.createHmac('sha1', user).update(pass).digest('hex');
  return hmac;
}


function createUser(req, res) {
  const { mail } = req.body;
  const { password } = req.body;
  const passEncriptada = encriptar(mail, password);

  const user = new User(req.body, { mail, password: passEncriptada });

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

    // Replaces the user
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
    if (err) res.status(500).send({ message: `Error al actualizar el usuario: ${err}` });


    res.status(200).send({ message: 'usuario actualizado', user: userUpdated });
  });
}

function deleteUser(req, res) {
  const { userId } = req.params;

  User.findById(userId, (err, user) => {
    if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}` });
    if (!user) return res.status(404).send({ message: 'usuario no encontardo' });

    return res.status(200).send({ message: 'Usuario borrado', user });
  });
}


function login(req, res) {
  const { mail } = req.params;
  const { password } = req.body;

  const passEncriptada = encriptar(mail, password);

  User.findOne({ mail }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'No existe usuario' });

    if (user) {
      if (user.password === passEncriptada) res.send({ message: 'login completado' });
      else res.send({ message: 'contraseña incorrecta', err });
    }
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
