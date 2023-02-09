/**
 * @jest-environment jsdom
 */

import React from 'react';
import App from '../../App.js';
import { render, screen, waitFor } from "@testing-library/react";

beforeEach(async () => {
  await render(<App />);
});

describe('Does the page render correctly?', () => {
  // const { getByText, container } = render(<App />);
  test('Expect the title of questions and answers to show', async () => {
    expect(screen.getByText('QUESTIONS & ANSWERS')).not.toBeNull();
  });

  test('Only 2 or less questions show up', async () => {
    await waitFor(() => screen.getAllByTestId('question'));
    const questions = await screen.getAllByTestId('question');
    expect(questions.length).toBeLessThanOrEqual(2);
  });

  test('Only a maximum of 4 answers should show up', async () => {
    await waitFor(() => screen.getAllByTestId('answer'));
    const answers = await screen.getAllByTestId('answer');
    expect(answers.length).toBeLessThanOrEqual(4);
  });

  test('Helpful should appear the same amount of times as questions', async () => {
    await waitFor(() => screen.getAllByTestId('question'));
    await waitFor(() => screen.getAllByTestId('question-helpful'));
    const questions = await screen.getAllByTestId('question');
    const questionsHelpful = await screen.getAllByTestId('question-helpful');
    expect(questions.length).toBe(questionsHelpful.length);
  });


  test('Helpful should appear the same amount of times as answers', async () => {
    await waitFor(() => screen.getAllByTestId('answer'));
    await waitFor(() => screen.getAllByTestId('answer-helpful'));
    const answers = await screen.getAllByTestId('answer');
    const answersHelpful = await screen.getAllByTestId('answer-helpful');
    expect(answers.length).toBe(answersHelpful.length);
  });

  test('Report should appear the same amount of times as answers', async () => {
    await waitFor(() => screen.getAllByTestId('answer'));
    await waitFor(() => screen.getAllByTestId('answer-report'));
    const answers = await screen.getAllByTestId('answer');
    const answersReport = await screen.getAllByTestId('answer-report');
    expect(answers.length).toBe(answersReport.length);
  });

  test('Add answer should appear the same amount of times as questions', async () => {
    await waitFor(() => screen.getAllByTestId('question'));
    await waitFor(() => screen.getAllByTestId('add-answer'));
    const questions = await screen.getAllByTestId('question');
    const addAnswer = await screen.getAllByTestId('add-answer');
    expect(questions.length).toBe(addAnswer.length);
  });

  test('Search bar should exist', async () => {
    await waitFor(() => screen.getByTestId('input-search'));
    const inputSearch = await screen.getByTestId('input-search');
    expect(inputSearch).not.toBeNull();
  });

  test('Adding a question button should exist', async () => {
    await waitFor(() => screen.getByTestId('add-a-question'));
    const addQuestion = await screen.getByTestId('add-a-question');
    expect(addQuestion).not.toBeNull();
  });

  test('More answered questions button should exist', async () => {
    await waitFor(() => screen.getByTestId('load-more-questions'));
    const moreQuestions = await screen.getByTestId('load-more-questions');
    expect(moreQuestions).not.toBeNull();
  });
})

describe('Page should be dynamic', () => {

})