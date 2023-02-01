import React from 'react';
const { useState, useEffect } = React;
import $ from 'jquery';
import imageStyle from './imagestyle.css';
import ImageSliderItem from './imageSliderItem';


const Image = ({ pictures, curretStyle }) => {

  const [imageId, setImageId] = useState(0);
  const [currentStylePhotos, setCurrentStylePhotos] = useState([]);

  useEffect(() => {
    setCurrentStylePhotos(pictures ? pictures.photos : null);
  })


  // scrolling image slider React example
  // https://codepen.io/rmody3/pen/EXObmR
  const scroll = (direction) => {
    let far = $('.image-container').width() / 2 * direction;
    let pos = $('.image-container').scrollLeft() + far;
    $('.image-container').animate({ scrollLeft: pos }, 1000)
  }

  const handleImageSliderClick = (id)=>{
    setImageId(id);
  }


  return (
    <div className="images" style={imageStyle}>
      <h3>Image</h3>

      <div className='main-image'> 
        {(() => {
          if (pictures) {
            return (
              <img
                src={pictures.photos[imageId].url}
                width="400">
              </img>
            )
          }
        })()}
      </div>

      <div className='image-slider'> image slider
        <div className="wrapper">
          <a className="prev" onClick={() => { scroll(-1) }}>&#10094;</a>
          <div className="image-container">
            {pictures?(pictures.photos.map((e, i) => {
              return (<ImageSliderItem
                key={`image-slider-${i}`}
                photoId={i}
                photo={e.thumbnail_url}
                handleImageSliderClick={handleImageSliderClick}
              />)
            }
            )):null}
          </div>
          <a className="next" onClick={() => { scroll(1) }}>&#10095;</a>
        </div>

      </div>
    </div>
  )
}
export default Image;