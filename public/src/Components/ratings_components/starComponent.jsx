import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";

var starComponent = (props) => {
  console.log('this is starcomponent value', props.numStars);

  return (
    <div>
    <ReactStars isHalf={true} count={5} size={20} value={props.numStars} onChange={props.handleRatingChange} activeColor="#ffd700" edit={props.editable}/>
    </div>
  )

};

export default starComponent;


