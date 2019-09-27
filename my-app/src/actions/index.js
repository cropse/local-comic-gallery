export const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1
    },
    {
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 3,
      height: 4
    }
  ];

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
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const requestPhotos = () => ({
    type: REQUEST_PHOTOS,
  })
      
function receivePhotos(json) {
    
    return {
        type: 'RECEIVE_PHOTOS',
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

export const setMainPhotos = (dispatch, getState) => {
    
    dispatch(requestPhotos())
    const {mainPhotos} = getState()
    if(mainPhotos.isFetching){

    }
    let result = makePromis(staticUrl)

    return async dispatch => {
        const json = await result;
        return dispatch(receivePhotos(json));
        // type: 'SET_MAIN_PHOTOS',
        // mainPhotos: photos
    }
}

const shouldFetchPhotos = (state) => {
    const {photos} = state.mainPhotos
    if (!photos) {
      return true
    }
    if (photos.isFetching) {
      return false
    }
    return photos.didInvalidate
  }
  
  export const fetchPhotosIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchPhotos(getState())) {
      return dispatch(setMainPhotos(dispatch, getState))
    }
  }
