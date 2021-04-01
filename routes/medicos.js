//Ruta: '/api/medicos'
const { Router } = require('express');
//middleware
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//metodos del cont
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico


} = require('../controllers/medicos')

const router = Router();

router.get('/', getMedicos);
router.post('/', [
        //Valida el token y devuelve un id
        validarJWT,
        //Esto se hace debido a que en el modelo de hospital, lo tenemos como obligatorio
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital debe ser válido').isMongoId(),
        // check('id-hospital', 'El nombre del hospital es obligatorio').not().isEmpty(),
        //valida los check
        validarCampos
    ],
    crearMedico
);


router.put('/:id', [],
    actualizarMedico
);
router.delete('/:id',
    borrarMedico
);



module.exports = router;