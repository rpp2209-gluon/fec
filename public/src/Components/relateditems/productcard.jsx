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

  console.log('here are the props for product card', props);
  useEffect(() => {
    axios({
      method: 'get',
      url: '/:id/products/:product_id/styles',
      params: {
        id: props.product[0].id
      }
    })
    .then(data => {
      setImage([data.data.results[0].photos[0].thumbnail_url]);
    })
  }, [])

  useEffect (() => {
    axios({
      method: 'get',
      url: '/:id/avgRating',
      params: {
        id: props.product[0].id
      }
    })
    .then(data => {
      setRating([data.data[0]]);
    })
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: '/:id/mergedfeatures',
      params: {
        currentId: props.currentProduct,
        selectedId: props.product[0].id
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
      Category - {props.product[0].category}
    </div>
    <div>
      Name - {props.product[0].name}
    </div>
    <div>
      Price - {props.product[0].default_price}
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