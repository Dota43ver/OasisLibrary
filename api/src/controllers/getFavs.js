const { getBooks } = require('../controllers/getBooks');
const { Favorites } = require("../db")

const getFavs = async (id) => {
    const filteredBooks = [];
    const response = await Favorites.findAll({
        where: {
            usuarioId: id
        }
    });

    const favsId = response.map(e => e.dataValues.libroId);

    const books = await getBooks();

    for (let i = 0; i < favsId.length; i++) {
        filteredBooks.push(books.filter(e => e.dataValues.id === favsId[i]))
    }

    return filteredBooks.flat(1)
  };

  module.exports = getFavs;