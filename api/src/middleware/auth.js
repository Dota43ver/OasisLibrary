const jwt = require("jsonwebtoken");
const { User } = require("../db");
require("dotenv").config();

async function verify(req, res, next) {
    try {
        // const token = req.header("auth-token");

        let token = req.header("token");
        if(!token) {
            res.status(404).send("There is no token");
        }
        const payload = jwt.verify(token, process.env.SECRET);
        const userFound = await User.findByPk(payload.id);
        // console.log(userFound);
        if(!userFound) {
            res.status(404).send("User not found");
        } else if (!userFound.isActive) {
            res.status(404).send("User not active");
        }
        req.userId = userFound.id;
        // console.log(req.userId);
        req.token = token;
        next();
        
    } catch (error) {

       console.error(error)

    }
}

async function adminAuth(){
    let user = await User.findOne({ where: { id: req.userID } });
    if (user.role !== "admin") {
      throw new Error({message: "El usuario no es administrador"});
    }
    next();
}

module.exports = {
    verify,
    adminAuth
}