import React from 'react';
const { useState, useEffect } = React;

const StyleItem = ({ styleId, name, photo, handleStyleChange, currentStyle }) => {
  const [selected, setSelected] = useState(false);


  return (
    <div
      className="style-item"
      onClick={() => { handleStyleChange(styleId) }}
      
    >

      <img
        src={photo.thumbnail_url}
        width='50'
        height='50'
        style={currentStyle == styleId ? { border: 'yellow solid 4px' } : {}}
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