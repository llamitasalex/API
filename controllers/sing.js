/* eslint-disable consistent-return */
const User = require('../models/user');
const create = require('../middleware/auth');

function login(req, res) {
  const { password } = req.body;
  const { mail } = req.body;

  User.findOne({ mail }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'No existe usuario' });

    user.comparePassword(password, (isMatch, error) => {
      if (error) return res.status(500).send({ err });
      if (isMatch) {
        return res.status(200).send({ message: 'login correcto', token: create.createTk(req, res, mail) });
      }
      return res.status(404).send({ message: 'login incorrecto' });
    });
  });
}

module.exports = {
  login,
};
