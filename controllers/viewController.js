const db = require('../models');
const districts = require('../config/api/districts.json');

module.exports.welcome = function (req, res){
    res.render('home', {user: req.session.user});
}

module.exports.district = function (req, res){
    res.render('district', {user: req.session.user});
}

module.exports.returnDistrictInfo = function (req, res){
    res.send(districts);
}

module.exports.login = function (req, res){
    if(!req.session.user){
        res.render('login', {user: req.session.user, error: req.session.error});
    }else{
        res.redirect('/');
    }   
}

module.exports.signup = function (req, res){
    if(!req.session.user){
        res.render('signup', {user: req.session.user, error: req.session.error});
    }else{
        res.redirect('/');
    }   
}

module.exports.postlistings = function (req, res){
    if(req.session.user){
        if(req.session.user.privilege === "LandLord"){
            res.render('listing_form', {user: req.session.user});
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect('/login')
    }
}

module.exports.mylistingsMap = function (req, res){
    if(req.session.user){
        if(req.session.user.privilege === "LandLord"){
            db.Listings.findAll({
                where: {
                    postedBy: req.session.user.username,
                },
                raw: true
            })
            .then((data) =>{
                console.log(data);
                res.render('map', {user: req.session.user, listings: data});
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect('/login')
    }
}

//about endpoints

module.exports.apurvaEndpoint = function (req, res){
    res.render('about/aboutApurva', {user: req.session.user});
}
module.exports.chaitaliEndpoint = function (req, res){
    res.render('about/aboutChaitali', {user: req.session.user});
}
module.exports.christianEndpoint = function (req, res){
    res.render('about/aboutChristian', {user: req.session.user});
}
module.exports.leonEndpoint = function (req, res){
    res.render('about/aboutLeon', {user: req.session.user});
}
module.exports.patrickEndpoint = function (req, res){
    res.render('about/aboutPatrick', {user: req.session.user});
}
module.exports.vimeanEndpoint = function (req, res){
    res.render('about/aboutVimean', {user: req.session.user});
}
module.exports.emilyEndpoint = function (req, res){
    res.render('about/aboutEmily', {user: req.session.user});
}