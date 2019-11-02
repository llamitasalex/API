/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mail: { type: String, unique: true, required: true },
  phone: { type: String, maxlength: 9, minlength: 9 },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  const user = this;
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
