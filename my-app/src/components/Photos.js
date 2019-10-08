import React, { useState, useCallback, useEffect } from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import SelectedImage from "./selectedImage";
import { fetchMainPhotosIfNeeded, setMainPage, fetchPhotos } from '../actions'

export function Photos(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { dispatch, mainPhotos, isMainPage, photos } = props

  const initFetch = useCallback(() => {
    dispatch(fetchMainPhotosIfNeeded());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  function onClick(event, { photo, index }) {
    dispatch(fetchPhotos(photo.key))
    dispatch(setMainPage(false));
  }
  const Photo = useCallback(
    ({ index, left, top, photo, onClick }) => (
      <SelectedImage
        key={photo.key}
        props={props}
        onClick={onClick}
        selected={currentImage === index ? true : false}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    ),
    [currentImage, props]
  );

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  const goback = () => {
    dispatch(setMainPage(true));
  }
  return (

    <div>
      {isMainPage ? null : <button onClick={goback}>Go Back!!</button>}
      <Gallery photos={isMainPage ? mainPhotos.items : photos.items}
        onClick={isMainPage ? onClick : openLightbox} renderImage={Photo} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.items.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default Photos