import React from 'react';
import {
  render,
  getByRole,
  getByText,
  waitFor,
  screen,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Overview from './Overview';
import mswServer from '../../../mocks/front/browser';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeEach(() => {
  render(<Overview />);
});

test('Displays Overview Container', async () => {
  expect(screen.getByText('Product Overview')).toBeVisible();
});

test('Displays Image Gallery Container', async () => {
  expect(screen.getByText('Image Gallery')).toBeVisible();
});

describe('Product Information Container', () => {
  test('Displays Product Information Container', async () => {
  expect(screen.getByText('Product Information')).toBeVisible();
  });

  test('Displays mock Product Title as h1 element ', async () => {
    expect(
      screen.getByRole('heading', { level: 1, name: 'Product Title' })
    ).toBeVisible();
  });

  test('Displays title text from mock server', async () => {
    expect(screen.getByText('Shiba Snow Coat')).toBeVisible();
  })
});

test('Displays Product Text Overview Container', async () => {
  expect(screen.getByText('Product Text Overview')).toBeVisible();
});

test('Displays Style Selector Container', async () => {
  expect(screen.getByText('Style Selector')).toBeVisible();
});

test('Displays Add to Cart Container', async () => {
  expect(screen.getByText('Add To Cart')).toBeVisible();
});
