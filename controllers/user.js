'use strict'

const User = require('../models/user')


function getUser(req, res){
    let userId = req.params.userId

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({message: `error al realizar la peticion: `})
        if (!user) return res.status(404).send({message: `El usuario no existe: `})

        res.status(200).send({ user })
    })

}

function getUsers(req, res){
    User.find({},(err,users)=>{
        if (err) return res.status(500).send({message: `error al realizar la peticion`})
        if (!users) return res.status(404).send({message: `No exiten usuarios` })

        res.send(200,{users})
    })

}

function saveUser (req,res){
    console.log('POST /api/user')
    console.log(req.body)

    let user = new User()
    user.name =req.body.name
    user.surname =req.body.surname
    user.mail =req.body.mail
    user.phone =req.body.phone
    user.password =req.body.password
    user.date =req.body.date

    user.save((err,userStored)=>{
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
   
        res.status(200).send({user: userStored})
    })


}

function updateUser(req,res){
    let userId = req.params.userId
    let update = req.body

    User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
        if (err) res.status(500).send({message:`Error al actualizar el usuario: ${err}`})
    

    res.status(200).send({user:userUpdated})
})

}

function deleteUser(req,res){
    let userId = req.params.userId

    User.findById(userId, (err, user)=>{
        if (err) res.status(500).send({message:`Error al borrar el usuario: ${err}`})

        user.remove(err =>{
            if (err) res.status(500).send({message:`Error al borrar el usuario: ${err}`})
            
            res.status(200).send({message: "el usuario ha sido borrado"} )
        })

    }) 

}

module.exports={
    getUser,
    getUsers,
    saveUser,
    updateUser,
    deleteUser

}