import React, { Component } from 'react';
import PropTypes from 'prop-types'


class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      casting: false,
      video: {
      },
    }
  }

  async componentDidMount() {
    const { id } = this.props;
    const response = await fetch('/api/videos/' + id, {credentials: "same-origin"})
    const obj = await response.json()
    this.setState({video: obj})
  }

  componentWillUnmount() {
      this.refs.vidRef.pause()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
        this.refs.vidRef.load();
    }
  }

  playback(num) {
    this.refs.vidRef.playbackRate = num;
  }

  fastForward(num) {
    if(this.state.casting) {
      const payload = JSON.stringify({ff: num})
      fetch('/api/casts/seek', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: payload,
        credentials: "same-origin",
      }).then(function(response) {
        console.log(response);
      })
    } else {
      const player = this.refs.vidRef;
      if (!player.paused) {
        player.pause();
      }
      player.currentTime = player.currentTime + num;
    }
  }

  rewind(num) {
    if(this.state.casting) {
      const payload = JSON.stringify({ff: num})
      fetch('/api/casts/seek', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: payload,
        credentials: "same-origin",
      }).then(function(response) {
        console.log(response);
      })
    } else {
      const player = this.refs.vidRef;
      if (!player.paused) {
        player.pause();
      }
      player.currentTime = player.currentTime - num;
    }
  }

  playcast() {
    const that = this
    const payload = JSON.stringify({
      id: that.props.id,
    })
    fetch('/api/casts/play', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: payload,
      credentials: "same-origin",
    }).then(function(response) {
      that.setState({
        casting: true,
      });
    })
  }

  render() {
    const { classes, id } = this.props;
    const { video } = this.state;
    const url = '/contents/' + id + '.mp4'
    const thumbnail = '/contents/' + id + '.png'
    const castimg = this.state.casting ? (<CastConnected />): (<Cast />);
    return (
      <div>
        <video id="myvideo"
               ref="vidRef"
               src={url}
               poster={thumbnail}
               controls
               preload="auto"
               width="70%"/>
        <Typography variant="headline" gutterBottom>{video.title}</Typography>
        <Typography variant="subheading" gutterBottom>{video.subtitle}</Typography>
        <Typography variant="body1" gutterBottom>{video.detail}</Typography>

        <Paper>
          <BottomNavigation >
            <BottomNavigationAction icon={<Replay5 onClick={this.rewind.bind(this, 5)} />} />
            <BottomNavigationAction icon={<Replay10 onClick={this.rewind.bind(this, 10)} />} />
            <BottomNavigationAction icon={<Replay30 onClick={this.rewind.bind(this, 30)} />} />
            <BottomNavigationAction icon={<Forward10 onClick={this.fastForward.bind(this, 10)} />} />
            <BottomNavigationAction icon={<Forward30 onClick={this.fastForward.bind(this, 30)} />} />
          </BottomNavigation>
        </Paper>
        <Paper>
          <BottomNavigation showLabels >
            <BottomNavigationAction label="すごくゆっくり" icon={<DirectionsWalk />} onClick={this.playback.bind(this, 0.25)} />
            <BottomNavigationAction label="ゆっくり再生" icon={<DirectionsRun />} onClick={this.playback.bind(this, 0.5)} />
            <BottomNavigationAction label="通常再生" icon={<PlayArrow />} onClick={this.playback.bind(this, 1)} />
            <BottomNavigationAction label="早め" icon={<DirectionsBike />} onClick={this.playback.bind(this, 1.5)} />
            <BottomNavigationAction label="倍速再生" icon={<Flight />} onClick={this.playback.bind(this, 2)} />
          </BottomNavigation>
          <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={this.playcast.bind(this)} >
            {castimg}
          </Button>
        </Paper>
      </div>
    )
  }
}

Videos.propTypes = {
  videos: PropTypes.array.isRequired
}

export default Videos
