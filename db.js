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
