require('dotenv').config();
const {Router} = require('express');
const {Genre,Book} = require ('../db');

const jsonData = require('../api.json');
const { json } = require('body-parser');

const router = Router()

router.get('/',async (req, res) => {
    
    try {
        
        const genre = jsonData.map(g => {
            return(
             g.genre
            )
        })
        const genreReady = genre.flat();
        
        
        const genreGo = genreReady.forEach(async g => {
            await Genre.findOrCreate({
                where: {
                    name: g
                    
                }
            })
        })
        const genresDb = await Genre.findAll();
        if (genresDb.length) return res.json(genresDb)
        
        console.log(genres);
        

        
        res.json(genreGo)
        // Si no los busco al json
        
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;
