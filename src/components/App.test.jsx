/* eslint-disable no-undef */
import React from 'react';

import { cleanup, render, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import mswServer from '../../mocks/front/mswServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeAll(() => {
  act(() => {
    render(<App />);
  });
});

test('Displays App Container', async () => {
  const appContainer = await waitFor(() => screen.getByText('App Container'));
  expect(appContainer).toBeVisible();
});

test('Product ID changes based on URL', async () => {
  window.location.pathname = '/shiba-snow-coat/';
  cleanup();
  act(() => {
    render(<App />);
  });
  const productId = await waitFor(() =>
    screen.getByText('Main Content of 1337')
  );
  expect(productId).toBeVisible();
});
