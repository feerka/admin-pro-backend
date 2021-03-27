const express = require('express');
//para leer archivos env
require('dotenv').config();

const cors = require('cors');
const { dbConnection } = require('./database/config')
    //Crear el servidor de Express
const app = express();

//configurar cors
app.use(cors());

//Base de datos
dbConnection();

console.log(process.env);

//Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});