const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Matches with "/auth"


router.get("/steam",
    passport.authenticate("steam", { session: false }));

router.get("/steam/return",
    function (req, res, next) {
        req.url = req.originalUrl;
        next();
    }, passport.authenticate("steam",
        { session: false }), function (req, res) {
            console.log("=================================\nHitting Auth Routes");
            let token = jwt.sign({ user: req.user },
                process.env.SECRET_KEY);
            res.render("authenticated", { jwtToken: JSON.stringify(token) });
        });

module.exports = router;
