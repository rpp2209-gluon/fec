import React, { useState, useEffect } from "react";
import ReviewTile from './reviewTile.jsx';

var displayedReviews = (props) => {

  const [numReviews, setNumReviews] = useState(2);


  const updateNumReviews = () => {
    if (numReviews + 2 < props.reviews.length) {
      setNumReviews(numReviews + 2);
    } else {
      setNumReviews(props.reviews.length);
    }
  };



  return (
    <>
      <h2>Reviews</h2>
        {props.reviews.slice(0, numReviews).map((review) => {
          return (<ReviewTile key={review.review_id} reviewData={review}/>);
        })}

        { props.reviews.length > numReviews ?
        <button onClick={updateNumReviews}> Show More Reviews </button> :
        <></>
        }
    </>

  )

}

export default displayedReviews;