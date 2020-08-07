const db = require('../models');
const passport = require('../passport');
const validator = require('../config/validation');

module.exports.signup = async function (req, res){
    const { username, firstname, lastname, password, email, organization, privilege} = req.body;
    const nameExist = await db.User.findOne({where: {username: username}, raw : true});
    const emailExists = await db.User.findOne({where: {email: email}, raw : true});
    //console.log(nameExist);
    //console.log(emailExists);
    let checkEmail = validator.validateEmail(email, privilege);
    let checkPassword = validator.validatePassword(password);
    if(nameExist === null && emailExists === null){
        if(checkEmail === '' && checkPassword === ''){
            db.User.create({
                username: username,
                firstname: firstname,
                lastname: lastname,
                privilege: privilege,
                email: email,
                organization: organization,
                password: password
            }).then((user) => {
                req.session.error = undefined;
                var userInfo = {
                    username: user.username,
                    privilege: user.privilege
                };
                req.session.user = userInfo;
                res.redirect('/');
            }).catch((error) => {
                console.log(error);
                req.session.error = 'error inserting user data...';
            });
        }else{
            if(checkEmail !== '' && checkPassword === ''){
                console.log(checkEmail);
                req.session.error = checkEmail;
                res.redirect('/signup');
            }else if(checkEmail === '' && checkPassword !== ''){
                console.log(checkPassword);
                req.session.error = checkPassword;
                res.redirect('/signup');
            }else{
                console.log('email and password are invalid. Please try again.');
                req.session.error = 'email and password are invalid. Please try again.';
                res.redirect('/signup');
            }
        }
    }else{
        console.log('HERE')
        if(nameExist !== null && emailExists === null){
            console.log(`${username} already exists. Please try a different username.`);
            req.session.error = `${username} already exists. Please try a different username.`;
            res.redirect('/signup');
        }else if(nameExist !== null && emailExists !== null){
            console.log(`${username} and ${email} already exists. Please try a different naming scheme.`);
            req.session.error = `${username} and ${email} already exists. Please try a different naming scheme.`;
            res.redirect('/signup');
        }else if(nameExist === null && emailExists !== null){
            console.log(`${email} already exists. Please try a different email.`);
            req.session.error = `${email} already exists. Please try a different email.`;
            res.redirect('/signup');
        }
    }
}

module.exports.login = function (req, res, next){
    passport.authenticate('local', (err, user, info) =>{
        if(err){
            return next(err);
        }
        if(!user){
            req.session.error = 'username or password is incorrect';
            return res.redirect('/login');
        }
        req.logIn(user, (err) =>{
            if(err){
                req.session.error = err;
                return next(err);
            }
            req.session.error = undefined;
            var userInfo = {
                username: req.user.username,
                privilege: req.user.privilege
            };
            req.session.user = userInfo;
            res.redirect('/');
        })
    })(req, res, next);
}

module.exports.logout = function (req, res) {
    if (req.user) {
        console.log('logged out '+ req.user.username);
        req.logout()
        req.session.destroy();
        res.redirect('/login')
    }else{
        req.session.user = undefined;
        res.redirect('/login');
    }
}