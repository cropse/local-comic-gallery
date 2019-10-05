import { connect } from 'react-redux'
import Photos from '../components/Photos'

const mapStateToProps = (state) => {
  const { mainPhotos, isMainPage, photos } = state
  return {
    photos,
    mainPhotos,
    isMainPage
  }
}

const Gallery = connect(
  mapStateToProps,
)(Photos)

export default Gallery