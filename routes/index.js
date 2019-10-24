'use strict'

const express = require('express')
const loginCtrl = require('../controllers/login')
const api = express.Router()


api.get('/login', loginCtrl.getLogins)
api.get('/login/:loginId', loginCtrl.getLogin )
api.post('/login', loginCtrl.saveLogin)
api.put('/login/:loginId', loginCtrl.updateLogin)
api.delete('/login/:loginId', loginCtrl.deleteLogin)


module.exports = api