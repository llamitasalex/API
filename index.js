'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')
 
const Login = require('./models/login')

const app = express()
const port = process.env.port || 3001

app.use(bodyParser.urlencoded({ extend: false}))
app.use (bodyParser.json())

app.get('/api/login', (req, res) => {
    Login.find({},(err,login)=>{
        if (err) return res.status(500).send({message: `error al realizar la peticion`})
        if (!login) return res.status(404).send({message: `No exiten usuarios` })

        res.send(200,{login: [login]})
    })

    
} )

app.get('/api/login/:loginId', (req, res) => {
    let loginId = req.params.loginId

    Login.findById(loginId, (err, login) => {
        if (err) return res.status(500).send({message: `error al realizar la peticion: `})
        if (!login) return res.status(404).send({message: `El usuario no existe: `})

        res.status(200).send({ login })
    })
} )
app.post('/api/login', (req, res) => {
    console.log('POST /api/login')
    console.log(req.body)

    let login = new Login()
    login.name =req.body.name
    login.surname =req.body.surname
    login.mail =req.body.mail
    login.phone =req.body.phone
    login.password =req.body.password
    login.date =req.body.date

    login.save((err,loginStored)=>{
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
   
        res.status(200).send({login: loginStored})
    })

} )
app.put('/api/login/:loginId', (req, res) => {
    let loginId = req.params.loginId
    let update = req.body

    Login.findByIdAndUpdate(loginId, update, (err, loginUpdated)=>{
        if (err) res.status(500).send({message:`Error al actualizar el usuario: ${err}`})
    })
} )

app.delete('/api/login/:loginId', (req, res) => {
    let loginId = req.params.loginId

    Login.findById(loginId, (err, login)=>{
        if (err) res.status(500).send({message:`Error al borrar el usuario: ${err}`})

        login.remove(err =>{
            if (err) res.status(500).send({message:`Error al borrar el usuario: ${err}`})
            
            res.status(200).send({message: "el usuario ha sido borrado"} )
        })

    }) 
} )

mongoose.connect('mongodb://localhost:27017/shop', (err,res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos`)
    }
    console.log('conexion a la base de datos establecida...')
    
    
    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})
