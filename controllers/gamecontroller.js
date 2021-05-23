
const Sequelize = require('sequelize');
const {Game} = require('../db');

var router = require('express').Router();
const express = require('express');
//var Game = require('../db').import('../models/game');
//var Game = require('../models/game');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());

//const jsonParser = express.json(); //добавил

router.get('/all', (req, res) => {
   /* console.log("it's game/all");
    res.json({message: "hello"});
    */
 // Game.findAll({ where: { owner_id: req.user.id } }) - было
    Game.findAll()
        .then(
            function findSuccess(data) {
                console.log('data ', data[0].dataValues);
                res.status(200).json({
                   // games: games,
                    games: data[0].dataValues,
                    message: "Data fetched."
                })
            },

            function findFail() {
                res.status(500).json({
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
                res.status(500).json({
                    message: "Data not found."
                })
            }
        )
})

router.route('/create').post(async (req, res) => {
    console.log('create ',req.body);
    //console.log(Game);
    //res.send({ansServer: 'server'});
   
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
                console.log('Game created');
                res.status(200).json({
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
    console.log('put ', req.params.id, req.body.game.owner_id);
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
                /*owner_id: req.user*/
                owner_id: req.body.game.owner_id
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
            /*owner_id: req.user.id*/
            owner_id: req.body.game.owner_id
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

//module.exports = routers;
module.exports = router;