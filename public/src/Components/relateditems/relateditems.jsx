import React, { useState, useEffect } from "react";
import ProductCard from "./productcard.jsx";
import YourOutfitList from "./youroutfitlist.jsx";
import axios from "axios";

function RelatedItems (props) {
  const [relProd, setRelProd] = useState([]);

  useEffect (() => {
    axios({
      method: 'get',
      url: `/products/${props.currentProduct.id}/related`,
      params: {
        product_id: props.currentProduct.id
      }
    })
    .then((data) => {
      const prodList = [];
      for (var i = 0; i < data.data.length; i++) {
        axios({
          method: 'get',
          url: `/products/${data.data[i]}`,
          params: {
            id: data.data[i]
          }
        })
        .then((res) => {
          console.log('res', res.data);
          setRelProd([res])
          console.log('relProd', relProd);
        })
      }
    })
  }, [])

  return (
    <div>
      <h1>Related Items Section</h1>
    <div>
      <h2>Product List</h2>
      {relProd.map((entry) => {
        console.log('entry', entry)
        return (
            <div className="productcard" key={entry.data.id}>
              <ProductCard product={entry}/>
            </div>
        );
      })}
    </div>
    <div>
      <YourOutfitList />
    </div>
    </div>
  )
};

export default RelatedItems;