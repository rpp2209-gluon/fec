
import React from 'react';
const { useState, useEffect } = React;
import ReactStars from "react-rating-stars-component";


const Information = (props) => {

  const rating = Number(props.rating);

  const nameStyle = {
    fontStyle: 'bold',
    fontSize: 46,
    // font-family: 'Monospace'
  };



  return (
    <div className="product-info" key='product'>
      {/* <h3> Product Information</h3> */}
      <p>{String(props.product.category).toUpperCase()}</p>
      <p className='product-name'
        style={nameStyle}>{props.product.name}
      </p>



    </div>
  )
}
export default Information;