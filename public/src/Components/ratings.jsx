import React, { useState, useEffect } from "react";
import ReviewTile from './ratings_components/reviewTile.jsx';
import AddReviewForm from './ratings_components/addReviewForm.jsx';
import axios from 'axios';


var Ratings = (props) => {

  const [reviews, setReviews] = useState({results: []});
  const [showAddReview, setShowAddReview] = useState(false);
  const [numReviews, setNumReviews] = useState(2);
  const propsReviewNum = 71697;

    useEffect(() => {
      axios.get('/reviews', {
        params: {
          id: propsReviewNum
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

    const updateNumReviews = () => {
      if (numReviews + 2 < reviews.results.length) {
        setNumReviews(numReviews + 2);
      } else {
        setNumReviews(reviews.results.length);
      }
    };

    return (
      <section>
        <h1>Ratings and Reviews</h1>

        {reviews.results.slice(0, numReviews).map((review) => {
          return (<ReviewTile key={review.review_id} reviewData={review}/>);
        })}

        { reviews.results.length > numReviews ?
        <button onClick={updateNumReviews}> Show More Reviews </button> :
        <></>
        }

        <button onClick={updateShowAddReview}> Add a Review + </button>
        <AddReviewForm showAddReview={showAddReview} updateShowAddReview={updateShowAddReview}/>
      </section>




    )

};

export default Ratings;