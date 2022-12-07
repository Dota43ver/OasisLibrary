require('dotenv').config();
const {Router} = require('express');
const {Genre,Book} = require ('../db');

const jsonData = require('../api.json');
const { json } = require('body-parser');

const router = Router()

const genero = jsonData.map(g => {
    return(
     g.genre
    )
})
genero.flat()
console.log(jsonData)


router.get('/',async (req, res) => {
    
    try {
        // Si tengo en la base de datos consumo desde ahi.
        const genresDb = await Genre.findAll();
        if (genresDb.length) return res.json(genresDb)
        
        const genres = jsonData.forEach(async g => {
            await Genre.findOrCreate({
                where: {
                    name: g.genre[0]? g.genre[0] : "hola"
                    
                }
            })
        })
        
        console.log(genres);
        

        
        

    
             
        res.json(genres)
        // Si no los busco al json
        
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;
