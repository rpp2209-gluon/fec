import React, { useState, useEffect } from "react";
import moment from "moment";
import SellerResponse from './sellerResponse.jsx';

var ReviewTile = (props) => {

  const [showAllReview, setShowAllReview] = useState(false);


  const reviewClickHandler = () => {
    console.log('i was clicked');
    setShowAllReview(!showAllReview);
  }

  return (
    <>
      <p>Star Rating: {props.reviewData.rating}</p>
      <p>{props.reviewData.reviewer_name} , {moment(props.reviewData.date).format('MMMM Do, YYYY')}</p>
      <p><b>{props.reviewData.summary}</b></p>
      <p>Review Body: {showAllReview ? props.reviewData.body.slice(0, 250) : props.reviewData.body}</p>
      { props.reviewData.body.length >= 250 ?
        <button onClick={reviewClickHandler}>{showAllReview ? 'Collapse' : 'Show More'}</button> : <></>
      }
      <p> {props.reviewData.response ? <SellerResponse response={props.reviewData.repsonse}/> : <></> }</p>
      <p>Was This Review Helpful? Yes ({props.reviewData.helpfulness})</p>
      <p>{props.reviewData.recommend ? 'I recommend this product ✅' : ''}</p>
      <b>================================================================</b>
    </>
  )


};

export default ReviewTile;