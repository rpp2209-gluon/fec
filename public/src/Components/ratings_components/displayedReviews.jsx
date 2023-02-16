import React, { useState, useEffect } from "react";
import ReviewTile from './reviewTile.jsx';
import SortDropdown from './sortDropdown.jsx';
import Modal from 'react-modal';


var displayedReviews = (props) => {

  const [numReviews, setNumReviews] = useState(2);
  const [photoModalOpen, setphotoModalOpen] = useState(false);
  const [displayPhoto, setDisplayPhoto] = useState({'id': null, 'url': null});



  const updateNumReviews = () => {
    if (numReviews + 2 < props.reviews.length) {
      setNumReviews(numReviews + 2);
    } else {
      setNumReviews(props.reviews.length);
    }
  };

  const updatePhotoModalOpen = (bool) => {
    setphotoModalOpen(bool);
  };


  const updateDisplayPhoto = (p) => {
    updatePhotoModalOpen(true);
    setDisplayPhoto(p);
  };


  return (
    <>
      <h3>{props.totalNum} Reviews, sorted by <SortDropdown/> </h3>
      <div className="review-list">
        {props.reviews.slice(0, numReviews).map((review) => {
            return (<ReviewTile key={review.review_id} reviewData={review} updateDisplayPhoto={updateDisplayPhoto}/>);
          })}
      </div>


        { props.reviews.length > numReviews ?
        <button className="btn" onClick={updateNumReviews}> Show More Reviews </button> :
        <></>
        }

        <Modal isOpen={photoModalOpen} onRequestClose={() => {updatePhotoModalOpen(false)}}>
          <img key={displayPhoto.id} src={displayPhoto.url} style={{ width: "100%", height: "100%" }} ></img>
        </Modal>
    </>

  )

}

export default displayedReviews;