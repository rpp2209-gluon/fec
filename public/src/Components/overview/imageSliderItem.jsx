import React from 'react';
const { useState, useEffect } = React;

const ImageSliderItem = ({ photoId, photo, handleImageSliderClick, imageId }) => {

  return (
    <div
      className="image"
      onClick={()=>{handleImageSliderClick(photoId)}}
      style={ photoId === imageId  ? { backgroundColor: 'yellow'} : {}}
    >
      <img
        src={photo}
        width='100'
        height='161'
        style={{ borderColor: 'yellow'} }
      >
      </img>

    </div >
  )
}
export default ImageSliderItem;