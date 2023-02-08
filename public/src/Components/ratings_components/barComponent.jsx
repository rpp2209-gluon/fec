import React, { useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

var barComponent = (props) => {

  return (
    <div>
    <ProgressBar now={props.num * 100}/>
    </div>
  )

};

export default barComponent;
