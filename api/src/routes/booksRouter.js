const booksRouter = Router();

booksRouter.get('/', async (req,res) => {
    try {
        const allBooks = await getBooks();
        res.send(allBooks);
    } catch (error) {
        res.send(error.message);
    }
});