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
        res.status(400).send({error: error.message})
        
    }
})

router.post('/', async (req, res) => {
    try {
        let {name} = req.body;

        const createGenre = await Genre.create({
            name
        })

        return res.status(200).send({message: "Género creado con exito",createGenre })

    } catch (error) {
        res.status(400).send({error: error.message})
        
    }
})

module.exports = router;
