import React, { useState } from "react";
import YourOutfitCard from "./yourfitcard.jsx";
import axios from "axios";

function YourOutfitList (props) {
  if (props.list === undefined ) {
    return (
      <div>
        No Current Outfits Selected
      </div>
    )
  } else {
    return (
      <div>
        <div>
          {props.list[0].map((entry) => {
            return (
              <div className="productcard" key={entry.id}>
                <YourOutfitCard product={entry} currentProductId={props.currentProductId} list={props.list}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
};

export default YourOutfitList;