
import React from 'react';
const { useState, useEffect } = React;

const Description = ({ product }) => {

  return (
    <div className="product-description" key='product'>
      <div className="product-description-text">
        <p style={{ fontStyle: 'italic', fontSize: 18, 'font-weight': 'bold' }}>{product.slogan}</p>
        <p>{product.description}</p>
      </div>
      <ul className="product-description-features">
        {product.features ? product.features.map((e, i) => {
          return (
            <li key={`feature-${i}`} style ={{'font-weight': 'bold'}}>{`√ ${e.value}`}
            </li>
          )
        }) : null}
      </ul>

    </div>
  )
}
export default Description;