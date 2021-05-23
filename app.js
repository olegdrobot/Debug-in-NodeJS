var sync = require('db-sync');
var express = require('express');
var app = express();
var db = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller')

app.use('/api/game', game);
app.use(require('body-parser'));
app.use(express.json());
db.sync({force: true});
app.use(require('./middleware/validate-session'));
app.use('/api/auth', user);
/*
db.sequelize;
*/

/*app.get('/', (req,res)=>{
	console.log('Hello');
	res.send('Hello, Server!');
} );*/

app.listen(4000, function() {
    console.log("App is listening on 4000");
});

module.exports = app;