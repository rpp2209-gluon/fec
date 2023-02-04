import React, { useState, useEffect } from "react";
import ReviewTile from './reviewTile.jsx';

var displayedReviews = (props) => {

  const [numReviews, setNumReviews] = useState(2);


  const updateNumReviews = () => {
    if (numReviews + 2 < props.reviews.results.length) {
      setNumReviews(numReviews + 2);
    } else {
      setNumReviews(props.reviews.results.length);
    }
  };


  return (
    <>
        {props.reviews.results.slice(0, numReviews).map((review) => {
          return (<ReviewTile key={review.review_id} reviewData={review}/>);
        })}

        { props.reviews.results.length > numReviews ?
        <button onClick={updateNumReviews}> Show More Reviews </button> :
        <></>
        }
    </>

  )

}

export default displayedReviews;