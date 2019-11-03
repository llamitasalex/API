/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const configtk = require('../config');

function createTk(req, res, mail) {
  const payload = { email: mail };

  const token = jwt.sign(payload, configtk.clave, { expiresIn: 1440 });
  return res.status(200).send({ token });
}


function verifyTk(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No existe autorizacion' });

  jwt.verify(token, configtk.clave, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Fallo al autenticar' });

    res.status(200).send(decoded);
  });
}

module.exports = {
  createTk,
  verifyTk,
};
