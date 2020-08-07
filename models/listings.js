module.exports = function (sequelize, DataTypes) {
    var listings = sequelize.define('Listings', {
        ID: {
            primaryKey: true,
            type: DataTypes.STRING,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        aptNumber: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        zip: {
            type: DataTypes.INTEGER,
        },
        lat:{
            type: DataTypes.STRING,
        },
        lon:{
            type: DataTypes.STRING,
        },
        district: {
            type: DataTypes.STRING,
        },
        distance: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        leaseLength: {
            type: DataTypes.INTEGER,
        },
        bed:{
            type: DataTypes.INTEGER,
        },
        bath:{
            type: DataTypes.INTEGER,
        },
        size:{
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        postedBy: {
            type: DataTypes.STRING,
        },
        parking: {
            type: DataTypes.STRING,
        },
        laundry: {
            type: DataTypes.STRING,
        },
        amenities: {
            type: DataTypes.STRING,
        },
        media: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
        },
    });
    listings.associate = (models)=>{
        listings.hasMany(models.Images, {foreignKey: 'ListingID'});
    }
    return listings;
}