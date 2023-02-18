import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";

import Information from './information.jsx';
import Styles from './styles.jsx';
import Image from './image.jsx';
import Description from './description.jsx';

import './overviewStyle.css';
import ReactStars from "react-rating-stars-component";

const OverView = (props) => {

  const [id, setId] = useState(window.location.pathname.slice(1));
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [rating, setRating] = useState(0);

  const [currentStyle, setCurrentStyle] = useState(0);
  const [currentStyleName, setCurrentStyleName] = useState('');



  useEffect(() => {
    console.log('id:, ', id);
    axios.get('/:id/products/:product_id', {
      params: {
        id: String(id),
      }
    })
      .then((data) => {
        setProduct(data.data);
      })
      .then(() => {
        axios.get('/:id/products/:product_id/styles', {
          params: {
            id: String(id),
          }
        })
          .then((data) => {
            setStyles(data.data.results);
            setCurrentStyleName(data.data.results[0].name);
          })
      })
      .then(() => {
        axios.get('/:id/reviews/meta', {
          params: {
            id: String(id),
          }
        })
          .then((data) => {
            // get average rating
            let ratingObj = data.data.ratings;
            let objKeys = Object.keys(ratingObj)
            let total = 0;
            let count = 0;
            for (let i = 0; i < objKeys.length; i++) {
              total += Number(objKeys[i]) * Number(ratingObj[objKeys[i]])
              count += Number(ratingObj[objKeys[i]])
            }
            setRating((total / count).toFixed(1));
          })
      })

  }, [])

  const handleStyleChange = (number) => {
    setCurrentStyle(number);
    setCurrentStyleName(styles[number].name)
    console.log('handleStyleChange', number)
  }



  return (
    <div className='overview'>
      {/* <h1>OverView Section</h1> */}

      <div className="overview-container">

        <div className='overview-left' >
          <Image
            pictures={styles[currentStyle]}
            currentStyle={currentStyle}
          />
        </div>
        <div className='overview-right' >
          <div className="overview-rating" >
            <span>
              <ReactStars
                count={5}
                size={16}
                key={`stars_${rating}`}
                value={rating}
                edit={false}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="black"
              />
            </span>

            <p style={{ textDecorationLine: 'underline', fontSize: 14 }}
              onClick={() => {
                props.ratingRef.current.scrollIntoView();
              }}>
              read all reviews</p>
          </div>

          <Information product={product} rating={rating} />
          <Styles
            name={product.name}
            styles={styles}
            currentStyle={currentStyle}
            currentStyleName={currentStyleName}
            handleStyleChange={handleStyleChange}
          />
        </div>
      </div>
      <Description product={product} />

    </div>


  )
};

export default OverView;