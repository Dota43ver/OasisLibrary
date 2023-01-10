require('dotenv').config();
const {Router} = require('express');
const { getByName } = require('../controllers/getBooks');
const getFavs = require('../controllers/getFavs');
const {Favorites, User, Book} = require("../db")

const router = Router()

router.post('/', async (req, res) => {
    const { userId, bookId} = req.body
    try {
        let newFavorite = await Favorites.create({
            usuarioId: userId,
            libroId: bookId,
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

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const favs = await getFavs(userId)
        res.send(favs);
    } catch (error) {
        console.log(error.message);
    }
});
    
router.delete("/", async (req, res) => {
    try {
        let { userId, bookId} = req.body

        // console.log({bookId});
        // console.log({userId});
        let fav = await Favorites.findAll({
            where: {
                usuarioId: userId,
                libroId: bookId,
            }
        });
        console.log("soy el que se va a destruir:", fav);
        const id = fav.id
        await fav.destroy();
        res.status(200).send({
            msg: "Success",
            data: id
        });
    } catch (error) {
        console.log("delete",error);
    }
});

module.exports = router;