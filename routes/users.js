var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ user: 'usert 1' });
});

module.exports = router;
