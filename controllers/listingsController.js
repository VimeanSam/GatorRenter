const db = require('../models');
const fs = require('fs');
const cloudinary = require('../config/cloudinaryConfig');
const districts = require('../config/api/districts.json');
const axios = require('axios');

module.exports.postListing = async function(req, res){
    //console.log(req.body);
    const uploader = async (path) => await cloudinary.uploads(path, 'csc648Spr19');
    const urls = [];
    let amenities = [];
    let postedBy = req.session.user.username;
    let aptNum = -1;
    let milesFromSFSU = 0;
    //console.log(req.files);
    for(let i = 0; i < req.files.length; i++){
        const link = req.files[i].path;
        const newPath = await uploader(link);
        //console.log(newPath.url);
        let lastDash = newPath.url.toString().lastIndexOf("/");
        let imgName = newPath.url.substring(lastDash+1, newPath.url.length);
        //console.log(imgName);
        urls.push(imgName);
        fs.unlinkSync(link);
    }
    //console.log(urls);
    const {title, type, address, city, USstate, zip, district, price, leaseLength, bed, bath, size, description, parking, laundry} = req.body;
    if(req.body.pets){
        amenities.push('Pets Allowed');
    }
    if(req.body.furnished){
        amenities.push('Furnished');
    }
    if(req.body.ac){
        amenities.push('Air Conditioning');
    }
    if(req.body.heat){
        amenities.push('Heating');
    }
    if(req.body.nosmoke){
        amenities.push('No Smoking');
    }
    if(req.body.wheelchair){
        amenities.push('Wheel Chair Access');
    }
    if(req.body.unit){
        aptNum = parseInt(req.body.unit)
    }
    for(let i = 0; i < districts.length; i++){
        if(districts[i].name === district){
            let idx = districts[i].distance_from_sfsu.toString().indexOf(" ");
            milesFromSFSU = parseInt(districts[i].distance_from_sfsu.substring(0, idx)).toFixed(1);
        }
    }
    let postID = Date.now().toString()+Math.random().toString(36).substr(2, 9);
    let lat = 0;
    let lon = 0;
    let fulladdr = address+", "+city+", "+USstate+", "+zip;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${fulladdr}&key=AIzaSyBBNjrb6RxkSfQDRg5N-frWt3FZOlcNfWI`)
    //console.log(response.data.results[0].geometry);
    if(response){
        lat = response.data.results[0].geometry.location.lat;
        lon = response.data.results[0].geometry.location.lng;
    }
    //console.log(amenities.join(", "));
    db.Listings.create({
        ID: postID, 
        title: title, 
        type: type, 
        address: address, 
        aptNumber: aptNum,
        city: city.toString().toLowerCase(), 
        state: USstate, 
        zip: parseInt(zip), 
        lat: lat.toString(),
        lon: lon.toString(),
        district: district, 
        distance: parseInt(milesFromSFSU),
        price: parseInt(price), 
        leaseLength: parseInt(leaseLength), 
        bed: parseInt(bed), 
        bath: parseInt(bath), 
        size: parseInt(size), 
        description: description, 
        postedBy: postedBy, 
        parking: parking, 
        laundry: laundry, 
        amenities: amenities.join(", "),
        media: urls[0],
        status: 'pending'
    }).then((estate) => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error);
    });
    for(let i = 0; i < urls.length; i++){
        db.Images.create({
            ListingID: postID,
            postID: postID,
            url: urls[i]
        }).then((img) => {
            console.log(urls[i]+" saved successfully");
        }).catch((error) => {
            console.log(error);
        });
    }
}

module.exports.getPending = function(req, res) {
    if(req.session.user){
        if(req.session.user.privilege === "Administrator"){
            db.Listings.findAll({
                where: {
                    status: 'pending'
                },
                raw: true
            })
            .then((data) =>{
                //console.log(data);
                res.render('adminDashboard', {user: req.session.user, listings: data});
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect('/login');
    }
}

module.exports.getByID = function(req, res) {
    db.Listings.findAll({
        where: {
            ID: req.body.lid
        },
        raw: true
    })
    .then((data) =>{
        //console.log(data);
        res.send(data)
    })
    .catch((err) =>{
        console.log(err);
    })
}

module.exports.updateListing = async function(req, res) {
    const {lid, address, aptNumber, city, zip, price, district, type, bed, bath, size, pets, furnished, ac, heat, nosmoke, wheelchair, description} = req.body;
    let aptnum = -1;
    let milesFromSFSU = 0;
    let amenities = [];
    if(aptNumber){
        aptnum = parseInt(aptNumber)
    }
    if(pets){
        amenities.push('Pets Allowed');
    }
    if(furnished){
        amenities.push('Furnished');
    }
    if(ac){
        amenities.push('Air Conditioning');
    }
    if(heat){
        amenities.push('Heating');
    }
    if(nosmoke){
        amenities.push('No Smoking');
    }
    if(wheelchair){
        amenities.push('Wheel Chair Access');
    }

    for(let i = 0; i < districts.length; i++){
        if(districts[i].name === district){
            let idx = districts[i].distance_from_sfsu.toString().indexOf(" ");
            milesFromSFSU = parseInt(districts[i].distance_from_sfsu.substring(0, idx)).toFixed(1);
        }
    }

    let lat = 0;
    let lon = 0;
    let fulladdr = address+", "+city+", CA"+", "+zip;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${fulladdr}&key=AIzaSyBBNjrb6RxkSfQDRg5N-frWt3FZOlcNfWI`)
    //console.log(response.data.results[0].geometry);
    if(response){
        lat = response.data.results[0].geometry.location.lat;
        lon = response.data.results[0].geometry.location.lng;
    }

    db.Listings.update(
        {
            type: type, 
            address: address, 
            aptNumber: aptnum,
            city: city.toString().toLowerCase(), 
            zip: parseInt(zip), 
            lat: lat.toString(),
            lon: lon.toString(),
            district: district, 
            distance: parseInt(milesFromSFSU),
            price: parseInt(price), 
            bed: parseInt(bed), 
            bath: parseInt(bath), 
            size: parseInt(size), 
            description: description, 
            amenities: amenities.join(", "),
        },
        {where: {ID: lid}})
    .then((data) =>{
        res.send(data)
        console.log('update successfully');
        res.end();
    })    
    .catch((err) =>{
        console.log(err);
    })
}

