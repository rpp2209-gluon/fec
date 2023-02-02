import React, { useState } from "react";
import ProductCard from "./productcard.jsx";

function YourOutfitList (props) {
  //localStorage is JSON string
  function addtoOutfit (e) {
    if (window.localStoarge.outifts === undefined) {
      window.localStoarge.setItem('outfits', props.currentProduct);
    }

    console.log(props.currentProduct, window.localStorage)
  }

  return (
    <div>
      <h2>Your Outfit</h2>
      <div>
        <button onClick={addtoOutfit}>Add to Outfit</button>
      </div>
    </div>
  )
};

export default YourOutfitList;