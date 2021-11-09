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
import {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  test,
  expect,
  describe,
} from '@jest/globals';
import QA from './QA';
import mswServer from '../../../mocks/front/mswServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeEach(() => {
  act(() => {
    render(<QA />);
  });
});

// eslint-disable-next-line no-undef
test('Displays QA Container', async () => {
  expect(screen.getByText('Questions & Answers')).toBeVisible();
});

test('Displays Search element', async () => {
  expect(
    screen.getByPlaceholderText('Search Questions & Answers')
  ).toBeVisible();
});

test('Displays questions list container', async () => {
  expect(screen.getByTestId('question-list-container')).toBeVisible();
});
