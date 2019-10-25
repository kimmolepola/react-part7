import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const simpleBlog = {
  title: 'Otsikko',
  author: 'Tekija',
  likes: '9001',
};

test('clicking the like button twice calls the event handler twice', () => {
  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler} />,
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={simpleBlog} />,
  );

  expect(component.container).toHaveTextContent(
    'Otsikko',
  );
  expect(component.container).toHaveTextContent(
    'Tekija',
  );
  expect(component.container).toHaveTextContent(
    '9001',
  );
});
