var express = require('express');
var router = express.Router();

/* GET users listing. */
console.log(router)
router.get('/', function(req, res, next) {
  res.send('respond with a1 resource');
});

module.exports = router;
