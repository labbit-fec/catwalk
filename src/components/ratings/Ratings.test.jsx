import React from 'react';
import {
  render,
  getByRole,
  getByText,
  waitFor,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Ratings from './Ratings';

beforeEach(() => {
  render(<Ratings />);
});

test('Displays Ratings & Reviews Container', async () => {
  expect(screen.getByText('Ratings & Reviews')).toBeVisible();
});

test('Displays % recommend', async () => {
  expect(
    screen.getByText(/\d\d?% of reviews recommend this product/)
  ).toBeVisible();
});

test('Displays total number of reviews', async () => {
  expect(screen.getByText(/\d+ reviews, sorted by/)).toBeVisible();
});
