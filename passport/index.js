const passport = require('passport');
const LocalStrategy = require('./localStrategy');

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passport.use(LocalStrategy)
module.exports = passport;