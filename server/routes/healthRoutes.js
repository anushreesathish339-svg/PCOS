const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,

        server: "Running",

        database: "MongoDB",

        version: "1.0.0"

    });

});

module.exports = router;