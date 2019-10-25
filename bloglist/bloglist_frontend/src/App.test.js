import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

jest.mock('./services/blogs');

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />,
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.getByText('Log in to application'),
    );

    expect(component.container.querySelector('input[name=Username]')).toBeDefined();
    expect(component.container.querySelector('input[name=Username]')).not.toBeNull();
    expect(component.container.querySelector('input[name=Password]')).toBeDefined();
    expect(component.container.querySelector('input[name=Password]')).not.toBeNull();
    expect(component.container.querySelector('button[type=submit]')).toBeDefined();
    expect(component.container.querySelector('button[type=submit]')).not.toBeNull();
    expect(component.queryAllByText('Canonical', { exact: false })).toEqual([]);
    expect(component.container.querySelector('a[href]')).toBeNull();
    expect(component.queryAllByText('like')).toEqual([]);
  });
  test('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
    };

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

    const component = render(
      <App />,
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.getByText('blogs'),
    );

    expect(component.container.querySelector('input[name=Username]')).toBeNull();
    expect(component.container.querySelector('input[name=Password]')).toBeNull();
    expect(component.getAllByText('Canonical', { exact: false })).toBeDefined();
    expect(component.container.querySelector('a[href]')).toBeDefined();
    expect(component.container.querySelector('a[href]')).not.toBeNull();
    expect(component.getAllByText('like')).toBeDefined();
  });
});
