import React, { useState, useEffect } from "react";
import ReviewTile from './ratings_components/reviewTile.jsx';
var Ratings = () => {

  const [reviews, setReviews] = useState([]);

  var productReviews = {
    "product": "2",
    "page": 0,
    "count": 5,
    "results": [
      {
        "review_id": 5,
        "rating": 3,
        "summary": "I'm enjoying wearing these shades",
        "recommend": false,
        "response": null,
        "body": "Comfortable and practical.",
        "date": "2019-04-14T00:00:00.000Z",
        "reviewer_name": "shortandsweeet",
        "helpfulness": 5,
        "photos": [{
            "id": 1,
            "url": "urlplaceholder/review_5_photo_number_1.jpg"
          },
          {
            "id": 2,
            "url": "urlplaceholder/review_5_photo_number_2.jpg"
          },
        ]
      },
      {
        "review_id": 3,
        "rating": 4,
        "summary": "I am liking these glasses",
        "recommend": false,
        "response": "Glad you're enjoying the product!",
        "body": "They are very dark. But that's good because I'm in very sunny spots",
        "date": "2019-06-23T00:00:00.000Z",
        "reviewer_name": "bigbrotherbenjamin",
        "helpfulness": 5,
        "photos": [],
      }
    ]};

    useEffect(() => {
      setReviews(productReviews);
    }, []);


    return (
      <section>
        <h1>Ratings and Reviews</h1>
        {productReviews.results.map((review) => {
          return (<ReviewTile reviewData={review}/>);
        })}
      </section>




    )

};

export default Ratings;