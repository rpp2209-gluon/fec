import React from 'react';
const { useState, useEffect } = React;

const Styles = ({styles, currentStyle, currentStyleName}) => {
  const [data, setData] = useState([]);

  
  // useEffect(() => {
  //   if (props) {
  //     setData(props);
  //   }
  //   console.log('STYLES', data.styles)
  // }, [props]);



  return (
    <div className="styles-selector">
      <h3> Style Selector </h3>
      <div>STYLE  {'>'} {currentStyleName}</div>


    </div>

  )
}
export default Styles;