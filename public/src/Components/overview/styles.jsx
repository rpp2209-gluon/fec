import React from 'react';
const { useState, useEffect } = React;

import StyleItem from './styleItem';

const Styles = ({ name, styles, currentStyle, currentStyleName, handleStyleChange }) => {

  const [styleId, setStyleId] = useState(currentStyle);
  const [sizes, setSizes] = useState(["SELECT SIZE","XS", "S", "M", "L", "XL"]);
  const [count, setCount] = useState(1);

  // const sizesArr = Object.keys(styles[styleId])
  // useEffect(() => {
  //   getSizes();
  // }, [])

  const getSizes = async () => {
    let obj = styles[styleId].skus;
    let getsizes = new Set();
    for (let sku in obj) {
      if (obj[sku].quantity > 0) { getsizes.add(obj[sku].size) }
    }
    // console.log([...sizes]);
    setSizes([...getsizes]);
  }


  return (
    <div className="styles-selector">
      {/* <h3> Style Selector </h3> */}

      <p className='product-price' style={{ fontWeight: 'bold', fontSize: 20 }}>
        Price:
        {(() => {
          if (styles[styleId]) {
            if (styles[styleId].sale_price === null) {
              return (<span>$ {styles[styleId].original_price}</span>)
            } else {
              return (
                <div>
                  <span style='color:red;text-decoration:line-through'>$ {styles[styleId].original_price} </span>
                  <span>$ {styles[styleId].sale_price}</span>
                </div>
              )
            }
          }
        })()}
      </p>

      <p></p>
      <p style={{ fontWeight: 'bold', fontSize: 18 }}>STYLE  {'>'} {currentStyleName}</p>
      <div className='styles-slider'>{styles.map((e, i) => {
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

      <form className='cart'>
        <div className='size-selector'>
          <select onClick={() => { getSizes() }}>
            {sizes.map((e, i) => {
              return (<option key={`size${i}`} value={e}>{e}</option>)
            })}
          </select>
        </div>

        <div className='quantity-selector'>
          <button onClick={() => setCount(count + 1)}> + </button>
          {count}
          <button onClick={() => {
            shoe.qty > 1 ? setCount(count - 1) : setCount(1);
          }}> - </button>
        </div>

        <input className ="cart-input" type="submit" value="ADD TO BAG" onClick={() => {
          alert(`${count} ${name} ${currentStyleName} added to Cart!`)
        }} />
      </form>


    </div>

  )
}
export default Styles;