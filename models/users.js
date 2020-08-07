var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
        },
        organization: {
            type: DataTypes.STRING,
        },
        privilege: {
            type: DataTypes.STRING,
        },
    }, 
    {hooks: {
        beforeCreate: function(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }}
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
}