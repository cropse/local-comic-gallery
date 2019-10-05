import { combineReducers } from 'redux'
import {
  INVALIDATE_SUBREDDIT,
  REQUEST_PHOTOS, RECEIVE_PHOTOS, RECEIVE_MAIN_PHOTOS, SET_MAIN_PAGE
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
    case RECEIVE_MAIN_PHOTOS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.mainPhotos,
      }
    default:
      return state
  }
}

const isMainPage = (state = true, action) => {
  switch (action.type) {
    case SET_MAIN_PAGE:
      return action.isMainPage
    default:
      return state
  }
}

const photos = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case RECEIVE_PHOTOS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.photos,
      }
    default:
      return state
  }
}

export default combineReducers({
  mainPhotos,
  photos,
  isMainPage,
  // selectIndex,
})