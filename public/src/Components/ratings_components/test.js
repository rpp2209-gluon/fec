/**
 * @jest-environment jsdom
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";
import Ratings from "../ratings.jsx";

const render = (component) => {
  const root = document.createElement('div');
  ReactDOM.render(component, root);
  return getQueriesForElement(root);
}

test('renders page', () => {
  const { getByText, getByLabelText } = render(<Ratings />);
  expect(getByText('Ratings and Reviews')).not.toBeNull();
})