module.exports = function (sequelize, DataTypes) {
    var images = sequelize.define('Images', {
        postID: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        }
    });
    images.associate = (models) =>{
        images.belongsTo(models.Listings);
    }
    return images;
}