import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';

var characteristics = (props) => {

  var labels = ['Size', 'Width', 'Comfort', 'Quality', 'Length', 'Fit'];
  var ids = ['240595', '240596', '240597', '240598', '240599', '240600']
  var characteristics = [['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide' , 'Too wide'],
    ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']]

  const onChange = (event) => {
    var char = event.target.id.substring(5, 11);
    var selection = event.target.id.substring(12, 13);
    var charObj = {...props.characteristics};
    charObj[char] = parseInt(selection);
    props.updateCharacteristics(charObj);
  }


  return (
    <div>
    <Form.Group>
      {labels.map((label, i) => (
        <div key={`inline-${label}`} className="characteristics" onChange={onChange}>
          <b>{label}</b>
          <br></br>
          {characteristics[i].map((c, j) => (
            <Form.Check
              key={`char-${ids[i]}-${j}-${c}`}
              inline
              label={c}
              name={`char-${ids[i]}-${label}`}
              type="radio"
              id={`char-${ids[i]}-${j}-${c}`}
            />
          ))}
        </div>
      ))}
    </Form.Group>

    </div>
  )

};

export default characteristics;
