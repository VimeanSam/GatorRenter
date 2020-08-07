var db = require("../models");

module.exports = db.sequelize.sync()
    .then(function(){
        console.log('sync mysql connection successfully');
    }).catch(function(err){
        console.log(err+" Something went wrong with the Database Update!");
});