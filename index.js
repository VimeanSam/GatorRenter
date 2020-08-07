const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const path = require('path');
const passport = require('./passport');
const PORT = process.env.PORT || 4000;
const dbconnection = require("./database");
const index = require('./routes/index');
const user = require('./routes/user');
const listings = require('./routes/listings');
const search = require('./routes/search');
const dashboard = require('./routes/dashboard');
const filter = require('./routes/filters');
const messaging = require('./routes/messaging');

app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       next();
   });
app.use(
       bodyParser.urlencoded({
              extended: false
       })
   );
app.use(bodyParser.json());
app.use(
       session({
              secret: 'secret cat', 
              resave: true, 
              saveUninitialized: true 
       })
);

app.use(express.static(__dirname + '/public_html'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/public_html'));

// Passport
app.use(passport.initialize());
app.use(passport.session());
//routes
app.use('/', index);
app.use('/user', user);
app.use('/listings', listings);
app.use('/search', search);
app.use('/dashboard', dashboard);
app.use('/filter', filter);
app.use('/messaging', messaging);

   
/*
app.listen(PORT, () => {
       console.log(`App listening on PORT: ${PORT}`);
});
*/
   
module.exports = app;