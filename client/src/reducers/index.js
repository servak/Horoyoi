import { combineReducers } from 'redux'
import { LOAD_VIDEOS, TOGGLE_DRAWER, SET_VIDEO_FILTER } from '../actions'

const videoReducer = (state = {contents: []}, action) => {
  switch (action.type) {
    case LOAD_VIDEOS:
      return {contents: action.videos}

    default:
      return state
  }
};

 
const sessionReducer = (state = {open: false, searchText: ''}, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {open: action.bool}
    case SET_VIDEO_FILTER:
      return {searchText: action.text}
    default:
      return state
  }
}

export default combineReducers({
  videos: videoReducer,
  session: sessionReducer,
})
