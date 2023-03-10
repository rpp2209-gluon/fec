import React, { useState, useEffect } from "react";
import moment from "moment";
import Card from 'react-bootstrap/Card';
import SellerResponse from './sellerResponse.jsx';
import StarComponent from './starComponent.jsx';
import axios from 'axios';

var ReviewTile = (props) => {

  const [showAllReview, setShowAllReview] = useState(false);


  const reviewClickHandler = () => {
    console.log('i was clicked');
    setShowAllReview(!showAllReview);
  };

  const clickHelpful = () => {
    event.preventDefault();
    console.log('helpful');
    console.log(props.reviewData.review_id);
    axios.put('/:id/reviews/' + props.reviewData.review_id + '/helpful')
    .then((response) => {
      console.log('PUT helpful success', response);
    })
    .catch((err) => {
      console.log('PUT helpful error', err);
    })
  };

  const clickReport = () => {
    event.preventDefault();
    console.log('report');
    axios.put('/:id/reviews/' + props.reviewData.review_id + '/report')
    .then((response) => {
      console.log('PUT report success', response);
    })
    .catch((err) => {
      console.log('PUT report error', err);
    })
  };

  const onClickThumbnail = (event) => {
    props.updateDisplayPhoto({'id': event.target.key, 'url': event.target.src});
  };

  return (
    <>
      <Card style={{  width: '70rem' }}>
        <Card.Body>
          <Card.Subtitle><small>{props.reviewData.reviewer_name} , {moment(props.reviewData.date).format('MMMM Do, YYYY')}</small></Card.Subtitle>
          <StarComponent editable={false} numStars={props.reviewData.rating}/>
          <p>{props.reviewData.recommend ? 'I recommend this product ✅' : ''}</p>
          <p><b>{props.reviewData.summary}</b></p>
          <p>{showAllReview ? props.reviewData.body.slice(0, 250) : props.reviewData.body}</p>
          { props.reviewData.body.length >= 250 ?
            <button onClick={reviewClickHandler}>{showAllReview ? 'Collapse' : 'Show More'}</button> : <></>
          }
          <div> {props.reviewData.response ? <SellerResponse response={props.reviewData.response}/> : <></> }</div>
          <div>
            {props.reviewData.photos.map(photo => {
              return <img onClick={onClickThumbnail} key={photo.id} src={photo.url} style={{ width: "25%", height: "25%" }} ></img>
            })}
          </div>
          <div>Was This Review Helpful? <a href="" onClick={clickHelpful}>Yes</a> ({props.reviewData.helpfulness}) | <a href="" onClick={clickReport}>Report</a> </div>

        </Card.Body>
      </Card>
    </>
  )


};

export default ReviewTile;