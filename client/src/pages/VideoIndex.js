import React, { Component } from 'react';
import Layout from '../components/Layout'
import Videos from '../components/Videos'

class VideoIndex extends Component {
  render() {
    const {category} = this.props.match.params
    const contents = (
      <Videos category={category} />
    )
    return (
      <div className="App">
        <Layout contents={contents} />
      </div>
    );
  }
}

export default VideoIndex;
