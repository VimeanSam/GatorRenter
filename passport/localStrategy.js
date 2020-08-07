const db = require('../models');
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
    {
      usernameField: "username"
    },
    function(username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            //console.log(user);
            if (!user) {
                return done(null, false, {
                    message: "Incorrect username."
                });
            }
            else if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            console.log('logged in: '+username);
            return done(null, user);
        });
    }
)

module.exports = strategy;