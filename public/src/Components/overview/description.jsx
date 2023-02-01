
import React from 'react';
const { useState, useEffect } = React;

const Description = ({ product }) => {

  return (
    <div className="product-info" key='product'>
      <h3>Description</h3>
      <div>Slogan: {product.slogan}</div>
      <div>{product.description}</div>
      <ul>
        {/* {(() => {
          if (product) {
            console.log('DES',product.features)
            return (
              <div></div>
            )
          }
        })()} */}
        {product.features ? product.features.map((e,i) => {
          console.log(e);
          return (<li key ={`feature-${i}`}>{e.value}</li>)
        }) : null}
      </ul>



    </div>
  )
}
export default Description;