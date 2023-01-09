require('dotenv').config();
const {Router} = require('express');
const { getByName } = require('../controllers/getBooks');
const getFavs = require('../controllers/getFavs');
const {Favorites, User, Book} = require("../db")

const router = Router()

router.post('/', async (req, res) => {
    const { userId, bookId, bookTitle } = req.body
    try {
        let newFavorite = await Favorites.create({
            usuarioId: userId,
            libroId: bookId,
            bookTitle
        })
        newFavorite? res.status(201).json({
            successMsg: 'Favorito añadido',
            data: newFavorite
        })
        : res.status(401).json({errorMsg: "Error al añadir favorito"})
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message})
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const favs = await getFavs(id)
        res.send(favs);
    } catch (error) {
        console.log(error.message);
    }
});
    
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const fav = await Favorites.findAll({
            where: {
                id: id
            }
        });
        await fav.destroy();
        res.status(200).send({
            msg: "Success",
        });
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;