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
        
        const filter = [... new Set (genreReady)];

        filter.forEach( g => {
            Genre.findOrCreate({
                where: {
                    name: g
                }
            })
        })
      
        const allGenres = await Genre.findAll();
        res.status(200).send(allGenres)
        
        
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;
