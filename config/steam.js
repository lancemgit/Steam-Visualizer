const passport = require("passport");
const SteamStrategy = require("passport-steam");

const strategyOptions = {
    returnURL: `http://localhost:3001/auth/steam/return`,
    realm: "http://localhost:3001",
    apiKey: process.env.STEAM_KEY
}

module.exports = app => {

    passport.use(new SteamStrategy(strategyOptions,
        async (identifier, profile, done) => {
            console.log("=================================\nHitting Steam Strategy");

            profile.identifier = identifier;

            const user = {
                id: profile._json.steamid,
                name: profile._json.personaname,
                avatar: profile._json.avatar
            }

            return done(null, user);
        }));

    app.use(passport.initialize());

};

