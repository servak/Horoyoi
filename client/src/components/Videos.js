import React from 'react'
import PropTypes from 'prop-types'
import GridList, { GridListTile, GridListTileBar } from '@material-ui/core/GridList';
import { Link } from 'react-router-dom';
import { detailFormatToJa } from '../utils'

const Videos = (props) => {
  const { videos, cols } = props

  let cellWidth = {}
  if (cols === 0) {
    cellWidth = {
      width: '100%',
    }
  }
  return (
    <div>
      <GridList cellHeight={300} cols={cols}>
        {videos.map(tile => (
          <GridListTile key={tile.id} component={Link} to={process.env.PUBLIC_URL + "/videos/" + tile.id} style={cellWidth}>
            <img src={process.env.PUBLIC_URL + "/contents/" + tile.id + '.png'} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>{tile.subtitle + ' ' + detailFormatToJa(tile.start)}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}


Videos.propTypes = {
  videos: PropTypes.array.isRequired
}

export default Videos
