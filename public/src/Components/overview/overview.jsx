import React, { useState, useEffect } from "react";
import axios from "axios";

import Information from './information.jsx';
import Styles from './styles.jsx';
import Imagine from './imagine.jsx';
import Description from './description.jsx';

const OverView = (props) => {

  const [id, setId] = useState(71697);
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [rating, setRating] = useState(0);

  const [currentStyle, setCurrentStyle] = useState(0);

  useEffect(() => {
    console.log('id:, ', id);
    axios.get('/products/:product_id', {
      params: {
        id: String(id),
      }
    })
      .then((data) => {
        setProduct(data.data);
      })
      .then(() => {
        axios.get('/products/:product_id/styles', {
          params: {
            id: String(id),
          }
        })
          .then((data) => {
            setStyles(data.data);
          })
      })
      .then(() => {
        axios.get('/reviews/meta', {
          params: {
            id: String(id),
          }
        })
          .then((data) => {
            console.log('RATING DATA', data.data)
            let ratingObj = data.data.ratings;
            let objKeys = Object.keys(ratingObj)
            let total = 0;
            let count = 0;
            for (let i = 0; i < objKeys.length; i++) {
              console.log(i);
              total += Number(objKeys[i]) * Number(ratingObj[objKeys[i]])
              count += Number(ratingObj[objKeys[i]])
            }
            setRating((total/count).toFixed(1));
          })
      })
  }, []);




  return (<div>
    <h1>OverView Section</h1>

    <Information product={product} rating = {rating}/>
    <Styles styles={styles} />
    <Imagine
      pictures={styles.results}
    />
    <Description product={product} />



  </div>


  )
};

export default OverView;