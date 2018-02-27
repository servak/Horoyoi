/*
 * action types
 */
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const LOAD_VIDEOS = 'LOAD_VIDEOS'
export const SET_VIDEO_FILTER = 'SET_VIDEO_FILTER'

/*
 * action creators
 */
 
export const setVideoSearch = (text) => {
  return { type: SET_VIDEO_FILTER, text }
}
 
export const handleDrawer = (bool) => {
  return { type: TOGGLE_DRAWER, bool }
}
 
const fetchVideosClient = async (category='all', title='') => {
  let url = '/api/videos'
  let query = {}
  if (category !== 'all') {
    query['category'] = category
  }
  if (title) {
    query['title'] = title
  }

  const reqQuery = []
  for (const key in query) {
    reqQuery.push(`${key}=${query[key]}`);
  }

  url += '?' + reqQuery.join('&')
  const response = await fetch(url, {credentials: "same-origin"})
  return await response.json()
}


export const fetchVideos = (category='all') => async (dispatch, getState) => {
  const {session} = getState()
  const searchText = session.searchText
  const r = await fetchVideosClient(category, searchText)
  dispatch({type: LOAD_VIDEOS, videos: r})
}
