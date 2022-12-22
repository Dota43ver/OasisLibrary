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
            // role
        } = body

        password = await bcrypt.hash(password, 8);

        //Creamos el usuario
        // const isActive = false;   //Por default esta en true asi que lo ponemos en false para que se tenga que actualizar con la ruta de activacion
        let user = await User.create({
            name, 
            lastName, 
            email, 
            password, 
            // isActive
            // role
        })
        
        //Generamos nuestro token a partir del ID del nuevo usuario
        const token = jwt.sign({ id: user.id}, process.env.SECRET, { expiresIn: '1h'});

        //Le mandamos el mail de activacion ╰(*°▽°*)╯
        await sendEmail(email, "Token Validation", token);

        return {
            token,
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

async function activateAccount(activationToken) {
    const payload = jwt.verify(activationToken, process.env.SECRET);
    // await User.update(
    //     { isActive: true, activationToken: null },
    //     {
    //       where: {
    //         id: payload.id,
    //         activationToken,
    //       },
    //     }
    //   );
    const userFound = await User.findByPk(payload.id);
    // console.log("usuario a activar",userFound);
    await userFound.update({ isActive: true});
    await userFound.update({ activationToken: null });
    await userFound.save();
}

async function logIn(email, password) {
    const user = await User.findOne({
        where: {
          email
        },
    });
    const match = bcrypt.compare(password, user.password) //compara la contraseña que manda el usuario con la que tenemos hasheada y guardada en la BD.
    if (!user) {
        return res.status(404).send({ errorMsg: 'Email or password is wrong.' });
      } else if(!match) {
        return error = {
            msg: 'Password is wrong'
        }
    } else if (!user.isActive) {
        return error = {
            msg: 'User is not active'
        }
    }
    //Genero nuevo token por inicio de sesión
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    await user.update({token: token});
    await user.save();
    return {token};
}

async function logOut(id){
    let userFound = await User.findOne({ where: {id: id} });
    await userFound.update({token: null});
    await userFound.save();
}

async function getOneUser(id) {
    if (!id) {
        return errorMsg = 'Missing data.';
      } else {
        let userFound = await User.findOne({ where: {id: id} });
        if(!userFound) {
            return errorMsg = 'User not found.';
        }
        return userFound;
      }
}

async function adminGetUsers(id) {

    if(id) {
        let user = await User.findOne({where: {id}});
        if(!user) {
            throw new Error({message: "User not found"})
        }
        return user;
    } else {
        let users = await User.findAll({ order: [['name', 'ASC']] });
        // De esta manera podria especificar que cosas traigo:
        // const allUsers = users.map(u => {  
        //      user.name,
        //      user.email,
        //      user.password
        // })     
        return users;      
    }
}



module.exports = {
    createUser,
    activateAccount,
    logIn,
    logOut,
    getOneUser,
    adminGetUsers
}