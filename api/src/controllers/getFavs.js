const { getBooks } = require('../controllers/getBooks');
const { Favorites, Book } = require("../db")

const getFavs = async (id) => {
    const response = await Favorites.findAll({
        where: {
            usuarioId: id
        },
        include: [
            {
                model: Book,
                as: "libro",
                attributes: ["name", "price", "image"]
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
return  response
  };

  module.exports = getFavs;