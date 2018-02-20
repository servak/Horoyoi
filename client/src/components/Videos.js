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
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


class Videos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tiles: [],
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

  render() {
    const {tiles} = this.state
    return (
      <div>
        <GridList cellHeight={360} cols={3}>
          {tiles.map(tile => (
            <GridListTile key={tile.id} component={Link} to={process.env.PUBLIC_URL + "/videos/" + tile.id}>
              <img src={process.env.PUBLIC_URL + "/videos/" + tile.id + '.png'} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>{tile.subtitle}</span>}
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
