import React, { useState, useEffect } from "react";
import ReviewTile from './ratings_components/reviewTile.jsx';
import AddReviewFormModal from './ratings_components/addReviewForm.jsx';
import DisplayedReviews from './ratings_components/displayedReviews.jsx';
import RatingSummary from './ratings_components/ratingSummary.jsx';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');


var Ratings = (props) => {

  const [reviews, setReviews] = useState({results: []});
  const [allReviews, setAllReviews] = useState({results: []});
  const [showAddReview, setShowAddReview] = useState(false);

  const propsReviewNum = 71697;
  const productName = "Static Name";

    useEffect(() => {
      axios.get('/reviews', {
        params: {
          id: propsReviewNum
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
    }



    return (
      <section>
        <h1>Ratings and Reviews</h1>

        <RatingSummary updateReviews={updateReviews} reviews={reviews.results}/>

        <DisplayedReviews reviews={reviews.results}/>

        <button onClick={updateShowAddReview}> Add a Review + </button>
        <Modal isOpen={showAddReview} onRequestClose={updateShowAddReview}>
          <AddReviewFormModal productId={propsReviewNum} productName={name} showAddReview={showAddReview} updateShowAddReview={updateShowAddReview}/>
        </Modal>
      </section>




    )

};

export default Ratings;