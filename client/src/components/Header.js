import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {Pets, InsertEmoticon, Favorite, EventSeat} from '@material-ui/icons';
import {Menu, ChevronLeft, ChevronRight} from '@material-ui/icons';

// redux
import {connect} from 'react-redux'
import {handleDrawer, setVideoSearch} from '../actions'

// custom Component
import AppSearch from './AppSearch'

const drawerWidth = 240;

const styles = theme => ({
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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

class Header extends React.Component {
  static propTypes = {
    handleDrawer: PropTypes.func.isRequired,
    setVideoSearch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }

  render() {
    const { classes, theme, open, handleDrawer, setVideoSearch } = this.props;

    const drawer = (
      <Drawer
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={e => handleDrawer(false)}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <a href={process.env.PUBLIC_URL + "/anime"}>
              <ListItem>
                <ListItemIcon>
                  <Pets />
                </ListItemIcon>
                <ListItemText primary="Anime" />
              </ListItem>
            </a>
            <a href={process.env.PUBLIC_URL + "/variety"}>
              <ListItem>
                <ListItemIcon>
                  <InsertEmoticon />
                </ListItemIcon>
                <ListItemText primary="Variety" />
              </ListItem>
            </a>
            <a href={process.env.PUBLIC_URL + "/drama"}>
              <ListItem>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="Drama" />
              </ListItem>
            </a>
            <a href={process.env.PUBLIC_URL + "/cinema"}>
              <ListItem>
                <ListItemIcon>
                  <EventSeat />
                </ListItemIcon>
                <ListItemText primary="Cinema" />
              </ListItem>
            </a>
          </List>
        </div>
      </Drawer>
    );


    return (
      <div >
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes[`appBarShift-left`]]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={e => handleDrawer(true)}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <Menu />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Horoyoi
            </Typography>
            <AppSearch width={'100px'} onHandleChange={setVideoSearch} />
          </Toolbar>
        </AppBar>
        {drawer}
      </div>
    );
  }
}

export default connect(
  state => ({ open: state.session.open }),
  {handleDrawer, setVideoSearch}
)(withStyles(styles, { withTheme: true })(Header))
