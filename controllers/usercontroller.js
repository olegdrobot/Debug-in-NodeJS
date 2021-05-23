const Sequelize = require('sequelize');
var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var {User} = require('../db');
//var User = require('../models/user');

const express = require('express');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());


router.post('/signup', (req, res) => {
    console.log('user sign up ', req.body.user);
    
   User.create({
        full_name: req.body.user.full_name,
        username: req.body.user.username,
        passwordHash: bcrypt.hashSync(req.body.user.password, 10),
        email: req.body.user.email
    })
        .then(
            function signupSuccess(users) {
                console.log('hello');
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
                    console.log('user ', user);
                    var token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    console.log('Passwords do not match. ');
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            console.log('User not found. ');
            res.status(403).send({ error: "User not found." })
        }

    })
})

module.exports = router;