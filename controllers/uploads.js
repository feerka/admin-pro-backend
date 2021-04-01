//Lo importamos de node, sirve para crear un path completo
const path = require('path');
const fs = require('fs');
const { response } = require('express');
const expressFileUpload = require('express-fileupload');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const { v4: uuidv4 } = require('uuid');

const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }
    //Procesar la imagen
    const file = req.files.imagen;
    console.log(file);
    //Esto se hace para cortar el nombre del archivo cada vez que consiga un punto y agarrar el tipo de archivo con el .lengyh-1
    const nombreCortado = file.name.split('.'); //superman.2.f.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];


    //Validar Extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        })

    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'No se pudo mover el archivo'
            });

        }
        //Actualizar la bd
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Se subio el archivo',
            nombreArchivo
        })
    });


}
const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //Imagen por defecto
    //se verifica si el path existe
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);

    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}
module.exports = {
    fileUpload,
    retornaImagen
}