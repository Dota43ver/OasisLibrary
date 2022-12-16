// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-6743330601707284-121500-df849e56d321b3c12cf811673a400c11-1264499987",
});

//dps ponerlo en un archivo .env

module.exports = {
    mercadopago
}