const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    steamid: String,
    profileurl: String, // Create the url from concatinating the 64 id on to the base profile url
    steam_level: String,
    avatar: String,
    communityvisibilitystate: String,
    personaname: String,
    views: Number, // The amount of times the profile has been looked up
    last_updated: { type: Date, default: Date.now } //Only update once a day unless force refreshed
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;