import React from 'react';

import { render, waitFor, screen, act } from '@testing-library/react';
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

describe('Image Gallery Container', () => {
  test('Displays Image Gallery Container', async () => {
    const imageGallery = await waitFor(() => screen.getByText('Image Gallery'));
    expect(imageGallery).toBeVisible();
  });
});

describe('Product Information Container', () => {
  test('Displays Product Information Container', async () => {
    expect(screen.getByText('Product Information')).toBeVisible();

    // This is my best example right now:
    test('Displays Product Title as h1 element from mock server response', async () => {
      const productTitle = await waitFor(() =>
        screen.getByRole('heading', { level: 1, name: 'Shiba Snow Coat' })
      );
      expect(productTitle).toBeVisible();
    });

    // Notice this one would pass if the words 'Shiba Snow Coat'
    // was anywhere on page. Which obviously it will be repeated.
    // so the previous test is better because it looks for the h1
    // which has the specific title text.
    test('Displays title text from mock server', async () => {
      const productTitle = await waitFor(() =>
        screen.getByText('Shiba Snow Coat')
      );
      expect(productTitle).toBeVisible();
    });

    test('Displays Category text from mock server', async () => {
      const productCategory = await waitFor(() => screen.getByText('Coats'));
      expect(productCategory).toBeVisible();
    });

    test('Displays Default Price from mock server', async () => {
      const productDefaultPrice = await waitFor(() =>
        screen.getByText('9000.00')
      );
      expect(productDefaultPrice).toBeVisible();
    });
  });

  describe('Product Text Overview Container', () => {
    test('Displays Product Slogan from mock server', async () => {
      const productSlogan = await waitFor(() =>
        screen.getByText('Woof woof woof')
      );
      expect(productSlogan).toBeVisible();
    });

    test('Displays Text Description from mock server', async () => {
      const productDescription = await waitFor(() =>
        screen.getByText('For the intelligent hound in cold weather')
      );
      expect(productDescription).toBeVisible();
    });

    test('Displays Feature from mock server', async () => {
      const productFeature = await waitFor(() => screen.getByText('Zipper'));
      expect(productFeature).toBeVisible();
    });
  });

  describe('Style Selector Container', () => {
    test('Displays Style Selector Container', async () => {
      const styleSelector = await waitFor(() =>
        screen.getByText('Style Selector')
      );
      expect(styleSelector).toBeVisible();
    });
  });

  test('Displays Default Style name', async () => {
    const styleName = await waitFor(() => screen.getByText('Black'));
    expect(styleName).toBeVisible();
  });

  test('Displays All Style Thumbnails', async () => {
    const styleThumbnails = await waitFor(() =>
      screen.getAllByRole('img', { name: /style thumbnail/i })
    );
    expect(styleThumbnails.length).toEqual(6);
    expect(styleThumbnails[0]).toBeVisible();
  });
});

describe('Add to Cart Container', () => {
  test('Displays Add to Cart Container', async () => {
    const addToCart = await waitFor(() => screen.getByText('Add To Cart'));
    expect(addToCart).toBeVisible();
  });
});
