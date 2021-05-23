const router = require('express').Router();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../db'); //var User = require('../models/user');


const express = require('express');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());


router.post('/signup', (req, res) => {    
   User.create({
        full_name: req.body.user.full_name,
        username: req.body.user.username,
        passwordHash: bcrypt.hashSync(req.body.user.password, 10),
        email: req.body.user.email
    })
        .then(
            function signupSuccess(users) {
                let token = jwt.sign({ id: users.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: users,
                    token: token
                })
            },

            function signupFail(err) {
                res.status(500).send(err.message)
            }
        )
    
})

router.post('/signin', (req, res) => {
    User.findOne({ where: { username: req.body.user.username } }).then(user => {
        if (user) {
            bcrypt.compare(req.body.user.password, user.passwordHash, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(404).send({ error: "Passwords do not match." }) //502 was chanched on 404
                }
            });
        } else {
            res.status(401).send({ error: "User not found." })//403 was chanched on 401
        }

    })
})

module.exports = router;