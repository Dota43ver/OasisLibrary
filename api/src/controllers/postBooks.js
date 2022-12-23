const { Genre, Book } = require("../db");

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
    authorDescription,
    authorImg,
    saga,
  } = body;

  const book = await Book.create({
    name,
    year,
    genre,
    author,
    price,
    score,
    description,
    authorDescription,
    authorImg,
    language,
    stock,
    image,
    saga,
  });

  //     let genreDb = await Genre.findAll({
  //         where: {name: genre}
  //     });
  //     console.log(genreDb)
  //     book.addGenre(genreDb);
};

module.exports = {
  postBooks,
};
