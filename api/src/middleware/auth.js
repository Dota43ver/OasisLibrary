const jwt = require("jsonwebtoken");
const { User } = require("../db");
require("dotenv").config();

async function verify(req, res, next) {
    try {
        const token = req.header("auth-token");

        if(!token) {
            res.status(404).send("There is no token");
        }
        const payload = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({
            where: {
                id: payload.id
            }
        });
        if(!user) {
            res.status(404).send("User not found");
        } else if (!user.isActive) {
            res.status(404).send("User not active");
        }
        req.userId = user.id;
        req.token = token;
        next();
        
    } catch (error) {
        res.status(500).send({ errorMsg: error.message });
    }
}

module.exports = {
    verify
}