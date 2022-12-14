require("dotenv").config()
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const booksRouter = require('./booksRouter.js')
const genresRouter = require('./genresRouter')
const authorRouter = require('./authorRouter')
const usersRouter = require('./usersRouter')
const checkoutRouter = require('./checkout')
const reviewRouter = require('./reviewRouter')
const cartRouter = require('./shoppingCart')
const wScrapperRouter = require('./webScrapper')
const favsRouter = require('./favsRouter')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/books", booksRouter)
router.use("/genres", genresRouter)
router.use("/authors", authorRouter)
router.use("/users", usersRouter)
router.use("/checkout", checkoutRouter)
router.use("/reviews", reviewRouter)
router.use("/cart", cartRouter)
router.use("/webScrapper", wScrapperRouter)
router.use("/favs", favsRouter)

module.exports = router;
