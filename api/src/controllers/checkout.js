const { mercadopago } = require('../utils/mercadopago')
const { Shopping_cart , Book } = require("../db");
const { Op } = require("sequelize");

// Crea un objeto de preferencia

const checkoutMP = async (data) => {
    try {
        const { user, shoppingCart } = data

        const totalPurchase = [];

        for (let i = 0; i < shoppingCart.productList.length; i++) {
            const discount = shoppingCart.productList[i].price - (shoppingCart.productList[i].price * shoppingCart.cupon)
            totalPurchase.push({
                title: shoppingCart.productList[i].user,
                name: shoppingCart.productList[i].user,
                unit_price: discount,
                quantity: shoppingCart.productList[i].quantity,
            });
        }

        const currentTime = new Date();
        const order = await Shopping_cart.update(
            { active: false, deletedAt: currentTime },
            {
                where: {
                    userId: user.id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            }
        )

        let preference = {
            payer: {
                user: user.id,
                email: user.email,
            },

            items: totalPurchase,

            back_urls: {
                "success": "https://oasis-library.vercel.app/success",
                "failure": "https://oasis-library.vercel.app/failure", //agregar pag de error
            },
        };

        return mercadopago.preferences
            .create(preference)
            .then(function (response) {
                // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
                return { redirectURL: response.body.init_point }
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
}

const historyOrders = async (userId) => {
    try {

        const order = await Shopping_cart.findAll({
            where: {
                userId: userId,
                active: {
                    [Op.ne]: true
                },
            },
            paranoid: false
        })

        console.log(order);

        if (order) {
            let bookMap = new Map();
            const bookIds = order.map((el) => {
                bookMap.set(el.bookId, { id: el.bookId, quantity: el.quantity, deletedAt:el.deletedAt })
                return el.bookId;
            })

            const bookCart = await Book.findAll({
                where: {
                    id: bookIds
                },
                attributes: ['id', 'name', 'price', 'image']
            })
            bookCart.map((el) => {
                const bookData = bookMap.get(el.id); // quantity: 1
                if (bookData) {
                    bookData.name = el.name;
                    bookData.price = el.price;
                    bookData.image = el.image;
                    bookMap.set(el.id, bookData)
                }
            })
            return Array.from(bookMap.values())

        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    checkoutMP,
    historyOrders
};