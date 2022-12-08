const { Book } = require ('../db');

const putBooks = async (id, body) => {
    const {
        name,
        year,
        genre,
        author,
        price,
        score,
        description,
        language,
        stock,
        image,
        saga
    } = body

    if (
        !name||
        !year||
        !genre||
        !author||
        !price||
        !score||
        !description||
        !language||
        !stock||
        !image||
        !saga
    ) {
        throw new Error("Faltan datos ❗")
    } else {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error(404, "Libro no encontrado ❗")
        } else {
            book.set({
                name,
                year,
                genre,
                author,
                price,
                score,
                description,
                language,
                stock,
                image,
                saga
            });
            await book.save();
        }
    }
    
}

module.exports = {
    putBooks
};