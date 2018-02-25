const express = require('express');
const router = express.Router();
const path = require('path');

const public_root = path.join(__dirname, '../client/build')
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: public_root })
});

router.get('/:category', function(req, res, next) {
  res.sendFile('index.html', { root: public_root })
});

module.exports = router;
