const { checkoutMP, historyOrders } = require('../controllers/checkout');
const { Router } = require('express');

const checkoutRouter = Router();

checkoutRouter.post('/', async (req, res) => {
    try {
        const idMP = await checkoutMP(req.body)
        res.send(idMP)
    } catch (error) {
        console.log(error);
    }
})

checkoutRouter.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const history = await historyOrders(userId)
        res.send(history);
    } catch (error) {
        console.log(error);
    }
})

module.exports = checkoutRouter;
