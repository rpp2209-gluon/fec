/**
 * @jest-environment jsdom
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";

import RelatedItems from "./relateditems.jsx";

test('renders correct content', () => {
  const root = document.createElement('div');
  ReactDOM.render(<RelatedItems />, root);

  const { getByText, getByLabelText } = getQueriesForElement(root);

  expect(getByText('Related Items Section')).not.toBeNull();
  expect(getByText('Product List')).not.toBeNull();
})