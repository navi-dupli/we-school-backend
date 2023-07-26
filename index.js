// index.js/server.js

// set up ======================================================================
// get all the tools we need
let express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

const morgan       = require('morgan'); // Module to create logfile
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const configDB = require('./config/database.js'); // location of the configured DB url

// CONFIGURATION ===============================================================
// connect to our database
mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('combined'))

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret')); // read cookies (needed for auth)

// required for passport
app.use(session({
	secret: "ilovescotchscotchyscotchscotch", // session secret
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(cookieParser('secretString'));
app.use(session({
	cookie: { maxAge: 60000 },
	secret: "ilovescotchscotchyscotchscotch", // session secret
    resave: false,
    saveUninitialized: false
}));

// routes ======================================================================
require('./app/routesUser.js')(app, passport);
require('./app/routesGrade.js')(app, passport);

//run aplication
app.set('port', (process.env.PORT || 3000));

// launch ======================================================================
app.listen(app.get('port'), function() {
  console.log('Aplicación ejecutándose en el puerto ', app.get('port'));
});
