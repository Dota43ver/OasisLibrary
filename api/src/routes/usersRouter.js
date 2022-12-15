const {Router} = require('express');
const { createUser, activateAccount, logIn, logOut } = require("../controllers/user");
const { verify } = require('../middleware/auth');

const usersRouter = Router();


//Guest
usersRouter.post("/signup", async (req,res) => { //Ruta postman: http://localhost:3001/users/signup
    try {
        const response = await createUser(req.body);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).send("error al registrar usuario", error.message);        
    }
});
usersRouter.get("/activateAccount/:id", async (req, res) => {
    try {
        let activationToken = req.params.id;
        if(!activationToken) {
            req.status(400).send("There is no token")
        }
        await activateAccount(activationToken);
        res.send("Your account has been activated")
    } catch (error) {
        console.log(error);
        res.status(400).send("error al activar", error.message);
    }
});
usersRouter.post("/login", async (req,res) => {
    try {
        const { email, password } = req.body;
        let response = await logIn(email, password);
        
        //Respondo un msg de éxito y además paso el token por header
        res.header('auth-token', response).send({
        successMsg: 'You signed in successfully.',
      });
    } catch (error) {
        console.log(error);
        res.status(400).send("error al iniciar sesión", error.message);
    }
});

//User
usersRouter.get("/logout", verify, async (req, res) => {
    try {
        await logOut(req.userId, req.token);
        res.send("Successfully loggedOut");
    } catch (error) {
        console.log(error);
        res.status(400).send("error al activar", error.message);
    }
});



module.exports = usersRouter;