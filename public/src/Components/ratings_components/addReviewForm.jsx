import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import StarComponent from './starComponent.jsx';
import Characteristics from './characteristics.jsx';
import PhotoUpload from './photoUpload.jsx';
import axios from 'axios';

var addReviewFormModal = (props) => {

  const [reviewCharacterMin, reviewCharacterMax, emailMax, nicknameMax, summaryMax, photoMax] = [50, 1000, 60, 60, 60, 5];
  const [reviewBody, setReviewBody] = useState("Why did you like the product or not?”");
  const [nickname, setNickname] = useState("Example: jackson11!");
  const [email, setEmail] = useState("Example: jackson11@email.com");
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("test_user");
  const [summary, setSummary] = useState("Example: Best purchase ever!");
  const [characteristics, setCharacteristics] = useState({});
  const [recommend, setRecommend] = useState(true);
  const [photos, setPhotos] = useState();

  const handleChangeBody = (event) => {
    setReviewBody(event.target.value);
  };

  const handleChangeNickname = (event) => {
    setNickname(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeSummary = (event) => {
    setSummary(event.target.value);
  };

  const handleRatingChange = (num) => {
    console.log(num);
    setRating(num);
  }

  const updatePhotos = (photos) => {
    setPhotos(photos);
  }

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const updateCharacteristics = (obj) => {
    setCharacteristics(obj);
  };

  const handleRecommendChange = (event) => {
    console.log(event.target.id);
    if (event.target.id === "rec-yes") {
      setRecommend(true);
    } else if (event.target.id === "rec-no") {
      setRecommend(false);
    }
  };

  var handleSubmit = (event) => {
    event.preventDefault();
    console.log('form was submitted to add review');
    console.log(event);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const submitObj = {
      product_id: props.productId,
      rating: 4,
      summary: summary,
      body: reviewBody,
      recommend: recommend,
      name: username,
      email: email,
      photos: [],
      characteristics: characteristics,
    };
    axios.post('/reviews', submitObj)
    .then((response) => {
      console.log('POST review success: ', response);
    })
    .catch((err) => {
      console.log('POST reviews errored: ');
      console.log(err);
    })
    console.log(submitObj);

  };

  if (!props.showAddReview) {
    return (<></>)
  } else {
    return (
      <>
      <div className="modal">

          <div className="modal-footer">
            <button onClick={props.updateShowAddReview} className="button">Close</button>
          </div>

          <h1>Write Your Review</h1>
          <h2>About the {props.productName} </h2>

          <Form onSubmit={handleSubmit}>
              <Form.Group className="name" controlId="addReviewForm.name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="username" as="textarea"  rows={1}/>
                </Form.Group>

                <Form.Group className="rating" controlId="addReviewForm.rating">
                  <Form.Label>Rating*</Form.Label>
                  <StarComponent numStars={0} editable={true} handleRatingChange={handleRatingChange}/>
                </Form.Group>

                <Form.Group className="recommend" controlId="addReviewForm.recommend" onChange={handleRecommendChange}>
                  <Form.Label>Do you recommend this product?*</Form.Label>
                  <Form.Check inline type="radio" label="Yes" name="recommend" id="rec-yes"/>
                  <Form.Check inline type="radio" label="No" name="recommend" id="rec-no"/>
                </Form.Group>

                <Form.Group className="characteristics" controlId="addReviewForm.characteristics">
                  <Form.Label>Characteristics*</Form.Label>
                  <Characteristics updateCharacteristics={updateCharacteristics} characteristics={characteristics}/>
                </Form.Group>

                <Form.Group className="reviewSummary" controlId="addReviewForm.summary">
                  <Form.Label>Review Summary</Form.Label>
                  <Form.Control name="body" as="textarea" rows={2} value={summary} onChange={handleChangeSummary} isInvalid={(summary.length > summaryMax)} />
                </Form.Group>

                <Form.Group className="reviewBody" controlId="addReviewForm.body">
                  <Form.Label>Review Body*</Form.Label>
                  <Form.Control name="body" as="textarea" rows={5} value={reviewBody} onChange={handleChangeBody} isInvalid={(reviewBody.length > reviewCharacterMax)} />
                  <Badge className='mt-3' bg={`${(reviewBody.length > reviewCharacterMax || reviewBody.length < reviewCharacterMin) ? 'danger' : 'primary'}`}>{reviewBody.length}/{reviewCharacterMax}</Badge>
                </Form.Group>

                <Form.Group className="photos" controlId="addReviewForm.photos">
                  <Form.Label>Upload your photos</Form.Label>
                </Form.Group>

                <Form.Group className="nickname" controlId="addReviewForm.nickname">
                  <Form.Label>What is your nickname*</Form.Label>
                  <Form.Control name="nickname" as="textarea" rows={1} value={nickname} onChange={handleChangeNickname} isInvalid={(email.length > emailMax)}/>
                  <div className="info-text">For privacy reasons, do not use your full name or email address</div>
                </Form.Group>

                <Form.Group className="email" controlId="addReviewForm.email">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control name="email" as="textarea" rows={1} value={email} onChange={handleChangeEmail} isInvalid={(email.length > emailMax)}/>
                  <div className="info-text">For authentication reasons, you will not be emailed</div>
                </Form.Group>

                <Form.Group className="photo" controlId="addReviewForm.photo">
                  <Form.Label>Photo Upload</Form.Label>
                  <PhotoUpload photos={photos} updatePhotos={updatePhotos}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
            </Form>



      </div>

      </>

    )

  }


};


export default addReviewFormModal;