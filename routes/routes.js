
var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    console.log("Incoming " + req.method + " req to: " + req.path);
    next();
});

// Add a route
router.get("/", (req, res) => {
    res.json({ message: 'The Restful API is up and running...' });
});

module.exports = router;
