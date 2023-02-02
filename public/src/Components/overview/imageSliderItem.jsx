import React from 'react';
const { useState, useEffect } = React;

const ImageSliderItem = ({ photoId, photo, handleImageSliderClick }) => {

  return (
    <div
      className="image"
      onClick={()=>{handleImageSliderClick(photoId)}}
    >
      <img
        src={photo}
        width="100"
      >
      </img>

    </div >
  )
}
export default ImageSliderItem;