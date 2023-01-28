/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../../App.js';


describe('Questions', () => {
  test('Only 2 or less questions show up', async () => {
    const { container } = render(<App />);
    console.log(container)
  })
})