module.exports.viewPending = function(req, res) {
    //console.log(req.params.id);
    if(req.session.user){
        if(req.session.user.privilege === "Administrator"){
            db.Listings.findAll({
                include: [{model: db.Images, as: 'Images'}],
                where: {
                    status: 'pending',
                    ID: req.params.id.toString()
                }
            })
            .then((data) =>{
                //console.log(data);
                res.render('homeprofile', {user: req.session.user, listings: data});
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect('/login');
    }
}

module.exports.approvePost = function(req, res) {
    db.Listings.update(
        {status: 'approved'},
        {where: {status: 'pending', ID: req.body.ID.toString()}})
    .then((data) =>{
        console.log('update successfully');
    })    
    .catch((err) =>{
        console.log(err);
    })
}

module.exports.rejectPost = function(req, res) {
    db.Listings.destroy({
        where: {
            status: 'pending',
            ID: req.body.ID.toString()
        }
    })
    .then((response) =>{
        console.log('delete successfully');
    })
    .catch((err) =>{
        console.log(err);
    })
}

module.exports.deletePost = function(req, res) {
    db.Listings.destroy({
        where: {
            ID: req.body.ID.toString()
        }
    })
    .then((response) =>{
        console.log('delete successfully');
    })
    .catch((err) =>{
        console.log(err);
    })
}

module.exports.filterPost = function(req, res) {
    //console.log(req.body);
    let find = "status = 'approved'";
    let query = req.body.query;
    let price = req.body.price;
    let type = req.body.type;
    let bed = req.body.bed;
    let bath = req.body.bath;
    let distance = req.body.distance;
    if(query !== ''){
        if(!isNaN(parseInt(query.toLocaleLowerCase()) && query !== '')){
            find+=` AND zip = ${parseInt(query)}`;
        }
        if(isNaN(parseInt(query.toLocaleLowerCase()) && query !== '')){
            find+=` AND city = '${query}'`;
        }
    }
    if(price !== ''){
        let priceRange = price;
        if(priceRange.includes("-")){
            let range = priceRange.split('-');
            find+=` AND price >= ${parseInt(range[0])} AND price <= ${parseInt(range[1])}`;
        }else{
            if(parseInt(price) == 500){
                find+=` AND price < ${parseInt(price)}`;
            }
            if(parseInt(price) == 3000){
                find+=` AND price > ${parseInt(price)}`;
            }
        }
    }
    if(type !== ''){
        find+=` AND type = '${type}'`;
    }
    if(bed > 0){
        if(bed < 5){
            find+=` AND bed = ${bed}`;
        }else{
            find+=` AND bed >= ${bed}`;
        }
    }
    if(bath > 0){
        if(bath < 4){
            find+=` AND bath = ${bath}`;
        }else{
            find+=` AND bath >= ${bath}`;
        }
    }
    if(distance !== ''){
        let distanceRange = distance;
        if(distanceRange.includes("-")){
            let range = distanceRange.split('-');
            find+=` AND distance >= ${parseInt(range[0])} AND distance <= ${parseInt(range[1])}`;
        }else{
            if(parseInt(distance) == 1){
                find+=` AND distance < ${parseInt(distance)}`;
            }
            if(parseInt(distance) == 8){
                find+=` AND distance > ${parseInt(distance)}`;
            }
        }
    }
    db.sequelize.query(`SELECT * FROM Listings WHERE ${find}`, {
        type: db.sequelize.QueryTypes.SELECT
    }).then((data) => {
        //console.log(data);
        res.render('search_results', {body: req.body, user: req.session.user, listings: data, query: query});
    }).catch( err => {
        console.log(err);
    })
}

module.exports.searchListings = function(req, res) {
    let searchQuery = req.body.searchQuery;
    let find = {status: 'approved'};
    if(isNaN(searchQuery) && searchQuery !== ''){
        find = {status: 'approved', city: searchQuery.toString()}
    }
    if(!isNaN(searchQuery) && searchQuery !== ''){
        find = {status: 'approved', zip: parseInt(searchQuery)}
    }
    db.Listings.findAll({
        where: find,
        raw: true
    })
    .then((data) =>{
        //console.log(data);
        res.render('search_results', {user: req.session.user, listings: data, query: searchQuery});
    })
    .catch((err) =>{
        console.log(err);
    })
}

module.exports.viewApprovedListings = function(req, res) {
    db.Listings.findAll({
        include: [{model: db.Images, as: 'Images'}],
        where: {
            status: 'approved',
            ID: req.params.id.toString()
        }
    })
    .then((data) =>{
        //console.log(data);
        res.render('homeprofile', {user: req.session.user, listings: data});
    })
    .catch((err) =>{
        console.log(err);
    })
}

module.exports.mylistings = function (req, res){
    if(req.session.user){
        if(req.session.user.privilege === "LandLord"){
            db.Listings.findAll({
                where: {
                    postedBy: req.session.user.username,
                },
                raw: true
            })
            .then((data) =>{
                //console.log(data);
                res.render('mylistings', {user: req.session.user, listings: data});
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