const { User, Shopping_cart, Book } = require("../db");
const sequelize = require('sequelize');
const { Op } = require("sequelize");

async function addItemToCart(userId, bookId, quantity) {
    try {
        const cart = await Shopping_cart.findOne({
            where: {
                userId: userId,
                bookId: bookId,
                active: {
                    [Op.is]: true
                }
            },
            attributes: ['quantity']
        });
        if (cart) {
            return await Shopping_cart.update(
                { quantity: cart.quantity + quantity }, {
                where: {
                    userId: userId,
                    bookId: bookId,
                    active: {
                        [Op.is]: true
                    }
                }
            }
            );
        } else {
            await Shopping_cart.create({
                userId: userId,
                bookId: bookId,
                shippingCost: 0,
                active: true,
                quantity: quantity
            });
            return 'cart created'
        }
    } catch (error) {
        console.error(error);
    }
}

async function deleteItem(userId, bookId, quantity) {
    try {
        const cart = await Shopping_cart.findOne({
            where: {
                userId: userId,
                bookId: bookId,
                active: {
                    [Op.is]: true
                }
            },
            attributes: ['quantity']
        });

        if (cart && cart.quantity > 0) {
            return await Shopping_cart.update(
                { quantity: cart.quantity - quantity }, {
                where: {
                    userId: userId,
                    bookId: bookId,
                    active: {
                        [Op.is]: true
                    }
                }
            }
            );
        } else {
            // await Shopping_cart.update({
            //     where: {
            //         userId: userId,
            //         bookId: bookId,
            //         deletedAt: {
            //             [Op.is]: null
            //         }
            //     },
            // });
            return 'cart deleted'
        }

    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getCart(userId) {
    try {
        const cart = await Shopping_cart.findAll(
            {
                where: {
                    userId: userId,
                    active: {
                        [Op.is]: true
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                attributes: ['bookId', 'quantity']
            },
        )

        const cartNull = await Shopping_cart.findAll(
            {
                where: {
                    quantity: {
                        [Op.gt]: 0
                    }
                },
            }
        )

        if (cart.length === 0) {
            return []
        }

        let bookMap = new Map();

        const bookIds = cart.map((el) => {
            if (el.quantity < 1) {
                cartNull.map((el) => {
                    bookMap.set(el.bookId, { id: el.bookId, quantity: el.quantity })
                    return el.bookId;
                })
            } else {
                bookMap.set(el.bookId, { id: el.bookId, quantity: el.quantity })
                return el.bookId;
            }
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
    } catch (error) {
        console.error(error);
        return []
    }
}

module.exports = {
    addItemToCart, deleteItem, getCart
};