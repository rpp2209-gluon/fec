import React, { useState, useEffect } from "react";

var sortDropdown = (props) => {


  return (
    <>
        <label for="sorting"></label>
        <select className="btn" id="sorting">
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
        </select>
    </>

  );
}

export default sortDropdown;