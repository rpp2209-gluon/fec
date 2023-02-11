import React, { useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

var barComponent = (props) => {

  return (
    <>
    <ProgressBar now={props.num * 100}/>
    </>
  )

};

export default barComponent;
