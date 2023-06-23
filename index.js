import { sequelize} from './database/database.js';
import  express from 'express';
import { Usuario } from './models/Usuario.js';
import { Op } from 'sequelize';

//const express = require('express')
const app = express()

const port = 3001;

async function verConexion(){
    try {
        await sequelize.authenticate()
        console.log("conexion a bd exitosa");
        await sequelize.sync()
    }
    catch(error) {
        console.error("no se logro la conexion", error);
    }
}


app.get("/insertar-usuario", async function(req, res){
    const nuevoUsuario = await Usuario.create({
        nombre: "nath",
        codigo: "20204522",
        edad: 20
    })

    res.send (`usuario creado`);
})


app.get("/consulta-usuario", async function (req, res){

    const {codigo} = req.query;
    let usuarios;

    if (codigo == -1){
        usuarios = await Usuario.findAll();
    }
    else{
        usuarios = await Usuario.findAll({where:{codigo}});
    
    }
    res.send(usuarios);
})

app.get("/buscar-usuario", async function (req, res){

    const {id} = req.query;
    const usuario = await Usuario.findAll({
        where:{
            id
        }
    });
    res.send(usuario)

} )

app.get("/modificar-usuario", async function (req, res){

    const {codigo} = req.query;
    const user = await Usuario.update({
        edad: 31
    },{
        where:{
            codigo
        }
    });

    res.send(user)

})

app.get("/eliminar-usuario", async function (req, res){

    const {codigo} = req.query;
    const user = await Usuario.destroy({
        where:{
            codigo
        }
    });

    res.send("usuario eliminado")
})




app.get("/", function(req, res){
    res.send("pw");
})


app.listen(port, function(){
    console.log(`servidor conectado en el puerro ${port}`)
    verConexion();
})