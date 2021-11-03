import React from 'react';
import {
  render,
  getByRole,
  getByText,
  waitFor,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Overview from './Overview';

beforeEach(() => {
  render(<Overview />);
});

test('Displays Overview Container', async () => {
  expect(screen.getByText('Product Overview')).toBeVisible();
});

test('Displays Image Gallery Container', async () => {
  expect(screen.getByText('Image Gallery')).toBeVisible();
});

test('Displays Product Information Container', async () => {
  expect(screen.getByText('Product Information')).toBeVisible();
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