var express = require("express");
var router = express.Router();
const path = require("path");



router.get('/', function (req, res) {
  res.send(express.static(path.join(__dirname, "../public/dist")));
})

module.exports = router;