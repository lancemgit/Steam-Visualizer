const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Matches with "/auth"
router.get("/test", function (req, res) {
    res.json({ something2: "something3" });
});

router.get("/steam",
    passport.authenticate("steam", { session: false }));

router.get("/steam/return",
    function (req, res) {

        console.log("=================================\nIn auth routes")
        console.log(req.user);
        const token = jwt.sign({ user: req.user },
            process.env.SECRET_KEY);
        console.log(token);
        res.write
        res.send("Something");
    }, passport.authenticate("steam",
        { session: false }));

module.exports = router;
