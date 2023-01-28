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
  const [currentStyle,setCurrentStyle] = useState(0);

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
  }, []);




  return (<div>
    <h1>OverView Section</h1>

    <Information product = {product} />
    <Styles styles = {styles}/>
    <Imagine 
    pictures = {styles.results}
    />
    <Description  product = {product}/>

    <h3> 3. add to cart  </h3>


  </div>


  )
};

export default OverView;