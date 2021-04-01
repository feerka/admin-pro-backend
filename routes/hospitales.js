//Ruta: /api/hospitales
const { Router } = require('express');
//middleware
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//metodos del cont
const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital


} = require('../controllers/hospitales')

const router = Router();

router.get('/', getHospitales);
router.post('/', [
        //Valida el token y devuelve un id
        validarJWT,
        //Esto se hace debido a que en el modelo de hospital, lo tenemos como obligatorio
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        check('id_hospital', 'El id del hospital es obligatorio').not().isEmpty(),
        //valida los check
        validarCampos
    ],
    crearHospital
);

router.put('/:id', [],
    actualizarHospital
);
router.delete('/:id',
    borrarHospital
);



module.exports = router;