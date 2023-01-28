
import React from 'react';
const { useState, useEffect } = React;

const Description = ({ product }) => {

  return (
    <div className="product-info" key='product'>
      <h3>Description</h3>
      {product.description}
    </div>
  )
}
export default Description;