import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';


var characteristicSummary = (props) => {

  console.log('these are the chars', props.characteristics);
  return (
    <>
    {Object.entries(props.characteristics).map(c => {
      return (
        <div key={c[1].id}>
        {c[0]}
          <div>
            <Form.Range disabled={true} value={c[1].value} min="1" max="5"></Form.Range>
          </div>
        </div>
        )
    })}
    </>

  )

};

export default characteristicSummary;
