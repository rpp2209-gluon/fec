import React, { useState, useEffect } from "react";
import moment from "moment";

var ReviewTile = (props) => {

  const [showAllReview, setShowAllReview] = useState(false);


  const reviewClickHandler = () => {
    console.log('i was clicked');
    setShowAllReview(!showAllReview);
  }

  return (
    <>
      <h2>Review</h2>
      <p>Review ID: {props.reviewData.review_id}</p>
      <p>Review Date: {moment(props.reviewData.date).format('MMMM Do, YYYY')}</p>
      <p>Reviewer Name: {props.reviewData.reviewer_name}</p>
      <p>Rating: {props.reviewData.rating}</p>
      <p><b>{props.reviewData.summary}</b></p>
      <p>Review Body: {showAllReview ? props.reviewData.body.slice(0, 250) : props.reviewData.body}</p>
      { props.reviewData.body.length >= 250 ?
        <button onClick={reviewClickHandler}>{showAllReview ? 'Collapse' : 'Show More'}</button> : <></>
      }
      <p>Response: {props.reviewData.response}</p>
      <p>Review Helpfulness: {props.reviewData.response}</p>
      <p>{props.reviewData.recommend ? 'I recommend this product ✅' : ''}</p>
    </>
  )


};

export default ReviewTile;