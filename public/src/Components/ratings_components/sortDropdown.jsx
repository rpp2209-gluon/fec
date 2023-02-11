import React, { useState, useEffect } from "react";

var sortDropdown = (props) => {


  return (
      <div className="m-3">
        <label className="mx-3">Choose file: </label>
        <input className="d-none" type="file" ref={fileInput} onChange={handleSubmit}/>
      </div>
  );
}

export default sortDropdown;