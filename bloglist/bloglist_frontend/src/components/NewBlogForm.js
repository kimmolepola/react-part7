import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import blogService from '../services/blogs';
import Togglable from './Togglable';
import { useField } from '../hooks';
import { addBlog } from '../reducers/blogsReducer';
import { notify } from '../reducers/notificationReducer';
import { addBlogForUser } from '../reducers/usersReducer';

/* eslint-disable react/prop-types */
const NewBlogForm = ({
  notif, users, addBlgForUsr, addBlg,
}) => {
  const { reset: urlreset, ...url } = useField('text', 'Url');
  const { reset: authorreset, ...author } = useField('text', 'Author');
  const { reset: titlereset, ...title } = useField('text', 'Title');

  const noteFormRef = React.createRef();

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();
    const quickFixUrl = url.value.substring(0, 4) === 'http' ? url.value : 'http://'.concat(url.value);
    try {
      const response = await blogService.create({
        title: title.value, author: author.value, url: quickFixUrl,
      });
      const rsp = { ...response };
      rsp.user = _.omit(users.find((x) => x.id.toString() === response.user.toString()), 'blogs');
      addBlgForUsr(_.omit(rsp, 'user', 'likes'), response.user);
      rsp.comments = { id: rsp.comments, content: [] };
      addBlg(rsp);
      urlreset();
      authorreset();
      titlereset();
      notif(`a new blog ${title.value} by ${author.value} added`, 'success');
    } catch (exception) {
      notif('Failed', 'error');
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

const mapDispatchToProps = {
  addBlg: addBlog,
  addBlgForUsr: addBlogForUser,
  notif: notify,
};

const mapStateToProps = (state) => ({
  users: state.users,
});


export default connect(mapStateToProps, mapDispatchToProps)(NewBlogForm);
