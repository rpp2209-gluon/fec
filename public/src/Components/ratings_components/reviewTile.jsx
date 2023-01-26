import React from "react";

var ReviewTile = (props) => {

  // "review_id": 5,
  // "rating": 3,
  // "summary": "I'm enjoying wearing these shades",
  // "recommend": false,
  // "response": null,
  // "body": "Comfortable and practical.",
  // "date": "2019-04-14T00:00:00.000Z",
  // "reviewer_name": "shortandsweeet",
  // "helpfulness": 5,
  // "photos": [{
  //     "id": 1,
  //     "url": "urlplaceholder/review_5_photo_number_1.jpg"
  //   },
  //   {
  //     "id": 2,
  //     "url": "urlplaceholder/review_5_photo_number_2.jpg"
  //   },

  return (
    <>
      <h2>Review ID</h2>
      <p>{props.reviewData.review_id}</p>
      <h2>Rating</h2>
      <p>{props.reviewData.rating}</p>
      <h2>Summary</h2>
      <p>{props.reviewData.summary}</p>
      <h2>Response</h2>
      <p>{props.reviewData.response}</p>
    </>
  )


};

export default ReviewTile;