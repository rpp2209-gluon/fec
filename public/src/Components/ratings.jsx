import React, { useState, useEffect } from "react";
import ReviewTile from './ratings_components/reviewTile.jsx';
import axios from 'axios';


var Ratings = () => {

  const [reviews, setReviews] = useState({results: []});

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


    return (
      <section>
        <h1>Ratings and Reviews</h1>

        {reviews.results.map((review) => {
          return (<ReviewTile reviewData={review}/>);
        })}
      </section>




    )

};

export default Ratings;