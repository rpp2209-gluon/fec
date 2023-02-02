import React, { useState, useEffect } from "react";
import ProductCard from "./productcard.jsx";
import YourOutfitList from "./youroutfitlist.jsx";
import axios from "axios";

function RelatedItems (props) {
  const [relProd, setRelProd] = useState([]);
  const prodList = [];

  useEffect (() => {
    axios({
      method: 'get',
      url: `/products/${props.currentProduct.id}/related`,
      params: {
        product_id: props.currentProduct.id
      }
    })
    .then((data) => {
      console.log('data', data)
      for (var i = 0; i < data.data.length; i++) {
        axios({
          method: 'get',
          url: `/products/${data.data[i]}`,
          params: {
            product_id: data.data[i]
          }
        })
        .then((res) => {
          console.log('res', res.data);
          prodList.push(res.data);
          setRelProd([res.data])
          console.log('prodList', prodList);
        })
      }
    })
  }, [])

  useEffect(() => {
    setRelProd(prodList)
  }, [])

  return (
    <div>
      <h1>Related Items Section</h1>
    <div>
      <h2>Product List</h2>
      {relProd.map((entry) => {
        console.log('entry', entry)
        return (
            <div className="productcard" key={entry.id}>
              <ProductCard product={entry} currentProduct={props.currentProduct}/>
            </div>
        );
      })}
    </div>
    <div>
      <YourOutfitList currentProduct={props.currentProduct}/>
    </div>
    </div>
  )
};

export default RelatedItems;