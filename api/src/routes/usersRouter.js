const {Router} = require('express');
const { createUser } = require("../controllers/user");

const usersRouter = Router();

usersRouter.post("/signup", async (req,res) => { //Ruta postman: http://localhost:3001/users/signup
    try {
        const response = await createUser(req.body);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).send("ruta post error", error.message);        
    }
})

module.exports = usersRouter;