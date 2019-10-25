import React from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';
import { useField } from '../hooks';

/* eslint-disable react/prop-types */
const NewBlogForm = ({
  user, blogs, setBlogs, notify,
}) => {
  const { reset: urlreset, ...url } = useField('text', 'Url');
  const { reset: authorreset, ...author } = useField('text', 'Author');
  const { reset: titlereset, ...title } = useField('text', 'Title');

  const noteFormRef = React.createRef();

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();
    try {
      const response = await blogService.create({
        title: title.value, author: author.value, url: url.value,
      });
      const rsp = { ...response };
      rsp.user = { id: response.user, ...user };
      setBlogs(blogs.concat(rsp));
      urlreset();
      authorreset();
      titlereset();
      notify(`a new blog ${title.value} by ${author.value} added`, 'success');
    } catch (exception) {
      notify('Failed', 'error');
    }
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={noteFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleCreateNewBlog}>
          <div>
            title:
            <input {...title} />
            <button type="button" onClick={() => titlereset()}>reset</button>
          </div>
          <div>
            author:
            <input {...author} />
            <button type="button" onClick={() => authorreset()}>reset</button>
          </div>
          <div>
            url:
            <input {...url} />
            <button type="button" onClick={() => urlreset()}>reset</button>
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
    </div>
  );
};
/* eslint-enable react/jsx-props-no-spreading, react/prop-types */

export default NewBlogForm;
