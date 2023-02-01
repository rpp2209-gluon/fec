import React, { useState, useEffect } from "react";

var addReviewFormModal = (props) => {


  var handleSubmit = () => {
    console.log('form was submitted to add review');
  }

  if (!props.showAddReview) {
    return (<></>)
  } else {
    return (
      <>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Review Form</h4>
          </div>
          <div className="modal-body">
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
          </div>

          <div className="modal-footer">
            <button onClick={props.updateShowAddReview} className="button">Close</button>
          </div>
        </div>
      </div>

      </>

    )

  }


};


export default addReviewFormModal;