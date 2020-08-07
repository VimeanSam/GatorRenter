module.exports = function (sequelize, DataTypes) {
    var messages = sequelize.define('Messages', {
        msgID: {
            type: DataTypes.STRING,
        },
        subject: {
            type: DataTypes.STRING,
        },
        sender: {
            type: DataTypes.STRING,
        },
        recipient : {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.TEXT,
        }
    });
    return messages;
}