const json = require ("../api.json");
const { Book, Genre } = require('../db');

function preCharge () {
    json.map(book => {

        //Para los libros:
        Book.findOrCreate({
            where: {
                name: book.name,
                year: book.year,
                genre: book.genre.map(e => e).join(", "),
                author: book.author,
                price: book.price,
                score: book.score? book.score : 0,
                description: book.description? book.description : "Sin descripcion",
                language: book.language? book.language : "No especificado",
                stock: book.stock? book.stock : false,
                image: book.image
            }
        })

        // Para los generos:
        // const genre = json.map(g => {
        //     return(
        //      g.genre
        //     )
        // })
        // const genreReady = genre.flat();
        // genreReady.map(e => {
        //     Genre.findOrCreate({
        //         where: {
        //             name: e
        //         }
        //     })
        // })
    })
}

module.exports = preCharge;