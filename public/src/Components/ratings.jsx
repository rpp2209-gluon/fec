import React, { useState, useEffect } from "react";
import ReviewTile from './ratings_components/reviewTile.jsx';
import AddReviewFormModal from './ratings_components/addReviewForm.jsx';
import DisplayedReviews from './ratings_components/displayedReviews.jsx';
import RatingSummary from './ratings_components/ratingSummary.jsx';
import Modal from 'react-modal';
import axios from 'axios';

import ratings from './ratings_components/ratings.css';


Modal.setAppElement('#root');


var Ratings = (props) => {

  const [reviews, setReviews] = useState({results: []});
  const [allReviews, setAllReviews] = useState({results: []});
  const [showAddReview, setShowAddReview] = useState(false);

  const [filteredStars, setFilteredStars] = useState(new Set());

  const productName = "Static Name";

    useEffect(() => {
      axios.get('/:id/reviews', {
        params: {
          id: props.currentProductId
        }
      }).then((response) => {
        console.log('setting state with review info ', response.data);
        setReviews(response.data);
        setAllReviews(response.data);
      }).catch((err) => {
        console.log('error getting review info');
      });
    }, []);

    const updateShowAddReview = () => {
      console.log('setting review')
      setShowAddReview(!showAddReview);
    };

    const updateReviews = (filteredReviews) => {
      setReviews(filteredReviews);
    };

    const updateFilteredStars = (stars) => {
      setFilteredStars(stars);
    };



    return (
      <section id="review-main">
        <h1>Ratings and Reviews</h1>
        <div className="container">
          <div className="item item-left">
            <RatingSummary updateReviews={updateReviews} updateFilteredStars={updateFilteredStars} reviews={allReviews.results} filteredStars={filteredStars}/>
          </div>

          <div className="item item-right">
            <DisplayedReviews reviews={filteredStars.size === 0 ? allReviews.results : reviews.results.filter(review => filteredStars.has(review.rating.toString()))}/>
            <button onClick={updateShowAddReview}> Add a Review + </button>
          </div>
        </div>


        <Modal isOpen={showAddReview} onRequestClose={updateShowAddReview}>
          <AddReviewFormModal productId={props.currentProductId} productName={name} showAddReview={showAddReview} updateShowAddReview={updateShowAddReview}/>
        </Modal>
      </section>




    )

};

export default Ratings;