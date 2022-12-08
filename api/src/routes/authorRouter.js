require('dotenv').config();
const {Router} = require('express');
const {Genre,Book,Author} = require ('../db');

const jsonData = require('../api.json');
// console.log(jsonData);

const router = Router()

router.get('/', async (req, res) => {
    
    try{
//CORREGIIIIIIIIIIIIIIRRRRRRRRRRRRRRRRR
        //get de autores por query (A SOLUCIONAR)
        const {name} = req.query;

        if(name) {

            let authorName = jsonData.filter(book => book.author.toLowerCase().includes(name.toLowerCase()))

            if(authorName.length) {

                const filterByName = [... new Set (authorName)]

                filterByName.forEach( a => {
                    Author.findOrCreate({
                        where: {
                            name: a.author
                        }
                    })
                })
                const authorByName = await Author.findAll();
                res.status(200).send(authorByName)
            }
            else{
                res.status(404).send({error: 'sorry, we could not find the author'})
            }
        }
        
        //get de todos los autores
        else {

            const author = jsonData.map(g => {
              return(
                  g.author
              )
            })

            const filter = [... new Set (author)];

            filter.forEach( a => {
                Author.findOrCreate({
                    where: {
                        name: a
                    }
                })
            })

            const allAuthors = await Author.findAll();
            res.status(200).send(allAuthors)
          
        }
        
    }
    catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/', async (req, res) => {
    
    try {
        let {name} = req.body;
        
        const createAuthor = await Author.create({
            name
        });

        return res.status(200).send({message: "Autor creado con exito", createAuthor})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = router;