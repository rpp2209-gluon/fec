
import React from 'react';
const { useState, useEffect } = React;

const Information = ({ product }) => {

  return (
    <div className="product-info" key='product'>
      <h3>1. Product Information</h3>
      product.name: {product.name}

    </div>
  )
}
export default Information;