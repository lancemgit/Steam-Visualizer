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
            res.render("authenticated", { jwtToken: JSON.stringify(token), realm: JSON.stringify(process.env.REACT_APP_REALM) });
        });


router.get("/verify", function (req, res) {
    try {
        jwt.verify(req.query.token, process.env.SECRET_KEY)
        res.json({ verified: true });
    } catch (error) {
        res.json({ verified: false });
    }
});
module.exports = router;
