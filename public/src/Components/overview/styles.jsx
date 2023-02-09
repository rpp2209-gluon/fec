import React from 'react';
const { useState, useEffect } = React;

import StyleItem from './styleItem';

const Styles = ({ styles, currentStyle, currentStyleName, handleStyleChange }) => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   if (props) {
  //     setData(props);
  //   }
  //   console.log('STYLES', data.styles)
  // }, [props]);

  const [styleId, setStyleId] = useState(currentStyle);


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