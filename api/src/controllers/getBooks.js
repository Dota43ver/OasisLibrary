const { Book, Author, Genre } = require("../db");
const jsonData = require("../api.json");

// console.log("soy json data", jsonData); //pa chequear que va bien de esta forma

async function getBooks() {
  // jsonData.map(e => {
  //     Book.findOrCreate({
  //         where: {
  //             name: e.name,
  //             year: e.year,
  //             // genre: e.map(el => el),
  //             author: e.author,
  //             price: e.price,
  //             score: e.score,
  //             description: e.description,
  //             stock: e.stock,
  //             image: e.image
  //         },
  //         // include: {
  //         //     model: Author,
  //         //     attributes: ["name"]
  //         // },
  //         // include: {
  //         //     model: Genre,
  //         //     attributes: ["name"]
  //         // }
  //     })
  // Las siguientes lineas corresponden a una manera de resolver en caso de separar en nuestra API los libros de los demas models
  // })

  const allBooks = await Book.findAll();
  return allBooks;
}

const getByName = async (name) => {
  const query = name.toLowerCase();
  const books = await Book.findAll();
  const filteredBooks = books.filter((el) =>
    el.name.toLowerCase().includes(query)
  );
  return filteredBooks;
};

async function getBookById(id) {
  const book = await Book.findByPk(id);
  return book;
}

module.exports = {
  getBooks,
  getBookById,
  getByName,
};
