const {Router} = require('express');
const {Genre, Book} = require ('../db');
const { getBooks, getByName, getBookById } = require('../controllers/getBooks');
const { postBooks } = require('../controllers/postBooks');
const {deleteBooks} = require('../controllers/deleteBooks');
const {putBooks} = require('../controllers/putBooks');

const booksRouter = Router();

booksRouter.get('/', async (req,res) => {
    try {
        const { name } = req.query;
        const allBooks = await getBooks();

        if(!name) {
            res.send(allBooks);
        } else {
            const booksByName = await getByName(name);
            res.send(booksByName);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

booksRouter.get('/:id', async (req,res) => {
    const { id } = req.params
    try {
        const book = await getBookById(id);
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

booksRouter.post("/", async (req,res) => { //MA O MENO, falta que traiga bien el genre de la BBDD por ahora trae lo que le mandes y lo crea en el modelo Genre
    try {
        await postBooks(req.body);
        res.status(200).send('Libro creado con éxito 😎');
    } catch (error) {
        res.status(400).send(error.message);        
    }
})

booksRouter.delete("/:id", async (req,res) => {
    const {id} = req.params
    try {
        await deleteBooks(id);
        res.status(200).send('Libro eliminado 👌');
    } catch (error) {
        res.status(400).send(error.message);        
    }
})

booksRouter.put("/:id", async (req,res) => {
    try {
        const { id } = req.params
        await putBooks(id, req.body);
        res.status(200).send('Libro actualizado 🔄');
    } catch (error) {
        res.status(400).send(error.message);        
    }
})

module.exports = booksRouter;