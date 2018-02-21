import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import VideoIndex from './pages/VideoIndex'
import VideoShow from './pages/VideoShow'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={VideoIndex} />
          <Route exact path="/:category" component={VideoIndex} />
          <Route exact path="/videos/:id" component={VideoShow} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
