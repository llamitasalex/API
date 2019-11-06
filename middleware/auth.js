/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const configtk = require('../config');

function createTk(req, res, mail) {
  const payload = { email: mail };

  return jwt.sign(payload, configtk.clave, { expiresIn: '1m' });
}

function verifyTk(req, res, next) {
  const token = req.headers['token-access'];
  if (!token) return res.status(401).send({ auth: false, message: 'No existe autorizacion' });

  jwt.verify(token, configtk.clave, (err) => {
    if (err) return res.status(500).send({ auth: false, message: 'no tiene autorizacion' });
    next();
  });
}

module.exports = {
  createTk,
  verifyTk,
};
