import React, { useState, useCallback, useEffect } from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import SelectedImage from "./selectedImage";
import { fetchPhotosIfNeeded } from '../actions'
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
export function Photos(props) {
    useEffect(() => {
        dispatch(fetchPhotosIfNeeded())
    }, []);
    const {dispatch, mainPhotos} = props
    console.log(mainPhotos)
    console.log(photos)
    return (
        <div>
            {/* <button onClick={dispatch(setMainPhotos())}>Go Back!!</button> */}
            {/* <p>{mainPhotos}</p> */}
            <Gallery photos={mainPhotos.items}/>
        </div>
    )
}
export function Photosx(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const Photo = useCallback(
      ({ index, left, top, key, photo, onClick }) => (
        <SelectedImage
          props={props}
          onClick={onClick}
          selected={currentImage === index ? true : false}
          key={key}
          margin={"2px"}
          index={index}
          photo={photo}
          left={left}
          top={top}
        />
      ),
      []
    );
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, [viewerIsOpen]);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
  
    return (
      <div>
        <Gallery photos={props.photos} onClick={props.isMainPage ? props.onClick : openLightbox} renderImage={Photo}/>
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={props.photos.map(x => ({
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