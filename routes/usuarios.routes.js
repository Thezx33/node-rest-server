const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch
    } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get( '/', usuariosGet );

router.put( '/:id', usuariosPut );

router.post( '/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('pass', 'El password debe de ser más de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es válido').isEmail(),
    check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], usuariosPost );

router.delete( '/', usuariosDelete );

router.patch( '/', usuariosPatch );


module.exports = router;