import React, { Component } from 'react';
import Videos from '../components/Videos'
import { connect } from 'react-redux'

// actions
import {fetchVideos} from '../actions'

class VideoIndex extends Component {
  componentWillMount() {
    const {category} = this.props.match.params
    this.props.fetchVideos(category)
  }

  componentWillReceiveProps(nextProps) {
    const category = this.props.match.params.category
    const nextCategory = nextProps.match.params.category

    const searchText = this.props.searchText
    const nextSearchText = nextProps.searchText
    if (category !== nextCategory || searchText !== nextSearchText) {
      this.props.fetchVideos(category, nextSearchText)
    }
  }

  render() {
    const col = parseInt(window.innerWidth / 400, 10)
    const {videos} = this.props
    return (
      <div className="App">
        <Videos videos={videos} cols={col}/>
      </div>
    );
  }
}

export default connect(
  state => ({ videos: state.videos.contents, searchText: state.session.searchText }),
  {fetchVideos}
)(VideoIndex)
