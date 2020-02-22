const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    appid: Number, //Steam API
    title: String, //Steam API
    short_description: String, //Steam API
    header_image: String, //Steam API
    developer: String,
    publisher: String,
    positive: Number,
    negative: Number,
    owners: String,
    average_forever: Number,
    average_2weeks: Number,
    median_forever: Number,
    median_2weeks: Number,
    ccu: Number,
    genre: String,
    release_date: String, //Steam API
    last_updated: { type: Date, default: Date.now } // Only be refreshed once a day unless forced
});

const Games = mongoose.model("Games", gameSchema);

module.exports = Games;