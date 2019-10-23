

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginSchema = new Schema ({
  name: {type: String},
  surname: {type: String},
  mail: {type: String},
  phone: {type: String},
  password: {type: String},
  date: {type: Date}
 
});

var Login = module.exports = mongoose.model('Login', LoginSchema);
