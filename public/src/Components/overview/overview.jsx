import React, { useState, useEffect } from "react";
import axios from "axios";

import Information from './information.jsx';
import Styles from './styles.jsx';
import Image from './image.jsx';
import Description from './description.jsx';

import './overviewStyle.css';

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
      <h1>OverView Section</h1>
      <Image
        pictures={styles[currentStyle]}
        currentStyle={currentStyle}
      />
      <Styles
        name={product.name}
        styles={styles}
        currentStyle={currentStyle}
        currentStyleName={currentStyleName}
        handleStyleChange={handleStyleChange}
      />
      <Information product={product} rating={rating} />
      <Description product={product} />

    </div>


  )
};

export default OverView;