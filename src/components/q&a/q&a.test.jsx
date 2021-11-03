/* eslint-disable no-undef */
import React from 'react';
import {
  render,
  getByRole,
  getByText,
  waitFor,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import QA from './QA';

// eslint-disable-next-line no-undef
test('Displays QA Container', async () => {
  render(<QA />);

  expect(screen.getByText('Questions & Answers')).toBeVisible();
});

test('Displays Search element', async () => {
  render(<QA />);

  expect(
    screen.getByPlaceholderText('Search Questions & Answers')
  ).toBeVisible();
});

test('Displays questions list container', async () => {
  render(<QA />);

  expect(screen.getByTestId('question-list-container')).toBeVisible();
});
