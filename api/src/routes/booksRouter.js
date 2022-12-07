const {Router} = require('express');
const {Genre,Book} = require ('../db');
const { getBooks } = require('../controllers/getBooks')

const booksRouter = Router();

booksRouter.get('/', async (req,res) => {
    try {
        const allBooks = await getBooks();
        res.send(allBooks);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = booksRouter;