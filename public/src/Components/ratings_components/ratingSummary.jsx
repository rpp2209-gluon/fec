import React, { useState, useEffect } from "react";


var ratingSummary = (props) => {

  const [filteredStars, setFilteredStars] = useState([]);

  var avgRating = props.reviews.reduce((total, review) => total + review.rating, 0) / props.reviews.length;
  var numRatings = props.reviews.length;
  var ratingMap = props.reviews.reduce((map, review) => {
    map[review.rating] += 1;
    return map;
  }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

  const addFilter = (starNum) => {
    setFilteredStars([...filteredStars, starNum]);
  };

  const resetFilter = () => {
    setFilteredStars([]);
  };

  console.log('this is the ratingMap', ratingMap);

  return (
    <>
      <h1>Rating Breakdown</h1>
      <div>Avg Star Rating: {avgRating}</div>
      <div>Number of Ratings: {numRatings}</div>

      <div>
        {[5, 4, 3, 2, 1].map((bar) => {
          return (<li key={bar}>{bar} Stars has {ratingMap[bar]} ratings out of {numRatings}</li>)
        })}
      </div>
    </>

  )

}


export default ratingSummary;