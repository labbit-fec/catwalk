import React from 'react';

import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { beforeEach, test, expect, describe } from '@jest/globals';

import Ratings from './Ratings';
import ProductIdContext from '../context/ProductIdContext';

beforeEach(() => {
  render(
    <ProductIdContext.Provider
      value={{ productId: 61619, setProductId: () => {} }}
    >
      <Ratings />
    </ProductIdContext.Provider>
  );
});

describe('Ratings & Reviews Container', () => {
  test('Displays Ratings & Reviews Container', async () => {
    const ratings = await waitFor(() =>
      screen.getByRole('heading', { level: 3, name: 'Ratings & Reviews' })
    );
    expect(ratings).toBeVisible();
  });
});

describe('Review List Entries', () => {
  test('Displays review summary (review 1 of 2)', async () => {
    const reviewText = await waitFor(() =>
      screen.getByText('Vel sit itaque odio.')
    );
    expect(reviewText).toBeVisible();
  });

  test('Displays review summary (review 2 of 2)', async () => {
    const reviewText = await waitFor(() =>
      screen.getByText(
        'Id nulla laudantium laudantium voluptate accusamus quis amet velit accusamus.'
      )
    );
    expect(reviewText).toBeVisible();
  });

  test('Displays review body (review 1 of 2)', async () => {
    const reviewText = await waitFor(() =>
      screen.getByText(
        'Vitae qui eligendi natus expedita. Animi omnis voluptatem aut itaque perspiciatis et ut. Veritatis architecto voluptatem non est saepe. Ullam magni a facere illo laboriosam non.'
      )
    );
    expect(reviewText).toBeVisible();
  });

  test('Displays review body (review 2 of 2)', async () => {
    const reviewText = await waitFor(() =>
      screen.getByText(
        'In qui blanditiis dolore nobis. Officiis et perspiciatis ipsam ipsa tempora non. Id et fugiat nam. Nam placeat sit quia.'
      )
    );
    expect(reviewText).toBeVisible();
  });

  test('Marks a review as helpful', async () => {
    const helpfulButton = await waitFor(
      () => screen.getAllByRole('button', { name: 'Yes' })[0]
    );
    userEvent.click(helpfulButton);
    const helpfulText = await waitFor(() =>
      screen.getByText('Thank you for marking this as helpful!')
    );
    expect(helpfulText).toBeVisible();
  });

  test('Re-sorts review list when sort method is changed', async () => {
    const selector = await waitFor(() => screen.getByTestId('select'));
    userEvent.selectOptions(selector, 'helpful');
    expect(screen.getByRole('option', { name: 'Newest' }).selected).toBe(false);
    expect(screen.getByRole('option', { name: 'Most helpful' }).selected).toBe(
      true
    );
    expect(screen.getByRole('option', { name: 'Most relevant' }).selected).toBe(
      false
    );

    const newFirstReviewSummary = await waitFor(() =>
      screen.getByText('Amet perspiciatis expedita iusto optio a.')
    );

    expect(newFirstReviewSummary).toBeVisible();
  });

  test('Filters the review list to only reviews of 1 star', async () => {
    const starLabel = await waitFor(() => screen.getByText('1 stars:'));
    userEvent.click(starLabel);
    const newFirstReviewSummary = await waitFor(() =>
      screen.getByText(
        'Fugit saepe voluptatem temporibus laudantium qui culpa.'
      )
    );
    expect(newFirstReviewSummary).toBeVisible();
  });
});

describe('Modal Form', () => {
  beforeEach(async () => {
    const addReviewBtn = await waitFor(() => screen.getByText('Add a review'));
    userEvent.click(addReviewBtn);
  });

  test('Sets recommended to true when Yes selected', async () => {
    const radioYes = await waitFor(() => screen.getByLabelText('Yes'));
    expect(radioYes.checked).toEqual(false);
    userEvent.click(radioYes);
    expect(radioYes.checked).toEqual(true);
  });

  test('Dynamically counts the review body', async () => {
    const reviewBody = await waitFor(() =>
      screen.getByLabelText('Review body (50 - 1,000 characters):')
    );

    userEvent.type(reviewBody, 'This string has 30 characters.');
    let updatedReviewCounter = await waitFor(() =>
      screen.getByText('Minimum required characters left: 20')
    );

    userEvent.clear(reviewBody);
    userEvent.type(
      reviewBody,
      'This string now has over 50 characters. This string now has over 50 characters.'
    );
    updatedReviewCounter = await waitFor(() =>
      screen.getByText('Minimum characters reached.')
    );
    expect(updatedReviewCounter).toBeVisible();
  });

  test('Shows and updates relevant characteristics', async () => {
    const characteristicLabel = await waitFor(() => screen.getByText('Fit'));
    expect(characteristicLabel).toBeVisible();

    const option1 = await waitFor(
      () => screen.getAllByLabelText('1 - Runs tight')[0]
    );
    expect(option1.checked).toEqual(false);

    const option2 = await waitFor(
      () => screen.getAllByLabelText('2 - Runs slightly tight')[0]
    );
    expect(option2.checked).toEqual(false);

    const option3 = await waitFor(
      () => screen.getAllByLabelText('3 - Perfect')[0]
    );
    expect(option3.checked).toEqual(false);

    const option4 = await waitFor(
      () => screen.getAllByLabelText('4 - Runs slightly long')[0]
    );
    expect(option4.checked).toEqual(false);

    const option5 = await waitFor(
      () => screen.getAllByLabelText('5 - Runs long')[0]
    );
    expect(option5.checked).toEqual(false);

    userEvent.click(option5);
    expect(option5.checked).toEqual(true);
  });
});
