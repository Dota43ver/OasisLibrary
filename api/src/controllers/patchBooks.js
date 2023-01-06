const { Book } = require("../db");
const patchBooks = async (id, body) => {
  // Obtienes la información del libro a partir del cuerpo de la solicitud
  const {
    name,
    author,
    genre,
    price,
    score,
    description,
    authorDescription,
    authorImg,
    language,
    stock,
    image,
    saga,
  } = body;
  const book = await Book.findByPk(id);
  if (!book) {
    // Si no se encuentra el libro, lanzas un error
    throw new Error("Libro no encontrado");
  }

  // Actualizas la información del libro
  book.name = name;
  book.author = author;
  book.genre = genre;
  book.price = price;
  book.score = score;
  book.description = description;
  book.authorDescription = authorDescription;
  book.authorImg = authorImg;
  book.language = language;
  book.stock = stock;
  book.image = image;
  book.saga = saga;
  // Guardas los cambios en la base de datos
  await book.save();
};

module.exports = { patchBooks };

module.exports = {
  patchBooks,
};
