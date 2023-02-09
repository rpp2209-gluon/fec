import React, { useState, useEffect } from "react";

var photoUpload = (props) => {


  const fileInput = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Selected file - ${fileInput.current.files[0].name}`
    );
    props.updatePhotos(fileInput.current.files[0]);
  };

  const handleUpload = () => {
    console.log('this was clicked');

  };

  return (
      <div className="m-3">
        <label className="mx-3">Choose file: </label>
        <input className="d-none" type="file" ref={fileInput} onChange={handleSubmit}/>
      </div>
  );
}

export default photoUpload;