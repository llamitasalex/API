'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


 const UserSchema =  new Schema ({
  name: String,
  surname: String,
  mail: {type: String, unique: true, required: true},
  phone: {type: String,maxlength:9,minlength:9},
  password: {type: String,required:true},
  date: {type: Date, default: Date.now()}
 
})



module.exports = mongoose.model('User', UserSchema);
