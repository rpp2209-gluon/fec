import React, { useState, useEffect } from "react";


var ratingSummary = (props) => {


  return (
    <>
      <h1>Rating Breakdown</h1>
      <div>Avg Star Rating: {props.reviews.reduce((total, review) => total + review.rating, 0) / props.reviews.length}</div>
    </>

  )

}


export default ratingSummary;