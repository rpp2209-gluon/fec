import React from 'react';
const { useState, useEffect } = React;

const ImageSliderItem = ({ photoId, photo, handleImageSliderClick, imageId }) => {

  return (
    <div
      className="image-slider-pic"
      onClick={() => { handleImageSliderClick(photoId) }}
    >
      <img
        src={photo}
        style={photoId === imageId  ? {}:{ opacity: 0.5}}
      >
      </img>

    </div >
  )
}
export default ImageSliderItem;