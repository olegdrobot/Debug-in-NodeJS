const router = require('express').Router();
const {Game} = require('../db');
const Sequelize = require('sequelize');
const express = require('express');
//var Game = require('../db').import('../models/game');
//var Game = require('../models/game');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

//const jsonParser = express.json(); //добавил

router.get('/all', (req, res) => {
    Game.findAll() // Game.findAll({ where: { owner_id: req.user.id } }) - было
        .then(
            function findSuccess(data) {
                res.status(200).json({ 
                    games: data[0].dataValues,// games: games,
                    message: "Data fetched."
                })
            },

            function findFail() {
                res.status(404).json({          //500 was chanched on 404
                    message: "Data not found"
                })
            }
        )

})

router.get('/:id', (req, res) => {
    Game.findOne({ where: { id: req.params.id /*, owner_id: req.user.id */} })
        .then(
            function findSuccess(game) {
                res.status(200).json({
                    game: game
                })
            },

            function findFail(err) {
                res.status(404).json({          //500 was chanched on 404
                    message: "Data not found."
                })
            }
        )
})

router.route('/create').post(async (req, res) => {
    await Game.create({
        title: req.body.game.title,
        owner_id: req.body.user.id,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    })
        .then(
            function createSuccess(games) {
                res.status(201).json({          //200 was chanched on 201
                    game: games,
                    message: "Game created."
                })
            },

            function createFail(err) {
                res.status(500).send(err.message)
            }
        )
    
})

router.put('/update/:id', (req, res) => {
    Game.update({
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    },
        {
            where: {
                id: req.params.id,
                owner_id: req.body.game.owner_id /*owner_id: req.user*/
            }
        })
        .then(
            function updateSuccess(game) {
                res.status(200).json({
                    game: game,
                    message: "Successfully updated."
                })
            },

            function updateFail(err) {
                res.status(500).json({
                    message: err.message
                })
            }

        )
})

router.delete('/remove/:id', (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id,
            owner_id: req.body.game.owner_id /*owner_id: req.user.id*/
        }
    })
    .then(
        function deleteSuccess(game) {
            res.status(200).json({
                game: game,
                message: "Successfully deleted"
            })
        },

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }
    )
})


module.exports = router; //module.exports = routers;