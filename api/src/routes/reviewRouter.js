require('dotenv').config();
const {Router} = require('express');
const {Reviews, User, Book} = require("../db")
const{fn, col} = require('sequelize')

const router = Router()

router.post('/', async (req, res) => {
    let {descript, votes, UserId, idBook} = req.body;
    try {
        let newReview = await Reviews.create({
            UserId: UserId,
            idBook: idBook,
            descript: descript,
            votes: votes
        })
        newReview? res.status(201).json({
            successMsg: 'Added review',
            data: newReview
        })
        : res.status(401).json({errorMsg: "Error added review"})
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message})
    }
})

router.get('/', async (req, res) => {
    try {
        let viewReviews = await Reviews.findAll({
            attributes:[
                'id',
                'UserId',
                'idBook',
                'descript',
                'votes'
            ],
            include:[
                {
                    model: User,
                    attributes:[
                        [fn('CONCAT', col('name'), ' ', col('lastName')), 'fullname']
                    ]
                }
            ]
        })
        res.status(200).send({Msg: 'View you reviews', data: viewReviews})
    } catch (error) {
        console.log(error);
        res.status(401).send({error: error.message})
    }
})

module.exports = router;