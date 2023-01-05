require("dotenv").config();
const { Router } = require('express');
const { deleteItem, addItemToCart, getCart } = require("../controllers/getShopingCart");

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        const cart = await addItemToCart(userId, bookId, quantity);
        res.send(cart);

    } catch (error) {
        res.status(400).send("Algo falló");
    }
})

cartRouter.delete('/', async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        const cart = await deleteItem(userId, bookId, quantity)
        res.send(cart);
    } catch (error) {
        res.status(400).send("Error al eliminar el libro")
    }
})

cartRouter.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await getCart(userId);
        res.send(cart);
    } catch (error) {
        res.status(400).send("Error al encontrar los datos");
    }
})

module.exports = cartRouter