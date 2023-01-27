import React from "react";

function ProductCard (props) {
  console.log('product card props', props.product.data)
  return (
    <div>
          <h3>Product Card</h3>
    <div>
      Product Category - {props.product.data.category}
    </div>
    <div>
      Product Name - {props.product.data.name}
    </div>
    <div>
      Product Image
    </div>
    <div>
      Price - {props.product.data.default_price}
    </div>
    <div>
      Star Rating
    </div>
    <div>
      Action Button
    </div>
    </div>
  )
};

export default ProductCard;