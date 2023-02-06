var express = require("express");
var router = express.Router();
const path = require("path");



router.get('/:id', function (req, res) {
  res.sendFile(path.join(__dirname, "../public/dist", 'index.html'));
})

module.exports = router;