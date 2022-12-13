const {User} = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const { sendEmail } = require('../utils/mailer');

require('dotenv').config();

async function createUser(body) {

    try {
        //Obtener data del usuario
        let {
            name, 
            lastName, 
            email, 
            password, 
            role
        } = body

        password = await bcrypt.hash(password, 8);

        //Creamos el usuario
        let user = await User.create({
            name, 
            lastName, 
            email, 
            password, 
            role
        })

        //Generamos nuestro token a partir del ID del nuevo usuario
        const token = jwt.sign({ id: user.id}, process.env.SECRET, { expiresIn: '1h'});

        //Le mandamos el mail de activacion ╰(*°▽°*)╯
        await sendEmail(email, "Token Validation", token);

        return {
            success: true,
            msg: "Fue creado con éxito"
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: 'Error al registrar usuario en el controller'
        };
    }
}

module.exports = {
    createUser
}