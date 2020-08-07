module.exports.RegexEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
        return false;
    }
    return true;
}

module.exports.validateEmail = function (email, privilege) {
    if(this.RegexEmail(email) && privilege === 'Student'){
        let idx = email.indexOf("@");
        let emailEnding = email.substring(idx+1, email.length);
        if(emailEnding === 'mail.sfsu.edu'){
            return '';
        }else{
            return 'Non SFSU email detected';
        }
    }
    if(this.RegexEmail(email) && privilege === 'LandLord'){
        return '';
    }
    return 'Email is invalid!';
}

module.exports.validatePassword = function (password){
    if(password.length < 7){
        return 'Password must be more than 7 characters!';
    }
    var matchedCase = [];
    matchedCase.push("[$@$!%*#?&]"); // Special Charector
    matchedCase.push("[A-Z]");      // Uppercase 
    matchedCase.push("[0-9]");      // Numbers
    matchedCase.push("[a-z]");     // Lowercase
    var matched = 0;
    var strength = '';
    for (var i = 0; i < matchedCase.length; i++) {
        if (new RegExp(matchedCase[i]).test(password)) {
            matched++;
        }
    }
    switch (matched) {
        case 0:
            return 'Password must contain uppercase, lowercase, and numbers or special characters';
        case 1:
            return 'Password must contain uppercase, lowercase, and numbers or special characters';
        case 2:
            return 'Password must contain uppercase, lowercase, and numbers or special characters';
        case 3:
            break;
        case 4:
            break;
    }
    return '';
}