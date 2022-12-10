require("dotenv").config()
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const booksRouter = require('./booksRouter.js')
const genresRouter = require('./genresRouter')
const authorRouter = require('./authorRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/books", booksRouter)
router.use("/genres", genresRouter)
router.use("/authors", authorRouter)

module.exports = router;
