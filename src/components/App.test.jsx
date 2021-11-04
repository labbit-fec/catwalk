/* eslint-disable no-undef */
import React from 'react';
import path from 'path';

import {
  render,
  getByRole,
  getByText,
  waitFor,
  screen,
  act,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
// import {
//   beforeEach,
//   afterEach,
//   test,
//   expect,
//   describe,
// } from 'jest';
import App from './App';
import mswServer from '../../mocks/front/mswServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeEach(() => {
  act(() => {
    render(<App />);
  });
});

test('Displays App Container', async () => {
  const appContainer = await waitFor(() =>
    screen.getByText('App Container')
  );
  expect(appContainer).toBeVisible();
});

test('Product ID changes based on URL', async () => {
  //go to url ? /morning-joggers/
  delete window.location;
  window.location = {
    href: 'http://localhost:3000/morning-joggers/', //brittle here
  };
  act(() => {
    render(<App />); //rerender with new url
  });
  //displays matching product title on page
  const productId = await waitFor(() =>
    screen.getByText('Main Content of 61577')
  );
  expect(productId).toBeVisible();
});

test('Product Title changes based on URL', async () => {
  //go to url ? /morning-joggers/
  delete window.location;
  window.location = {
    href: 'http://localhost:3000/morning-joggers/', //brittle here
  };
  act(() => {
    render(<App />); //rerender with new url
  });
  //displays matching product title on page
  const productTitle = await waitFor(() =>
    screen.getByRole('heading', { level: 1, name: 'Morning Joggers' }));
  expect(productTitle).toBeVisible();
});