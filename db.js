
/*
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
})
*/

const Sequelize = require('sequelize');
                                //database username   password
const sequelize = new Sequelize('gamedb', 'postgres', 'kbpf18072011', {
    host: 'localhost',
    dialect: 'postgres',
    port: "5433"
})
const User = require('./models/user')(sequelize,Sequelize);
const Game = require('./models/game')(sequelize,Sequelize);
//console.log('sequelize ', sequelize);

sequelize.sync().then(
	//console.log('sequelize'),
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

module.exports = {sequelize, User, Game};

/*------------------------
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
*/