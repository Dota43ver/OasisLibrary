const { Book, Author } = require('../db');
const jsonData = require("../api.json");

// console.log("soy json data", jsonData); //pa chequear que va bien de esta forma

async function getBooks() {
    jsonData.map(e => {
        Book.findOrCreate({
            where: {
                name: e.name,
                year: e.year,
                genre: e.map(el => el),
                author: e.map(el => el),
                price: e.price,
                score: e.score,
                description: e.description,
                stock: e.stock,
                image: e.image
            }
        })
        // Las siguientes lineas corresponden a una manera de resolver en caso de separar en nuestra API los libros de los demas models
        //   
        // include: {
        //     model: Author,
        //     attributes: ["name"]
        // },
        // include: {
        //     model: Genre,
        //     attributes: ["name"]
        // }
    })

    const allBooks = await Book.findAll();
    return allBooks;
}

module.exports = {
    getBooks
}