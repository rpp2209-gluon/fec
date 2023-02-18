import React, { useState , useRef} from "react";
import Overview from "./Components/overview/overview.jsx";
import QuestionAnswer from "./Components/QuestionAnswer/QuestionAnswer.jsx";
import Ratings from "./Components/ratings.jsx";
import RelatedItems from "./Components/relateditems/relateditems.jsx";
import axios from 'axios';
import "./App.css";

const recordClickEvent = (event, module) => {

  console.log("here is the clickevent", event.target);
  console.log("here is the module", module);
  console.log("here is the time", Date.now());
  axios.post('/:id/interactions', {
      element: `${event.target}`,
      widget: module,
      time: `${Date.now()}`
  }).then((response) => {
    console.log('successfully posted click', response);
  }).catch((err) => {
    console.log('error posting click', err);
  })
};

function App () {

const ratingRef = useRef(null);


    return(
      <div className="App">
        <div className="overview-component"><Overview recordClickEvent={recordClickEvent} currentProductId={window.location.pathname.slice(1)} ratingRef={ratingRef}/> </div>
        {/* <div className="related-items-component"><RelatedItems recordClickEvent={recordClickEvent} currentProductId={window.location.pathname.slice(1)}/></div>
        <div className="question-answer-component"><QuestionAnswer recordClickEvent={recordClickEvent} currentProductId={window.location.pathname.slice(1)}/></div> */}
        <div className="rating-position" ref={ratingRef}></div>
        <div className="ratings-component"><Ratings recordClickEvent={recordClickEvent} currentProductId={window.location.pathname.slice(1)}/></div>
      </div>
    );

};

export default App;