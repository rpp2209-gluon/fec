
import React from 'react';
const { useState, useEffect } = React;

const Information = (props) => {

  return (
    <div className="product-info" key='product'>
      <h3>1. Product Information</h3>
      <div>product name: {props.product.name}</div>
      <div>product rating: {props.rating}</div>


    </div>
  )
}
export default Information;