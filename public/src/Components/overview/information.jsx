
import React from 'react';
const { useState, useEffect } = React;
import ReactStars from "react-rating-stars-component";

const Information = (props) => {

  const rating = Number(props.rating)

  const nameStyle = {
    fontStyle: 'bold',
    fontSize: 42,
    // font-family: 'Monospace'
  }

  return (
    <div className="product-info" key='product'>
      {/* <h3> Product Information</h3> */}
      <p>category: {props.product.category}</p>
      <p className='product-name'
        style={nameStyle}>{props.product.name}
      </p>
      <div className="overview-rating">
        rating: {rating}
        {/* https://stackoverflow.com/questions/73029594/react-not-able-to-render-react-rating-star-component-with-correct-value */}
        <ReactStars
          count={5}
          size={18}
          key={`stars_${rating}`}
          value={rating}
          edit={false}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        <p style={{ textDecorationLine: 'underline' }}>read all reviews</p>
      </div>



    </div>
  )
}
export default Information;