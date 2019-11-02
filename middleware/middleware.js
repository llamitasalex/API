/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const configtk = require('../configtk/configtk');

function encrypttk(req, res) {
  const { mail } = req.params;

  const payload = { email: mail };
  const token = jwt.sign(payload, configtk.clave, { expiresIn: 1440 });
  return res.status(200).send({ token });
}


function verifytk(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, configtk.clave, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
}

module.exports = {
  verifytk,
  encrypttk,
};
