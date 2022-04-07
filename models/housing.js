const mongoose = require('mongoose');

const housing = new mongoose.Schema({
    data:[{
        id: Number,
        list: String,
        furnish: String,
        property: String,
        city: String,
        street: String,
        img: String,
        bhk: String,
        state: String,
        phonenumber: String,
        lat: Number,
        long: Number
    }]},
    { collection: "housing-data" }
);
module.exports = mongoose.model("HousingData", housing);