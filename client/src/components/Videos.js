import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { Link } from 'react-router-dom';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


class Videos extends Component {
  constructor(props) {
    super(props)
    const col = parseInt(window.innerWidth / 400, 10)
    this.state = {
      tiles: [],
      col: col,
    }
  }

  async componentDidMount() {
    const {category} = this.props
    let url = '/api/videos'
    if (category !== 'all') {
      url += `?category=${category}`
    }
    const response = await fetch(url, {})
    const obj = await response.json()
    this.setState({tiles: obj})
  }

  detailFormatToJa(d) {
    var year = d.getFullYear(),
        month = d.getMonth() + 1,
        date = d.getDate(),
        hour = d.getHours(),
        minutes = d.getMinutes();

    month = (month < 10) ? '0' + month : month;
    date = (date < 10) ? '0' + date : date;
    hour = (hour < 10) ? '0' + hour : hour;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    var format = year + '/' + month + '/' + date + ' ' + hour + ':' + minutes;
    var dDelta = (Date.now() - d.getTime()) / 1000;
    var dDeltaStr = '';

    if (dDelta < 0) {
      dDelta -= dDelta * 2;

      if (dDelta < 60) {
        dDeltaStr = [Math.round(dDelta) || '0'] + '秒後';
      } else {
        dDelta = dDelta / 60;

        if (dDelta < 60) {
          dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '分後';
        } else {
          dDelta = dDelta / 60;

          if (dDelta < 24) {
            dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '時間後';
          } else {
            dDelta = dDelta / 24;

            dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '日後';
          }
        }
      }
    } else {
      if (dDelta < 60) {
        dDeltaStr = [Math.round(dDelta) || '0'] + '秒前';
      } else {
        dDelta = dDelta / 60;

        if (dDelta < 60) {
          dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '分前';
        } else {
          dDelta = dDelta / 60;

          if (dDelta < 24) {
            dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '時間前';
          } else {
            dDelta = dDelta / 24;

            dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '日前';
          }
        }
      }
    }

    return format + ' ('+ dDeltaStr + ')';
  }


  render() {
    const {tiles} = this.state
    return (
      <div>
        <GridList cellHeight={300} cols={this.state.col}>
          {tiles.map(tile => (
            <GridListTile key={tile.id} component={Link} to={process.env.PUBLIC_URL + "/videos/" + tile.id}>
              <img src={process.env.PUBLIC_URL + "/contents/" + tile.id + '.png'} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>{tile.subtitle + ' ' + this.detailFormatToJa(new Date(tile.start))}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

Videos.defaultProps = {
  category: 'all'
}

Videos.propTypes = {
  category: PropTypes.string.isRequired,
};


export default withStyles(styles, { withTheme: true })(Videos);
