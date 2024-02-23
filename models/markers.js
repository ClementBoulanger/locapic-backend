const mongoose = require('mongoose');

const markerSchema = mongoose.Schema({
    nickname : String,
    name: String,
    latitude: String,
    longitude: String,
})

const Marker = mongoose.model('markers', markerSchema)

module.exports = Marker