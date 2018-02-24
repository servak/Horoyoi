import React, { Component } from 'react';
import './App.css';

// components
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Header from './components/Header'

// routers
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import VideoIndex from './containers/VideoIndex'
import VideoShow from './containers/VideoShow'

const drawerWidth = 240;

const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
  flex: {
    flex: 1,
  }
});

class App extends Component {
  render() {
    const { classes, open } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header />
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}
          >
            <BrowserRouter>
              <div>
                <Route exact path="/" component={VideoIndex} />
                <Route exact path="/:category" component={VideoIndex} />
                <Route exact path="/videos/:id" component={VideoShow} />
              </div>
            </BrowserRouter>
          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(
  state => ({ open: state.session.open }),
)(withStyles(styles, { withTheme: true })(App))
