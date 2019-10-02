import {combineReducers} from 'redux'
import {
    INVALIDATE_SUBREDDIT,
    REQUEST_PHOTOS, RECEIVE_PHOTOS
  } from '../actions'
  

const mainPhotos = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  }, action) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
          return {
            ...state,
            didInvalidate: true
          }
        case REQUEST_PHOTOS:
          return {
            ...state,
            isFetching: true,
            didInvalidate: false
          }
        case RECEIVE_PHOTOS:
          return {
            ...state,
            isFetching: false,
            didInvalidate: false,
            items: action.mainPhotos,
            lastUpdated: action.receivedAt
          }
        default:
          return state
      }
    }

const isMainPage = (state = true, action) =>{
  switch (action.type){
    
    default:
      return state
  }

}
export default combineReducers({
    mainPhotos,
    // photos,
    isMainPage,
    // selectIndex,
})