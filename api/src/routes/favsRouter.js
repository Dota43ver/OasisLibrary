require('dotenv').config();
const {Router} = require('express');
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

module.exports = router;