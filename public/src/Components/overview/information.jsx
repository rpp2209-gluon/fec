
import React from 'react';
const { useState, useEffect } = React;
import ReactStars from "react-rating-stars-component";

const Information = (props) => {

  const rating = Number(props.rating)

  return (
    <div className="product-info" key='product'>
      <h3> Product Information</h3>
      <div>category: {props.product.category}</div>
      <div className="overview-rating">
        rating: {rating}
        {/* https://stackoverflow.com/questions/73029594/react-not-able-to-render-react-rating-star-component-with-correct-value */}
        <ReactStars
          count={5}
          size={24}
          key={`stars_${rating}`}
          value={rating}
          edit={false}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        <span>read all reviews</span>
      </div>

      <div>name: {props.product.name}</div>
      <div>Price: ${props.product.default_price} </div>

    </div>
  )
}
export default Information;