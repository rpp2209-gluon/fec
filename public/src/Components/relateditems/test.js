/**
 * @jest-environment jsdom
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";

import RelatedItems from "./relateditems.jsx";
import ProductCard from "./productcard.jsx";

test('renders correct Related Items content', () => {
  const root = document.createElement('div');
  ReactDOM.render(<RelatedItems />, root);

  const { getByText, getByLabelText } = getQueriesForElement(root);

  expect(getByText('Related Items Section')).not.toBeNull();
  expect(getByText('Product List')).not.toBeNull();
});

// test('renders correct Product Card content', () => {
//   const root = document.createElement('div');
//   const exData = {
//     id: 71703,
//     campus: 'hr-rpp',
//     name: 'Blues Suede Shoes',
//     slogan: '2019 Stanley Cup Limited Edition',
//     description: 'Touch down in the land of the Delta Blues in the middle of the pouring rain',
//     category: 'Dress Shoes',
//     default_price: '120.00',
//     created_at: '2022-05-11T19:38:15.373Z',
//     updated_at: '2022-05-11T19:38:15.373Z',
//     features: [
//       { feature: 'Sole', value: 'Rubber' },
//       { feature: 'Material', value: 'FullControlSkin' },
//       { feature: 'Stitching', value: 'Double Stitch' }
//     ]
//   }
//   ReactDOM.render(<ProductCard product={exData}/>, root);

//   const { getByText, getByLabelText } = getQueriesForElement(root);

//   expect(getByText('Product Card')).not.toBeNull();
// })