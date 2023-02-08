import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement('#root');

function ProductCard (props) {
  const [isOpen, setIsOpen] = useState(false);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/mergedfeatures',
      params: {
        currentId: props.currentProduct.id,
        selectedId: props.product.id
      }
    })
    .then(data => {
      console.log('DATA', data);
      setFeatures(data.data);
    })
  }, [])

  function openModal () {
    setIsOpen(true);
  };

  function closeModal () {
    setIsOpen(false);
  };

  return (
    <div>
      <h3>Product Card</h3>
    <div>
      Product Category - {props.product.category}
    </div>
    <div>
      Product Name - {props.product.name}
    </div>
    <div>
      Product Image
    </div>
    <div>
      Price - {props.product.default_price}
    </div>
    <div>
      Star Rating

      <button onClick={openModal}>
        Action Button
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <h1>Comparing</h1>
        <table>
        <tr>
          <th>Current Product Name</th>
          <th>Characteristic</th>
          <th>Compared Product Name</th>
        </tr>
          {features.map((entry, i) => {
            if (typeof entry.value !== 'string') {
              return (
                <tr key={i}>
                  <td>{entry.value[0]}</td>
                  <td>{entry.feature}</td>
                  <td>{entry.value[1]}</td>
                </tr>
              )
            } else {
              return (
                <tr key={i}>
                  <td>{entry.value}</td>
                  <td>{entry.feature}</td>
                  <td></td>
                </tr>
              )
            }
          })}
        </table>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
    </div>
  )
};

export default ProductCard;