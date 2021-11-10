import React from 'react';
import path from 'path';

import {
  render,
  getByRole,
  getByText,
  getByPlaceholderText,
  waitFor,
  screen,
  act,
  within,
  queryByTestId,
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
import userEvent from '@testing-library/user-event';
import mswServer from '../../../mocks/front/mswServer';
import QA from './QA';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
beforeEach(() => {
  act(() => {
    render(<QA />);
  });
});

test('Displays QA Container', async () => {
  const questionsAndAnswers = await waitFor(() =>
    screen.getByText('Questions & Answers')
  );
  expect(questionsAndAnswers).toBeVisible();
});

describe('Search', () => {
  test('Displays Search element', async () => {
    expect(
      screen.getByPlaceholderText('Have a question? Search for answers…')
    ).toBeVisible();
  });

  test('Search by keyword should properly filter the questions list based on matching questions', async () => {
    userEvent.type(
      screen.getByPlaceholderText('Have a question? Search for answers…'),
      'Where does this product ship from?'
    );

    const qBody = await waitFor(() =>
      screen.getByRole('heading', {
        level: 4,
        name: 'Q: Where does this product ship from?',
      })
    );
    expect(qBody).toBeVisible();
  });

  test('Search by keyword should properly revert to original state after deleting characters to less than 3.', async () => {
    userEvent.type(
      screen.getByPlaceholderText('Have a question? Search for answers…'),
      'thereIsNoWayThereisAMatchforThis'
    );

    const moreAnsweredQuestions = await waitFor(() =>
      screen.queryByRole('button', { name: 'MORE ANSWERED QUESTIONS' })
    );
    expect(moreAnsweredQuestions).toBeNull();
  });
});

describe('Bottom Bar', () => {
  test('Add A Question Button', async () => {
    expect(
      screen.getByRole('button', { name: 'ADD A QUESTION +' })
    ).toBeVisible();
  });

  test('More Answered Questions Button', async () => {
    const button = await waitFor(() =>
      screen.getByRole('button', { name: 'MORE ANSWERED QUESTIONS' })
    );
    expect(button).toBeVisible();
  });

  test('Click on More Answered Questions Button will expand list by 2', async () => {
    const button = await waitFor(() =>
      screen.getByRole('button', { name: 'MORE ANSWERED QUESTIONS' })
    );
    userEvent.click(button);

    const IndividualQuestion = await waitFor(() =>
      screen.getAllByTestId('individual-question-container')
    );

    expect(IndividualQuestion[2]).toBeVisible();
  });
});

describe('Questions List Container', () => {
  test('Displays Questions List Container', async () => {
    expect(screen.getByTestId('question-list-container')).toBeVisible();
    // expect(QuestionsList).toBeVisible();
  });
});

describe('Individual Question Container', () => {
  test('Displays Individual Question Container', async () => {
    const IndividualQuestion = await waitFor(() =>
      screen.getAllByTestId('individual-question-container')
    );
    expect(IndividualQuestion[0]).toBeVisible();
  });

  test('Displays question body from mock server', async () => {
    const qBody = await waitFor(() =>
      screen.getByRole('heading', {
        level: 4,
        name: 'Q: Where does this product ship from?',
      })
    );
    expect(qBody).toBeVisible();
  });
});

describe('Answer List Container', () => {
  test('Displays Answer List Container', async () => {
    const answersList = await waitFor(() =>
      screen.getByTestId('answers-list-container')
    );
    expect(answersList).toBeVisible();
  });
});

describe('Individual Answer Container', () => {
  test('Displays Individual Answer Container', async () => {
    const individualAnswer = await waitFor(() =>
      screen.getAllByTestId('individual-answer-container')
    );
    expect(individualAnswer[0]).toBeVisible();
  });
});

describe('Add a Question Modal', () => {
  // beforeAll(() => mswServer.listen());

  test('Displays Add a Question Modal', async () => {
    userEvent.click(screen.getByTestId('add-question'));
    const qModal = await waitFor(() => screen.getByText('Ask Your Question'));
    expect(qModal).toBeVisible();
  });

  test('Displays question body input field', async () => {
    userEvent.click(screen.getByTestId('add-question'));
    const qBodyInput = await waitFor(() => screen.getByTestId('your-question'));
    expect(qBodyInput).toBeVisible();
  });

  test('Displays nickname input field', async () => {
    userEvent.click(screen.getByTestId('add-question'));
    const nicknameInput = await waitFor(() =>
      screen.getByPlaceholderText('Example: jackson11!')
    );
    expect(nicknameInput).toBeVisible();
  });

  test('Displays email input field', async () => {
    userEvent.click(screen.getByTestId('add-question'));
    const emailInput = await waitFor(() =>
      screen.getByPlaceholderText('Example: jack@email.com')
    );
    expect(emailInput).toBeVisible();
  });

  test('Displays Submit Question button', async () => {
    userEvent.click(screen.getByTestId('add-question'));
    const submitQ = await waitFor(() =>
      screen.getByRole('button', { name: 'Submit Question' })
    );
    expect(submitQ).toBeVisible();
  });

  test('Exits modal when close button is clicked', async () => {
    userEvent.click(screen.getByTestId('add-question'));
    userEvent.click(screen.getByRole('button', { name: 'Close' }));

    const qModal = await waitFor(() => screen.queryByTestId('modal'));
    expect(qModal).toBeNull();
  });

  test('Does not allow submission if button is clicked with empty mandatory fields', async () => {
    userEvent.click(screen.getByTestId('add-question'));
    userEvent.click(screen.getByRole('button', { name: 'Submit Question' }));

    const incompleteError = await waitFor(() =>
      screen.getByText('Please complete all required fields!')
    );
    expect(incompleteError).toBeTruthy();
  });

  test("Does not allow submission if provided email does not contain a '@'", async () => {
    userEvent.click(screen.getByTestId('add-question'));

    userEvent.type(screen.getByTestId('your-question'), 'Is this a test?');
    userEvent.type(
      screen.getByPlaceholderText('Example: jackson11!'),
      'tester'
    );
    userEvent.type(
      screen.getByPlaceholderText('Example: jack@email.com'),
      'notValidEmail'
    );

    userEvent.click(screen.getByRole('button', { name: 'Submit Question' }));

    const emailError = await waitFor(() =>
      screen.getByText('Please provide a valid email!')
    );
    expect(emailError).toBeTruthy();
  });

  test("Does not allow submission if provided email does not contain a '.'", async () => {
    userEvent.click(screen.getByTestId('add-question'));

    userEvent.type(screen.getByTestId('your-question'), 'Is this a test?');
    userEvent.type(
      screen.getByPlaceholderText('Example: jackson11!'),
      'tester'
    );
    userEvent.type(
      screen.getByPlaceholderText('Example: jack@email.com'),
      'notValid@Email'
    );

    userEvent.click(screen.getByRole('button', { name: 'Submit Question' }));

    const emailError = await waitFor(() =>
      screen.getByText('Please provide a valid email!')
    );
    expect(emailError).toBeTruthy();
  });

  // test('Allows question submission if all mandatory fields are completed and email passes validator.', async () => {
  //   userEvent.click(screen.getByTestId('add-question'));

  //   userEvent.type(screen.getByTestId('your-question'), 'Is this a test?');
  //   userEvent.type(
  //     screen.getByPlaceholderText('Example: jackson11!'),
  //     'tester'
  //   );
  //   userEvent.type(
  //     screen.getByPlaceholderText('Example: jack@email.com'),
  //     'valid@email.com'
  //   );

  //   userEvent.click(screen.getByRole('button', { name: 'Submit Question' }));

  // const qModal = await waitFor(() => screen.queryByTestId('modal'));
  // expect(qModal).toBeNull();
  // });

  // afterAll(() => mswServer.listen());
});

// describe('Add a Question Modal', () => {
//   test('Displays Add a Question Modal', async () => {
//     userEvent.click(screen.getByTestId('add-answer'));
//     const aModal = await waitFor(() => screen.getByText('Submit Your Answer'));
//     expect(aModal).toBeVisible();
//   });

//   test('Does not allow answer submission if button is clicked with empty mandatory fields', async () => {
//     userEvent.click(screen.getByTestId('add-answer'));
//     userEvent.click(screen.getByRole('button', { name: 'Submit Answer' }));

//     const incompleteError = await waitFor(() =>
//       screen.getByText('Please complete all required fields!')
//     );
//     expect(incompleteError).toBeTruthy();
//   });
// });
