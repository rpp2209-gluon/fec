import React from 'react';
const { useState, useEffect } = React;

const StyleItem = ({ styleId, name, photo, handleStyleChange, currentStyle }) => {
  const [selected, setSelected] = useState(false);


  return (
    <div
      className="style-item"
      onClick={() => { handleStyleChange(styleId) }}
      style={{
        'border-radius': '6px',
        border: '0.5px solid grey',
      }}
      
    >
      <img
        src={photo.thumbnail_url}
        width='50'
        height='50'
        style={currentStyle == styleId ? { border: 'green solid 3px' } : {}}
      >
      </img>
      <p style={{
        fontStyle: 'light',
        fontSize: 12
      }}>{name} </p>

    </div >
  )
}
export default StyleItem;