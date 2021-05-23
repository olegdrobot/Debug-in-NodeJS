const Sequelize = require('sequelize');
                                //database username   password
const sequelize = new Sequelize('gamedb', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: "5433"
})
const User = require('./models/user')(sequelize,Sequelize);
const Game = require('./models/game')(sequelize,Sequelize);


sequelize.sync().then(

    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

module.exports = {sequelize, User, Game};
