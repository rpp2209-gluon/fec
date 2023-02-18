
import React from 'react';
const { useState, useEffect } = React;

const Description = ({ product }) => {

  return (
    <div className="product-description" key='product'>
      <p style={{fontStyle: 'italic', fontSize: 18}}>{product.slogan}</p>
      <p>{product.description}</p>
      <ul className="product-description-features">
        {product.features ? product.features.map((e,i) => {
          return (<li key ={`feature-${i}`}>{e.value}</li>)
        }) : null}
      </ul>

    </div>
  )
}
export default Description;