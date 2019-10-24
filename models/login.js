'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


 const LoginSchema =  new Schema ({
  name: String,
  surname: String,
  mail: {type: String, unique: true},
  phone: {type: String},
  password: {type: String,},
  date: {type: Date, default: Date.now()}
 
})



module.exports = mongoose.model('Login', LoginSchema);
