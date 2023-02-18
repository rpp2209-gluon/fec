import React, { useState } from "react";
import YourOutfitCard from "./yourfitcard.jsx";
import axios from "axios";
import "./relateditems.css";

function YourOutfitList (props) {
  console.log('props.list', props.list)
  if (props.list[0] === undefined ) {
    return (
      <div>
        No Current Outfits Selected
      </div>
    )
  } else {
    return (
      <div>
        {props.list.map((entry) => {
          return (
            <div className="productcard" key={entry.id}>
              <YourOutfitCard product={entry} currentProductId={props.currentProductId} list={props.list}/>
            </div>
          )
        })}
      </div>
    )
  }
};

export default YourOutfitList;