import React, { useState, useEffect } from "react";
import ProductCard from "./productcard.jsx";
import YourOutfitList from "./youroutfitlist.jsx";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function RelatedItems (props) {
  const [relProd, setRelProd] = useState([]);
  var list;
  if (window.localStorage.outfits === undefined) {
    list = [];
  } else {
    list = [JSON.parse(window.localStorage.outfits)];
  }

  useEffect (() => {
    axios({
      method: 'get',
      url: '/relatedproducts',
      params: {id: props.currentProduct.id}
    })
    .then((data) => {
      setRelProd(data.data)
    })
    .catch(err => {
      console.log('useEffect error')
    })
  }, [])

    //localStorage is JSON string
    function addtoOutfit (e) {
      if (window.localStorage.outfits === undefined) {
        window.localStorage.setItem('outfits', `${JSON.stringify(props.currentProduct)}`);
      } else {
        if (list.includes(props.currentProduct)) {
          window.localStorage.setItem('outfits', `${JSON.stringify(list)}`);
        } else {
          list.push(props.currentProduct);
          window.localStorage.setItem('outfits', `${JSON.stringify(list)}`);
        }
      }
    }

  return (
    <div>
      <h1>Related Items Section</h1>
    <div>
      <h2>Product List</h2>
      <Carousel>
      {relProd.map((entry) => {
        return (
            <div className="productcard" key={entry.id}>
              <ProductCard product={entry} currentProduct={props.currentProduct}/>
            </div>
        );
      })}
      </Carousel>
    </div>
    <div>
      <h2>Your Outfit</h2>
      <Carousel>
        <div>
          <button onClick={addtoOutfit}>Add to Outfit</button>
        </div>
        <YourOutfitList currentProduct={props.currentProduct} list={list}/>
      </Carousel>
    </div>
    </div>
  )
};

export default RelatedItems;