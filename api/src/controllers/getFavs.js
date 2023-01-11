const { getBooks } = require('../controllers/getBooks');
const { Favorites, Book } = require("../db")

const getFavs = async (id) => {
    const response = await Favorites.findAll({

        include: [
            {
                model: Book,
                as: "libro",
                attributes: ["name", "price", "image"]
            }
        ]

    return response;


  };

  module.exports = getFavs;