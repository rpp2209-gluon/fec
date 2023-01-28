import React, { useState, useEffect } from "react";
import axios from "axios";

import Information from './information.jsx';
import Styles from './styles.jsx';
import Imagine from './imagine.jsx';

const OverView = (props) => {

  const [id, setId] = useState(71697);
  const [product, setProduct] = useState({});
  const [style, setStyle] = useState([]);
  const [related, setRelated] = useState([]);

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
            setStyle(data.data);
          })
      })
  }, []);




  return (<div>
    <h1>OverView Section</h1>

    <Information />
    <Styles />
    <Imagine />

    <div> 3. add to cart  </div>


  </div>


  )
};

export default OverView;