import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";

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
      .then(() => {
        axios.get('/products/:product_id/related', {
          params: {
            id: String(id),
          }
        })
          .then((data) => {
            setRelated(data.data);
          })
      });
  }, []);








  return (<div>
    <h1>OverView Section</h1>
    <div>1. Product Information</div>
    <div>2. Style Selector </div>
    <div> 3. add to cart  </div>
    <div>4. imagine</div>

  </div>


  )
};

export default OverView;