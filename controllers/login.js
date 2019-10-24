'use strict'

const Login = require('../models/login')


function getLogin(req, res){
    let loginId = req.params.loginId

    Login.findById(loginId, (err, login) => {
        if (err) return res.status(500).send({message: `error al realizar la peticion: `})
        if (!login) return res.status(404).send({message: `El usuario no existe: `})

        res.status(200).send({ login })
    })

}

function getLogins(req, res){
    Login.find({},(err,logins)=>{
        if (err) return res.status(500).send({message: `error al realizar la peticion`})
        if (!logins) return res.status(404).send({message: `No exiten usuarios` })

        res.send(200,{logins})
    })

}

function saveLogin (req,res){
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


}

function updateLogin(req,res){
    let loginId = req.params.loginId
    let update = req.body

    Login.findByIdAndUpdate(loginId, update, (err, loginUpdated)=>{
        if (err) res.status(500).send({message:`Error al actualizar el usuario: ${err}`})
    

    res.status(200).send({login:loginUpdated})
})

}

function deleteLogin(req,res){
    let loginId = req.params.loginId

    Login.findById(loginId, (err, login)=>{
        if (err) res.status(500).send({message:`Error al borrar el usuario: ${err}`})

        login.remove(err =>{
            if (err) res.status(500).send({message:`Error al borrar el usuario: ${err}`})
            
            res.status(200).send({message: "el usuario ha sido borrado"} )
        })

    }) 

}

module.exports={
    getLogin,
    getLogins,
    saveLogin,
    updateLogin,
    deleteLogin

}