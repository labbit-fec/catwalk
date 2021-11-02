import React from 'react';
import {
  render,
  getByRole,
  getByText,
  waitFor,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('Displays App Container', async () => {
  render(<App />);

  expect(screen.getByText('App Container')).toBeVisible();
});
