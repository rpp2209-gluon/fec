import React, { useState, useEffect } from "react";
import ProductCard from "./productcard.jsx";
import YourOutfitList from "./youroutfitlist.jsx";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function RelatedItems (props) {
  const [relProd, setRelProd] = useState([]);
  const [currentProd, setCurrentProd] = useState([]);
  var list;

  if (window.localStorage.outfits === undefined) {
    list = list;
  } else {
    list = [JSON.parse(window.localStorage.outfits)];
  }

  useEffect (() => {
    axios({
      method: 'get',
      url: '/:id/relatedproducts',
      params: {currentId: props.currentProductId}
    })
    .then((data) => {
      setRelProd(data.data)
    })
    .catch(err => {
      console.log('related products useEffect error')
    })
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: '/:id/products/:product_id',
      params: {
        id: (Number(props.currentProductId))
      }
    })
    .then(data => {
      setCurrentProd(data.data)
    })
    .catch(err => {
      console.log('set current prod useEffect err')
    })
  }, [])

    //localStorage is JSON string
    function addtoOutfit (e) {
      if (list === undefined) {
        list = [currentProd]
        window.localStorage.setItem('outfits', JSON.stringify(list))
      }

    }

  return (
    <div>
      <h1>Related Items Section</h1>
    <div>
      <h2>Product List</h2>
      <Carousel showThumbs={false}>
      {relProd.map((entry) => {
        return (
            <div className="productcard" key={entry.id}>
              <ProductCard product={entry} currentProductId={props.currentProductId}/>
            </div>
        );
      })}
      </Carousel>
    </div>
    <div>
      <h2>Your Outfit</h2>
      <Carousel showThumbs={false}>
        <div>
          <button onClick={addtoOutfit}>Add to Outfit</button>
        </div>
        <YourOutfitList currentProductId={props.currentProductId} list={list}/>
      </Carousel>
    </div>
    </div>
  )
};

export default RelatedItems;