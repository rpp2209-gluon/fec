import React from 'react';
const { useState, useEffect } = React;

import StyleItem from './styleItem';

const Styles = ({ styles, currentStyle, currentStyleName, handleStyleChange }) => {

  const [styleId, setStyleId] = useState(currentStyle);

  // const sizesArr = Object.keys(styles[styleId])

  return (
    <div className="styles-selector">
      <h3> Style Selector </h3>
      <div>STYLE  {'>'} {currentStyleName}</div>
      {styles.map((e, i) => {
        return (<StyleItem
          key={`style${i}`}
          styleId={i}
          name={e.name}
          photo={e.photos[0]}
          handleStyleChange={handleStyleChange}
          currentStyle={currentStyle}
        />)
      })}
    

    </div>

  )
}
export default Styles;