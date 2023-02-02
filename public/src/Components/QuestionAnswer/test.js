/**
 * @jest-environment jsdom
 */

import React from 'react';
import App from '../../App.js';
import { render } from "@testing-library/react";


describe('Rendering page correctly ', () => {
  const { getByText, getByLabelText } = render(<App />);


  test('Expect the title of questions and answers to show', () => {
    expect(getByText('QUESTIONS & ANSWERS')).not.toBeNull();
  })
  test('Only 2 or less questions show up', () => {
  })
})