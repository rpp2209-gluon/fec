import React from 'react';
const { useState, useEffect } = React;
import $ from 'jquery';
import imageStyle from './imageStyle.css';
import ImageSliderItem from './imageSliderItem';

import * as Icon from 'react-feather';

const Image = ({ pictures, curretStyle }) => {

  const [imageId, setImageId] = useState(0);
  const [currentStylePhotos, setCurrentStylePhotos] = useState([]);

  useEffect(() => {
    setCurrentStylePhotos(pictures ? pictures.photos : null);
  })

  const mainImageRight = async () => {
    if (imageId < pictures.photos.length - 1) {
      let temp = imageId;
      // console.log('turn right');
      setImageId(temp + 1);
    }
  }

  const mainImageLeft = async () => {

    if (imageId > 0) {
      let temp = imageId;
      setImageId(temp - 1);
    }
  }


  // scrolling image slider React example
  // https://codepen.io/rmody3/pen/EXObmR
  const scroll = (direction) => {
    let far = $('.image-container').width() / 2 * direction;
    let pos = $('.image-container').scrollLeft() + far;
    $('.image-container').animate({ scrollLeft: pos }, 1000)
  }

  const handleImageSliderClick = (id) => {
    setImageId(id);
  }


  return (
    <div className="images" style={imageStyle}>
      {/* <h3>Image</h3> */}

      <div className='main-image'>
        <div className='main-image-pic'>
          <a className="lightbox" href="#dog">
            {(() => {
              if (pictures) {
                return (
                  <img
                    src={pictures.photos[imageId].url}
                  >
                  </img>
                )
              }
            })()}
          </a>
        </div>
        <div className="lightbox-target" id="dog">
          <div className="lightbox-target-pic">
            <i className='ImageLeft' aria-hidden="true" onClick={mainImageLeft} >
              <Icon.ChevronLeft size='60px' />
            </i>
            <span className="lightbox-target-pic">{(() => {
              if (pictures) {
                return (
                  <img
                    src={pictures.photos[imageId].url}
                    width="400px">
                  </img>
                )
              }
            })()}</span>
            <i className='ImageRight' aria-hidden="true" onClick={mainImageRight}>
              <Icon.ChevronRight size='60px' />
            </i>
          </div>

          <a className="lightbox-close" href="#"></a>
        </div>


        <div className="Arrows">
          <i className='ImageLeft' aria-hidden="true" onClick={mainImageLeft} >
            <Icon.ChevronLeft size='60px' />
          </i>
          <i className='ImageRight' aria-hidden="true" onClick={mainImageRight}>
            <Icon.ChevronRight size='60px' />
          </i>
        </div>

      </div>

      <div className='image-slider'>
        <div className="wrapper">
          <a className="prev" onClick={() => { scroll(-1) }}>&#10094;</a>
          <div className="image-container">
            {pictures ? (pictures.photos.map((e, i) => {
              return (<ImageSliderItem
                key={`image-slider-${i}`}
                photoId={i}
                photo={e.thumbnail_url}
                handleImageSliderClick={handleImageSliderClick}
                imageId={imageId}
              />)
            }
            )) : null}
          </div>
          <a className="next" onClick={() => { scroll(1) }}>&#10095;</a>
        </div>

      </div>
    </div>
  )
}
export default Image;
