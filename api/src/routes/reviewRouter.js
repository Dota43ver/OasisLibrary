require('dotenv').config();
const {Router} = require('express');
const {Reviews, User, Book} = require("../db")
const{fn, col} = require('sequelize')

const router = Router()

router.post('/', async (req, res) => {
    let {descript, votes, userId, bookId} = req.body;
    try {
        const user = await User.findByPk(userId)
        console.log(user.name);
        let newReview = await Reviews.create({
            userId: userId,
            bookId: bookId,
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
            include: [
                {
                    model: User,
                    attributes: [
                        "name",
                        "lastName",
                        "image"
                    ],
                },
                {
                    model: Book,
                    attributes: [
                        "image"
                    ]
                }
            ],
                
        })
        
        res.status(200).send(viewReviews)
    } catch (error) {
        console.log(error);
        res.status(401).send({error: error.message})
    }
})

module.exports = router;