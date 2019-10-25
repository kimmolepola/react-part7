import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const user = {
  name: 'Kayttajaname',
  username: 'kayttajausername',
  id: '345id',
};

const blog = {
  id: '123id',
  user,
  title: 'otsikkotitle',
  author: 'tekijaauthor',
  likes: 0,
  url: 'www.blog.fi',
};

const handleBlogUpdate = () => {};
const handleBlogDelete = () => {};

test('only the name and author of the blog post are shown by default', () => {
  const component = render(
    <Blog
      blog={blog}
      handleBlogUpdate={handleBlogUpdate}
      handleBlogDelete={handleBlogDelete}
      user={user}
    />,
  );

  expect(component.container).toHaveTextContent('otsikkotitle');
  expect(component.container).toHaveTextContent('tekijaauthor');
  expect(component.queryByText('www.blog.fi')).not.toBeVisible();
  expect(component.queryByText('like')).not.toBeVisible();
  expect(component.queryByText('Kayttajaname', { exact: false })).not.toBeVisible();
});

test('when the blog post is clicked, the other information of the blog post becomes visible', () => {
  const component = render(
    <Blog
      blog={blog}
      handleBlogUpdate={handleBlogUpdate}
      handleBlogDelete={handleBlogDelete}
      user={user}
    />,
  );

  const element = component.getByRole('button');
  fireEvent.click(element);

  expect(component.container).toHaveTextContent('otsikkotitle');
  expect(component.container).toHaveTextContent('tekijaauthor');
  expect(component.queryByText('www.blog.fi')).toBeVisible();
  expect(component.queryByText('like')).toBeVisible();
  expect(component.queryByText('Kayttajaname', { exact: false })).toBeVisible();
});
