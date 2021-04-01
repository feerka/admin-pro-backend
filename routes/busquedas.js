//Rut; api/todo/:busqueda
//Ruta: '/api/medicos'
const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getDocumentosColeccion } = require('../controllers/busquedas');
//middleware


//metodos del cont
const {
    getTodo

} = require('../controllers/busquedas')

const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);



module.exports = router;