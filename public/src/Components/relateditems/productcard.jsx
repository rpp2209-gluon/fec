import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

Modal.setAppElement('#root');

function ProductCard (props) {
  const [isOpen, setIsOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const [rating, setRating] = useState([2.5]);
  const [image, setImage] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: '/products/:product_id/styles',
      params: {
        id: props.product.id
      }
    })
    .then(data => {
      setImage([data.data.results[0].photos[0].thumbnail_url]);
    })
  }, [])

  useEffect (() => {
    axios({
      method: 'get',
      url: '/avgRating',
      params: {
        id: props.product.id
      }
    })
    .then(data => {
      setRating([data.data[0]]);
    })
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: '/mergedfeatures',
      params: {
        currentId: props.currentProduct.id,
        selectedId: props.product.id
      }
    })
    .then(data => {
      setFeatures(data.data);
    })
  }, []);

  function openModal () {
    setIsOpen(true);
  };

  function closeModal () {
    setIsOpen(false);
  };

  return (
    <div>
      <img src={image[0]} height='400'/>
    <div>
      Category - {props.product.category}
    </div>
    <div>
      Name - {props.product.name}
    </div>
    <div>
      Price - {props.product.default_price}
    </div>
    <div>
      <ReactStars
        count={5}
        value={rating[0]}
        isHalf={true}
        edit={false}
        size={24}
        activeColor="#ffd700"
      />
      <button onClick={openModal}>
        Action Button
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <h1>Comparing</h1>
        <table>
        <tr>
          <th>Current Product Name</th>
          <th>Characteristic</th>
          <th>Compared Product Name</th>
        </tr>
          {features.map((entry, i) => {
            if (typeof entry.value !== 'string') {
              return (
                <tr key={i}>
                  <td>{entry.value[0]}</td>
                  <td>{entry.feature}</td>
                  <td>{entry.value[1]}</td>
                </tr>
              )
            } else {
              return (
                <tr key={i}>
                  <td>{entry.value}</td>
                  <td>{entry.feature}</td>
                  <td></td>
                </tr>
              )
            }
          })}
        </table>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
    </div>
  )
};

export default ProductCard;