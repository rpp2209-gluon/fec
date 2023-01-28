import React, { useState, useEffect } from "react";

var addReviewForm = (props) => {


  var handleSubmit = () => {
    console.log('form was submitted to add review');
  }

  if (!props.showAddReview) {
    return (<></>)
  } else {
    return (
      <>
      <p> Review Form </p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" />
        </label>
        <label>
          Review:
          <input name="review" type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </>

    )

  }


};


export default addReviewForm;