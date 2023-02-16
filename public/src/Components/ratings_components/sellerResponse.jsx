import React, { useState, useEffect } from "react";

var SellerReponse = (props) => {
  console.log('this is the response', props.response);
  return (
    <>
    <p className="sellers-response"> Sellers Response: {props.response} </p>
    </>
  )
}

export default SellerReponse;