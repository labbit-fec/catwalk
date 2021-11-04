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
import Overview from './Overview';
import mswServer from '../../../mocks/front/mswServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeEach(() => {
  act(() => {
    render(<Overview />);
  });
});

test('Displays Overview Container', async () => {
  const productOverview = await waitFor(() =>
    screen.getByText('Product Overview')
  );
  expect(productOverview).toBeVisible();
});

test('Displays Image Gallery Container', async () => {
  const imageGallery = await waitFor(() =>
    screen.getByText('Image Gallery')
  );
  expect(imageGallery).toBeVisible();
});

describe('Product Information Container', () => {
  test('Displays Product Information Container', async () => {
  expect(screen.getByText('Product Information')).toBeVisible();
  });

  //This is my best example right now:
  test('Displays Product Title as h1 element from mock server response', async () => {
    const productTitle = await waitFor(() =>
      screen.getByRole('heading', { level: 1, name: 'Shiba Snow Coat' }));
    expect(productTitle).toBeVisible();
  });

  //Notice this one would pass if the words 'Shiba Snow Coat'
  //was anywhere on page. Which obviously it will be repeated.
  //so the previous test is better because it looks for the h1
  //which has the specific title text.
  test('Displays title text from mock server', async () => {
    const productTitle = await waitFor(() =>
      screen.getByText('Shiba Snow Coat')
    );
    expect(productTitle).toBeVisible();
  });
});

test('Displays Product Text Overview Container', async () => {
  const productTextOverview = await waitFor(() =>
    screen.getByText('Product Text Overview')
  );
  expect(productTextOverview).toBeVisible();
});

test('Displays Style Selector Container', async () => {
  const styleSelector = await waitFor(() =>
    screen.getByText('Style Selector')
  );
  expect(styleSelector).toBeVisible();
});

test('Displays Add to Cart Container', async () => {
  const addToCart = await waitFor(() =>
    screen.getByText('Add To Cart')
  );
  expect(addToCart).toBeVisible();
});
