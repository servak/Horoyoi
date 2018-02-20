const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dbPromise = require('../db');

router.get('/:id.mp4', async function(req, res) {
  const id = req.params.id;
  let mp4 = __dirname + '/../videos/' + id + '.mp4';
  if (!fs.existsSync(mp4)) {
    // for develop
    mp4 = __dirname + '/../sample.mp4';
  }

  var stat = fs.statSync(mp4), total = stat.size;
  if (req.headers['range']) {
    var range = req.headers.range;
    var parts = range.replace(/bytes[=: ]*/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;

    var file = fs.createReadStream(mp4, {start: start, end: end});
    res.status(206).header({
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    });
    file.pipe(res);
  } else {
    res.status(200)
      .header({'Content-Length': total, 'Content-Type': 'video/mp4'});
    fs.createReadStream(mp4).pipe(res);
  }
});

router.get('/:id.png', function(req, res) {
  var id = req.params.id;
  var path = __dirname + '/../thumbnails/' + id + '.png';
  if (!fs.existsSync(path)) {
    // for develop
    path = __dirname + '/../sample.png';
  }

  var stat = fs.statSync(path);
  res.status(200).header({
      'Content-Length': stat.size,
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
  });
  fs.createReadStream(path).pipe(res);
});

module.exports = router;
