import React, { useState, useEffect } from "react";
import ReviewTile from './ratings_components/reviewTile.jsx';
import AddReviewForm from './ratings_components/addReviewForm.jsx';
import axios from 'axios';


var Ratings = () => {

  const [reviews, setReviews] = useState({results: []});
  const [showAddReview, setShowAddReview] = useState(false);

    useEffect(() => {
      axios.get('/reviews/71698', {
        params: {
          id: 71697
        }
      }).then((response) => {
        console.log('setting state with review info ', response.data);
        setReviews(response.data);
      }).catch((err) => {
        console.log('error getting review info');
      });
    }, []);

    const updateShowAddReview = () => {
      console.log('setting review')
      setShowAddReview(!showAddReview);
    }

    return (
      <section>
        <h1>Ratings and Reviews</h1>

        {reviews.results.map((review) => {
          return (<ReviewTile reviewData={review}/>);
        })}

        <button onClick={updateShowAddReview}> Add a Review + </button>
        <AddReviewForm showAddReview={showAddReview} updateShowAddReview={updateShowAddReview}/>
      </section>




    )

};

export default Ratings;