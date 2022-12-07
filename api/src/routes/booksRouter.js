const {Router} = require('express');
const {Genre, Book} = require ('../db');
const { getBooks } = require('../controllers/getBooks');
const { postBooks } = require('../controllers/postBooks');

const booksRouter = Router();

booksRouter.get('/', async (req,res) => {
    try {
        const allBooks = await getBooks();
        res.send(allBooks);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

booksRouter.post("/",async (req,res) => { //MA O MENO, falta que traiga bien el genre de la BBDD por ahora trae lo que le mandes y lo crea en el modelo Genre
    try {
        await postBooks(req.body);
        res.status(200).send('Libro creado con éxito');
    } catch (error) {
        res.status(400).send(error.message);        
    }
})

module.exports = booksRouter;