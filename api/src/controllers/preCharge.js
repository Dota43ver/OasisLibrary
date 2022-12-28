const json = require("../api.json");
const { Book, Genre } = require("../db");

function preCharge() {
  try {
    json.map((book) => {
      //Para los libros:
      Book.findOrCreate({
        where: {
          name: book.name,
          year: book.year,
          genre: book.genre.map((e) => e),
          author: book.author,
          price: book.price,
          score: typeof book.score !== "undefined" ? book.score : 0.1,
          description:
            typeof book.description !== "undefined"
              ? book.description
              : "Sin descripcion",
          authorDescription: book.authorDescription,
          authorImg: book.authorImg,
          language:
            typeof book.language !== "undefined"
              ? book.language
              : "No especificado",
          stock: book.stock,
          image: book.image,
          saga: typeof book.saga !== "undefined" ? book.saga : null,
        },
      });
    });
  } catch (error) {
    console.log(error.message);
  }

  // Para los generos:
  // const genre = json.map(g => {
  //     return(
  //      g.genre
  //     )
  // })
  // const genreReady = genre.flat();
  // genreReady.map(e => {
  //     Genre.findOrCreate({
  //         where: {
  //             name: e
  //         }
  //     })
  // })
}

module.exports = preCharge;
