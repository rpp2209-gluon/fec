import React, { useState } from "react";
import Outfitcard from "./outfitcard.jsx";
import axios from "axios";

function YourOutfitList (props) {

  return (
    <div>
      <div>
        {props.list.map((entry) => {
          return (
            <div className="productcard" key={entry.id}>
              <Outfitcard product={entry} currentProduct={props.currentProduct}/>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default YourOutfitList;