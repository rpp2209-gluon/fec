import * as React from "react";
import * as ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";

import Overview from "./overview.jsx";

test('Child components are rendered', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Overview />, root);
  const { getByText, getByLabelText } = getQueriesForElement(root);

  expect(getByText('Description')).toBeInTheDocument();
})