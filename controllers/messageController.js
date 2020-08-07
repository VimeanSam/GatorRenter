const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports.text = function(req, res) {
    let messageID = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    db.Messages.create({
        msgID: messageID,
        subject: req.body.subject,
        sender: req.body.from,
        recipient: req.body.to,
        body: req.body.body
    }).then((user) => {
        res.status(200).json({
            message: 'success',
        });
    }).catch((error) => {
        console.log(error);
        res.json({
            error: 'error sending message'
        })
    });
}

module.exports.reply = function(req, res) {
    db.Messages.create({
        msgID: req.body.ID,
        subject: req.body.subject,
        sender: req.body.from,
        recipient: req.body.to,
        body: req.body.body
    }).then((user) => {
        res.status(200).json({
            message: 'success',
        });
    }).catch((error) => {
        console.log(error);
        res.json({
            error: 'error sending message'
        })
    });
}

module.exports.getMessageTopics = function(req, res) {
    if(req.session.user){
        db.Messages.findAll({
            where: {
                [Op.or]: [{sender: req.session.user.username}, {recipient: req.session.user.username}]
            },
            group: ['msgID'],
            raw: true
        })
        .then((data) =>{
            //console.log(data);
            res.render('messaging', {user: req.session.user, conversations: data});
        })
        .catch((err) =>{
            console.log(err);
        })
    }else{
        res.redirect('/login');
    }
}

module.exports.getAllmessages = function(req, res) {
    if(req.session.user){
        db.Messages.findAll({
            where: {
                [Op.or]: [{sender: req.session.user.username}, {recipient: req.session.user.username}],
                msgID: req.params.id.toString()
            },
            raw: true
        })
        .then((data) =>{
            //console.log(data);
            res.render('messageDetails', {user: req.session.user, conversations: data})
        })
        .catch((err) =>{
            console.log(err);
        })
    }else{
        res.redirect('/login');
    }
}