import { connect } from 'react-redux'
import Photos from '../components/Photos'
import { setMainPhotos } from '../actions'


  
const mapStateToProps = (state) => {
    const {mainPhotos} = state
    return {
        mainPhotos: mainPhotos
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    dispatch(setMainPhotos())
  }

const Gallery = connect(
    mapStateToProps,
    // mapDispatchToProps
  )(Photos)

export default Gallery