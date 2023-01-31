import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

function ProductCard (props) {
  console.log('product card props', props.product.data)

  const [isOpen, setIsOpen] = useState(false);

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
    </div>
    <div>
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
          {props.product.features.map((entry, i) => {
            return (
              <tr key={i}>
                <td></td>
                <td>{entry.feature}</td>
                <td>{entry.value}</td>
              </tr>
            )
          })}
        </table>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
    </div>
  )
};

export default ProductCard;