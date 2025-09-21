const express = require("express");
const stops = require("../data/stops");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(stops);
});

module.exports = router;
