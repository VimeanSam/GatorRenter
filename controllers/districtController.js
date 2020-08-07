const axios = require("axios")
module.exports.getAll = function (req, res){
    axios.get("https://gatorrenter-districts.herokuapp.com/districts")
    .then((networkResponse) => {
        res.send(networkResponse.data)
    })
    .catch((err) => {
        res.send(err);
    });
}

module.exports.getDistrictbyName = function (req, res){
    let name = req.query.name;
    axios.get("https://gatorrenter-districts.herokuapp.com/districts")
    .then((networkResponse) => {
        for(let keys in networkResponse.data){
            if (networkResponse.data.hasOwnProperty(keys)) {
                if(name === networkResponse.data[keys].Name){
                    res.send(networkResponse.data[keys])
                }
            }
        }
    })
    .catch((err) => {
        res.send(err);
    });
}