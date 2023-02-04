import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

var addReviewFormModal = (props) => {

  const [reviewCharacterMin, reviewCharacterMax] = [50, 1000];
  const [reviewBody, setReviewBody] = useState("");

  const handleChange = (event) => {
    setReviewBody(event.target.value);
  };

  var handleSubmit = (event) => {
    console.log('form was submitted to add review');
    console.log(event);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    event.preventDefault();
  }

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
                  <Form.Control name="rating" as="textarea"  rows={1}/>
                </Form.Group>

                <Form.Group className="recommend" controlId="addReviewForm.recommend">
                  <Form.Label>Do you recommend this product?*</Form.Label>
                  <Form.Control name="recommend" as="textarea"  rows={1}/>
                </Form.Group>

                <Form.Group className="characteristics" controlId="addReviewForm.characteristics">
                  <Form.Label>Characteristics*</Form.Label>
                  <Form.Control name="characteristics" as="textarea"  rows={1}/>
                </Form.Group>

                <Form.Group className="reviewSummary" controlId="addReviewForm.summary">
                  <Form.Label>Review Summary</Form.Label>
                  <Form.Control name="body" as="textarea"  rows={3} value={reviewBody} onChange={handleChange} isInvalid={(reviewBody.length > reviewCharacterMax)} />
                </Form.Group>

                <Form.Group className="reviewBody" controlId="addReviewForm.body">
                  <Form.Label>Review Body*</Form.Label>
                  <Form.Control name="body" as="textarea"  rows={3} value={reviewBody} onChange={handleChange} isInvalid={(reviewBody.length > reviewCharacterMax)} />
                  <Badge className='mt-3' bg={`${(reviewBody.length > reviewCharacterMax || reviewBody.length < reviewCharacterMin) ? 'danger' : 'primary'}`}>{reviewBody.length}/{reviewCharacterMax}</Badge>
                </Form.Group>

                <Form.Group className="photos" controlId="addReviewForm.photos">
                  <Form.Label>Upload your photos</Form.Label>
                  <Form.Control name="body" as="textarea"  rows={3} value={reviewBody} onChange={handleChange} isInvalid={(reviewBody.length > reviewCharacterMax)} />
                </Form.Group>

                <Form.Group className="nickname" controlId="addReviewForm.nickname">
                  <Form.Label>What is your nickname*</Form.Label>
                  <Form.Control name="body" as="textarea"  rows={3} value={reviewBody} onChange={handleChange} isInvalid={(reviewBody.length > reviewCharacterMax)} />
                </Form.Group>

                <Form.Group className="email" controlId="addReviewForm.email">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control name="email" as="textarea"  rows={1}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>

      </div>

      </>

    )

  }


};


export default addReviewFormModal;