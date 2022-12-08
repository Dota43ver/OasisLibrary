const {Genre,Book} = require ('../db');

const postBooks = async (body) => {
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
    } = body;

    const book = await Book.create({
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

    await Genre.findOrCreate({
        where: {
            name: genre
        }
    })

//     let genreDb = await Genre.findAll({
//         where: {name: genre}
//     });
//     console.log(genreDb)
//     book.addGenre(genreDb);
}

module.exports = {
    postBooks
};