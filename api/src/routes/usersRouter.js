const {Router} = require('express');
const { createUser, activateAccount, logIn, logOut, getOneUser, adminGetUsers } = require("../controllers/user");
const { verify, adminAuth } = require('../middleware/auth');

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
        res.json(response)
    //     res.header('auth-token', response).send({
    //     successMsg: 'You signed in successfully.',
    //    });
    // res.status(200).send({
    //     successMsg: 'You signed in successfully.',
    //   });
    } catch (error) {
        console.log(error);
        res.status(400).send("error al iniciar sesión", error.message);
    }
});

//User
usersRouter.get("/logout", verify, async (req, res) => {
    try {
        await logOut(req.userId);
        res.status(200).send("Successfully loggedOut");
    } catch (error) {
        console.log(error);
        res.status(400).send("error al desloguear", error.message);
    }
});
usersRouter.get('/profile', verify, async (req, res) => {
    try {
        let id = req.userId;
        // console.log((id));
        // let token = req.token;
        const usuario = await getOneUser(id);
        res.status(200).send(usuario);
    } catch (error) {
        console.log(error);
        res.status(400).send("error al mostrar un usuario", error.message);
    }
});

usersRouter.get('/is-verify', verify, async (req, res)=>{
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server Error")
    }
} )

//Admin
usersRouter.get("/admin/users", verify, adminAuth, async (req,res) => {

    try {
        const id = req.query;
        if(id) {
            let response = await adminGetUsers(id);
            res.send(response);
        } else {
            let response = await adminGetUsers();
            res.send(response);
        }
    } catch (error) {
        res.status(400).send("Algo falló")
    }
});
// usersRouter.put 
// usersRouter.post ???? 

module.exports = usersRouter;