const { mercadopago } = require('../utils/mercadopago')

// Crea un objeto de preferencia

const checkoutMP = async (data) => {
    try {
        const { name, email, shoppingCart } = data

        const totalPurchase = [];

        for (let i = 0; i < shoppingCart.length; i++) {
            totalPurchase.push({
                name: shoppingCart[i].name,
                unit_price: shoppingCart[i].price,
                quantity: shoppingCart[i].quantity,
            });
        }

        let preference = {
            payer: {
                name,
                email,
            },

            items: totalPurchase,

            back_urls: {
                "success": "http://localhost:3000/success",
                "failure": "http://localhost:3000/failure", //agregar pag de error
                "pending": "http://localhost:3000/pending",
            },
        };

        
        return mercadopago.preferences
        .create(preference)
        .then(function (response) {
            // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
            console.log(response);
            return { redirectMP: response.body.init_point }
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
}

// router.post('/comprar', async (req, res) => {

//     try {
//         const { name, email, shoppingCart } = req.body

//         const totalPurchase = [];

//         console.log(shoppingCart);

//         for (let i = 0; i < shoppingCart.length; i++) {
//             totalPurchase.push({
//                 title: shoppingCart[i].name,
//                 unit_price: shoppingCart[i].price,
//                 quantity: shoppingCart[i].quantity,
//             });
//         }

//         let preference = {
//             payer: {
//                 name,
//                 email,
//             },

//             items: totalPurchase,

//             back_urls: {
//                 "success": "http://localhost:3000",
//                 "failure": "http://localhost:3000", //agregar pag de error
//             },
//         };

//         mercadopago.preferences
//             .create(preference)
//             .then(function (response) {
//                 // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
//                 console.log(response);
//                 console.log(response.body.init_point);
//                 res.json({
//                     id: response.body.id
//                 });
//             })
//             .catch(function (error) {
//                 console.log(error);
//               });
//     } catch (error) {
//         console.log(error);
//     }
// })

module.exports = {
    checkoutMP
}