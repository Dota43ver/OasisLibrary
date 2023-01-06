const { sendEmail } = require("../utils/mailer");
const sequelize = require("sequelize");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db");
const { Router } = require("express");
const {
  createUser,
  activateAccount,
  logIn,
  logOut,
  getOneUser,
  getAllUsers,
  adminGetUsers,
  updateUser,
} = require("../controllers/user");
const { verify, adminAuth } = require("../middleware/auth");

const usersRouter = Router();

//Guest
usersRouter.post("/signup", async (req, res) => {
  //Ruta postman: http://localhost:3001/users/signup
  try {
    let {
      name,
      lastName,
      email,
      password,
      // role
    } = req.body;

    password = await bcrypt.hash(password, 8);

    const user2 = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user2) {
      return res.status(401).send("user already exist");
    }

    let user = await User.create({
      name,
      lastName,
      email,
      password,
      // isActive
      // role
    });

    const Atoken = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    await sendEmail(email, "Token Validation", Atoken);
    return {
      Atoken,
      success: true,
      msg: "Fue creado con éxito",
    };
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }

  //     try {
  //         const response = await createUser(req.body);
  //         res.json(response);
  //     } catch (error) {
  //         console.log(error);
  //         res.status(400).send("error al registrar usuario", error.message);
  //     }
});
usersRouter.get("/activateAccount/:id", async (req, res) => {
  try {
    let activationToken = req.params.id;
    if (!activationToken) {
      req.status(400).send("There is no token");
    }
    await activateAccount(activationToken);
    res.send("Your account has been activated");
  } catch (error) {
    console.log(error);
    res.status(400).send("error al activar", error.message);
  }
});
usersRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).send("Password or email is incorrect");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect");
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }

  // try {
  //     const { email, password } = req.body;
  //     let response = await logIn(email, password);

  //     //Respondo un msg de éxito y además paso el token por header
  //     res.json(response)
  // //     res.header('auth-token', response).send({
  // //     successMsg: 'You signed in successfully.',
  // //    });
  // // res.status(200).send({
  // //     successMsg: 'You signed in successfully.',
  // //   });
  // } catch (error) {
  //     console.log(error);
  //     // res.status(401).send("error al iniciar sesión", error.message);
  // }
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
usersRouter.get("/profile", verify, async (req, res) => {
  try {
    let id = req.userId;
    // console.log((id));
    // let token = req.token;
    const usuario = await getOneUser(id);
    res.status(200).send(usuario);
  } catch (error) {
    console.log(error);
    // res.status(401).send("error al mostrar un usuario", error.message);
  }
});

usersRouter.put("/profile", verify, async (req, res) => {
  try {
    const { id } = req.query;
    const { data } = req.body;

    const usuario = await updateUser(id, req.body);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(400).send("error al actualizar", error.message);
  }
});

usersRouter.get("/is-verify", verify, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
});

//Admin
usersRouter.get("/admin/users", verify, adminAuth, async (req, res) => {
  try {
    const id = req.query;
    if (id) {
      let response = await adminGetUsers(id);
      res.send(response);
    } else {
      let response = await adminGetUsers();
      res.send(response);
    }
  } catch (error) {
    res.status(400).send("Algo falló");
  }
});
usersRouter.get("/all", async (req, res) => {
  try {
    const response = await getAllUsers();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error getting all users", error.message);
  }
});
// usersRouter.put
// usersRouter.post ????

module.exports = usersRouter;
