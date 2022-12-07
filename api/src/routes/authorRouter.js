require('dotenv').config();
const {Router} = require('express');
const {Genre,Book,Author} = require ('../db');

const jsonData = require('../api.json');
const { all } = require('./genresRouter');
// console.log(jsonData);

const router = Router()

router.get('/', async (req, res) => {
    
    try{
        const author = jsonData.map(g => {
            return(
                g.author
            )
        })

        const filter = [... new Set (author)];

        filter.forEach( g => {
            Author.findOrCreate({
                where: {
                    name: g
                }
            })
        })

        const allAuthors = await Author.findAll();
        res.status(200).send(allAuthors)
        
    }
    catch (error) {
        console.log(error.message);
    }
})


module.exports = router;