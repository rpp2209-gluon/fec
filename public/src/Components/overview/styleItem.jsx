import React from 'react';
const { useState, useEffect } = React;

const StyleItem = ({ styleId, name, photo, handleStyleChange, currentStyle }) => {
  const [selected, setSelected] = useState(false);


  return (
    <div
      className="style-item"
      onClick={() => { handleStyleChange(styleId) }}
      style={currentStyle == styleId ? { border: 'yellow solid 4px' } : {}}
    >
      <p>{name} {currentStyle == styleId ? 'true' : 'false'}</p>
      <img
        src={photo.thumbnail_url}
        width='100'
        height='161'
      >
      </img>

    </div >
  )
}
export default StyleItem;