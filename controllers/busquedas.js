//getTodo
//para tener el tipado en la respuesta (res)
const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    //Sirve para hacer la busqueda insensible(buscar en todas las palabras del campo)
    const regex = new RegExp(busqueda, 'i');

    // const usuarios = await Usuario.find({ nombre: regex });
    // const medicos = await Medico.find({ nombre: regex });
    // const hospitales = await Hospital.find({ nombre: regex });

    const [medicos, usuarios, hospitales] = await Promise.all([
        Medico.find({ nombre: regex }),
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })

}
const getDocumentosColeccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: true,
                msg: 'La tabla tiene que ser medicos, usuarios, hospitales'
            });

    }
    // const [medicos, usuarios, hospitales] = await Promise.all([
    //     Medico.find({ nombre: regex }),
    //     Usuario.find({ nombre: regex }),
    //     Hospital.find({ nombre: regex })
    // ]);

    res.json({
        ok: true,
        resultados: data
    });



}
module.exports = {
    getTodo,
    getDocumentosColeccion
}