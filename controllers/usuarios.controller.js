const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = ( req = request, res = response ) => {
    
    const { q, nombre='No name', apikey, page=1, limit } = req.query;

    res.json({
        msg: "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = ( req = request, res ) => {

    const id = req.params.id;

    res.status(400).json({
        msg: "put API - controlador",
        id
    });
}

const usuariosPost = async ( req = request, res ) => {




    const { name, email, pass, role } = req.body;
    const usuario = new Usuario( { name, email, pass, role } );

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });
    if( existeEmail ) {
        return res.status( 400 ).json({
            msg: 'El correo ya está registrado'
        });
    }

    validationResult( req ).throw();

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.pass = bcryptjs.hashSync( pass, salt );

    // Guardar en BD

    await usuario.save();

    res.json({
        msg: "post API - controlador",
        usuario
    });



}

const usuariosPatch = ( req, res ) => {
    res.json({
        msg: "delete API - controlador"
    });
}

const usuariosDelete = ( req, res ) => {
    res.json({
        msg: "patch API - controlador"
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}