import React from 'react';
import { connect } from 'react-redux';
import {
  deleteBlog, updateBlog,
} from '../reducers/blogsReducer';
import { removeBlogFromUser } from '../reducers/usersReducer';
import { notify } from '../reducers/notificationReducer';

/* eslint-disable react/prop-types */
const SingleBlogView = ({
  blog, user, updBlg, delBlg, rmvBlgFromUser, notif, history,
}) => {
  const handleBlogDelete = async (id, title, author, blogUserId) => {
    if (window.confirm(`remove blog ${title} by ${author}`)) { // eslint-disable-line no-alert
      if (await delBlg(id)) {
        rmvBlgFromUser(id, blogUserId);
        history.push('/');
      } else {
        notif('failed to delete', 'error');
      }
    }
  };

  const handleLike = () => {
    const content = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    };
    updBlg(content);
  };

  const showWhenSameUser = {
    display: user && blog && user.username === blog.user.username ? '' : 'none',
    backgroundColor: 'lightblue',
  };

  return (blog && user ? (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes}<button type="button" onClick={() => handleLike()}>like</button> <br />
      added by {blog.user.name}
      <button style={showWhenSameUser} type="button" onClick={() => handleBlogDelete(blog.id, blog.title, blog.author, blog.user.id)}>remove</button>
    </div>
  ) : (<div>404 Page not found</div>));
};

const mapStateToProps = (state, props) => {
  const blog = state.blogs.find((x) => x.id === props.id);
  return {
    blog,
    user: state.user,
    blogs: state.blogs,
  };
};

const mapDispatchToProps = {
  delBlg: deleteBlog,
  updBlg: updateBlog,
  rmvBlgFromUser: removeBlogFromUser,
  notif: notify,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlogView);
