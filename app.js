const sync = require('db-sync');
const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')

app.use('/api/game', game);
app.use('/api/auth', user);
app.use(require('body-parser'));
app.use(express.json());
//db.sync({force: true});
app.use(require('./middleware/validate-session'));

app.listen(4000, function() {
    console.log("App is listening on 4000");
});

module.exports = app;