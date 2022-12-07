const json = require ("../api.json");
const { Book } = require('../db');

async function preCharge () {
    json.map(book => {
        Book.findOrCreate({
            where: {
                name: book.name,
                year: book.year,
                // genre: book.genre.map(e => e),
                author: book.author,
                price: book.price,
                score: book.score? book.score : 0,
                description: book.description? book.description : "Sin descripcion",
                language: book.language? book.language : "No especificado",
                stock: book.stock? book.stock : false,
                image: book.image
            }
        })
    })
}

module.exports = preCharge;