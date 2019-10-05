const staticUrl = 'http://localhost:8888'

function makePromis(url) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return fetch(url, { headers: headers }).then((result) => {
    return result.json()
  })
}

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'
export const RECEIVE_MAIN_PHOTOS = 'RECEIVE_MAIN_PHOTOS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const SET_MAIN_PAGE = 'SET_MAIN_PAGE'


function receiveMainPhotos(json) {

  return {
    type: RECEIVE_MAIN_PHOTOS,
    mainPhotos: json.filter((item, index, array) => {
      return item.type === "directory"
    }).map((e) => {
      return {
        src: staticUrl + '/' + encodeURIComponent(e.name) + '/1.jpg',
        width: 3,
        height: 4,
        key: e.name,
      }
    }),
  }
}

const setMainPhotos = (dispatch, getState) => {

  let result = makePromis(staticUrl)
  return async dispatch => {
    const json = await result;
    return dispatch(receiveMainPhotos(json));
  }
}

const shouldFetchPhotos = (state) => {
  const { photos } = state.mainPhotos
  if (!photos) {
    return true
  }
  if (photos.isFetching) {
    return false
  }
  return photos.didInvalidate
}

export const fetchMainPhotosIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPhotos(getState())) {
    return dispatch(setMainPhotos(dispatch, getState))
  }
}

export const setMainPage = (isMainPage) => {
  return {
    type: SET_MAIN_PAGE,
    isMainPage
  }
}

export const fetchPhotos = (path) => {
  console.log(staticUrl + '/' + encodeURIComponent(path) + '/')
  let result = makePromis(staticUrl + '/' + encodeURIComponent(path) + '/')
  return async dispatch => {
    const json = await result;
    return dispatch(receivePhotos(json, path));
  }
};

function receivePhotos(json, path) {
  return {
    type: RECEIVE_PHOTOS,
    photos: json.sort((a, b) => { return a.name.split(".")[0] - b.name.split(".")[0] }).map((e) => {
      return {
        src: staticUrl + '/' + encodeURIComponent(path + '/' + e.name),
        width: 3,
        height: 4,
        key: e.name,
      }
    }),
  }
}