import React from 'react';
const { useState, useEffect } = React;

const ImageSliderItem = ({ photoId, photo, handleImageSliderClick, imageId }) => {

  return (
    <div
      className="image"
      onClick={() => { handleImageSliderClick(photoId) }}
    >
      <img
        src={photo}
        width='100'
        height='161'
        style={photoId === imageId  ? {}:{ opacity: 0.6 }}
      >
      </img>

    </div >
  )
}
export default ImageSliderItem;