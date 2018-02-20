const express = require('express');
const router = express.Router();
const Client = require('castv2-client').Client;
const DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;

const SAMPLE = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
var host = '192.168.1.99';
var client = new Client();
var player;

client.connect(host, function() {
  console.log(host + ' connected.')
});

router.post('/play', async function(req, res, next) {
  const server = req.protocol + '://' + req.get('host') + '/videos/'
  let content = SAMPLE
  if ('id' in req.body) {
    content = server + req.body.id + '.mp4'
  }

  client.launch(DefaultMediaReceiver, function(err, _player) {
    player = _player;
    if(err) {
      console.log(err);
      return;
    }

    // play a video
    player.load({contentId: content}, { autoplay: true }, function(err, status) {
      res.send('api cast');
    });
  });
  client.on('error', function(err) {
    console.log('Error: %s', err.message);
    client.close();
  });
});

router.get('/status', function(req, res, next) {
  if (!player) {
    res.send('no player');
    return;
  }
  player.getStatus(function(err, status) {
    res.send(status);
  });
});

router.post('/seek', function(req, res, next) {
  if (!player) {
    res.send('no player');
    return;
  }

  player.getStatus(function(err, status) {
    if(err) {console.log(err);return;}
    var seekTime = status.currentTime;
    if ('set' in req.body) {
      seekTime = parseInt(req.body.set);
    } else if ('ff' in req.body) {
      seekTime = seekTime + parseInt(req.body.ff);
    } else if ('rew' in req.body) {
      seekTime = seekTime - parseInt(req.body.rew);
    }

    player.seek(seekTime, function(err, status) {
      if(err) {console.log(err);return;}
      res.send('set ' + seekTime);
    });
  });
});

router.post('/stop', function(req, res, next) {
  if (!player) {
    res.send('no player');
    return;
  }
  player.stop(function() {
    res.send('cast stoped.');
  });
});

client.on('error', function(err) {
  console.log('Error: %s', err.message);
  client.close();
});

module.exports = router;
