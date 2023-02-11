import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

Modal.setAppElement('#root');

function Outfitcard (props) {
  const [isOpen, setIsOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const [rating, setRating] = useState([2.5]);
  const [image, setImage] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: '/:id/products/:product_id/styles',
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
      url: '/:id/avgRating',
      params: {
        id: props.product.id
      }
    })
    .then(data => {
      setRating([data.data[0]]);
    })
  }, [])

  function removeOutfit (e) {

  }

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
      <button onClick={removeOutfit}>
        Remove Outfit
      </button>
    </div>
    </div>
  )
};

export default Outfitcard;