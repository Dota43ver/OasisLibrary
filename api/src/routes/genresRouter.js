require('dotenv').config();
const {Router} = require('express');
const {Genre,Book} = require ('../db');

/* const jsonData = require('../api.json')
console.log(jsonData); */
const router = Router()

router.get('/',async (req, res) => {
    
    try {
        // Si tengo en la base de datos consumo desde ahi.
        const genresDb = await Genre.findAll();
        if (genresDb.length) return res.json(genresDb)

        
        const genres = jsonData.map(genre => {
            return{
                genre: genre.game  
            }
        });
        res.json(genres)
        // Si no los busco al json
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
