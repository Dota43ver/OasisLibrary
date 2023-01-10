const { getBooks } = require('../controllers/getBooks');
const { Favorites, Book } = require("../db")

const getFavs = async (id) => {
    const filteredBooks = [];
    const response = await Favorites.findAll({
        where: {
            usuarioId: id
        },
        include: [
            {
                model: Book,
                as: "libro",
                // attributes: ["name", "price", "image"]
            }
        ]
        // where: {
        //     '$Usuario.id$': {id : id}
        // },
        // include: [
        //     // {
        //     //     model: User,
        //     //     attributes: [
        //     //         "name",
        //     //         "lastName",
        //     //         "image"
        //     //     ],

        //     // },
        //     {
        //         model: Book,
        //         as: "libro",
        //         attributes: [
        //             "name",
        //             "price",
        //             "image"
        //         ],
        //         // through: []
        //     }
        // ],
    });

    const favsId = response.map(e => e.dataValues.libroId);

    const books = await getBooks();

    for (let i = 0; i < favsId.length; i++) {
        filteredBooks.push(books.filter(e => e.dataValues.id === favsId[i]))
    }

    return filteredBooks.flat(1)
  };

  module.exports = getFavs;