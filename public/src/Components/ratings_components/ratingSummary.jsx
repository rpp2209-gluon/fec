import React, { useState, useEffect } from "react";


var ratingSummary = (props) => {

  var avgRating = props.reviews.reduce((total, review) => total + review.rating, 0) / props.reviews.length;
  var numRatings = props.reviews.length;
  var ratingMap = props.reviews.reduce((map, review) => {
    map[review.rating] += 1;
    return map;
  }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

  const updateFilter = (event) => {
    console.log('currfilter', props.filteredStars);
    var s = new Set(props.filteredStars);
    if (props.filteredStars.has(event.target.id)) {
      console.log('deleting', event.target.id);
      s.delete(event.target.id);
      props.updateFilteredStars(s);
    } else {
      console.log('adding', event.target.id);
      s.add(event.target.id);
      props.updateFilteredStars(s);
    }
  };

  const resetFilter = () => {
    props.updateFilteredStars(new Set());
  };

  console.log('this is the ratingMap', ratingMap);

  return (
    <>
      <h1>Rating Breakdown</h1>
      <div> { props.filteredStars.size > 0 ? 'Filtering for ' + [...props.filteredStars].join(' and ') + ' ratings' : 'No Filters' } </div>
      <div>Avg Star Rating: {avgRating}</div>
      <div>Number of Ratings: {numRatings}</div>

      <div>
        {[5, 4, 3, 2, 1].map((bar) => {
          return (<li key={bar} onClick={updateFilter} id={bar}>{bar} Stars has {ratingMap[bar]} ratings out of {numRatings}</li>)
        })}
      </div>
    </>

  )

}


export default ratingSummary;