import React, { useState } from "react";
import ProductCard from "./productcard.jsx";
import axios from "axios";

function YourOutfitList (props) {

  return (
    <div>
      <div>
        {props.list.map((entry) => {
          return (
            <div className="productcard" key={entry.id}>
              <ProductCard product={entry} currentProductId={props.currentProductId}/>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default YourOutfitList;