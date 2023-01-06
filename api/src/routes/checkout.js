const { checkoutMP } = require('../controllers/checkout');
const {Router} = require('express');

const checkoutRouter = Router();

checkoutRouter.post('/', async (req, res) => {
    try {
        const idMP = await checkoutMP(req.body)
        res.send(idMP) 
    } catch (error) {
        console.log(error);
    }
})

module.exports = checkoutRouter;
