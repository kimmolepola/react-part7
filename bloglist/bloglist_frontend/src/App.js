import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Link, withRouter,
} from 'react-router-dom';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import Blog from './components/Blog';
import './App.css';
import { useField } from './hooks';
import {
  deleteBlog, updateBlog, initializeBlogs,
} from './reducers/blogsReducer';
import { notify } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';
import Users from './components/Users';
import { initializeUsers, removeBlogFromUser } from './reducers/usersReducer';

/* eslint-disable react/prop-types */
const App = ({
  blogs, user, notif, setUsr, deleteBlg, updateBlg, initBlogs, initUsers, rmvBlgFromUsr,
}) => {
  const { reset: usernamereset, ...username } = useField('text', 'Username');
  const { reset: passwordreset, ...password } = useField('password', 'Password');

  useEffect(() => { initBlogs(); }, [initBlogs]);
  useEffect(() => { initUsers(); }, [initUsers]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const usr = JSON.parse(loggedUserJSON);
      setUsr(usr);
      blogService.setConfig(usr.token);
    }
  }, [setUsr]);

  const handleBlogDelete = async (id, title, author, blogUserId) => {
    if (window.confirm(`remove blog ${title} by ${author}`)) { // eslint-disable-line no-alert
      if (await deleteBlg(id)) {
        rmvBlgFromUsr(id, blogUserId);
      } else {
        notif('failed to delete', 'error');
      }
    }
  };

  const handleBlogUpdate = (content) => {
    updateBlg(content);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUsr(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const usr = await loginService.login({
        username: username.value, password: password.value,
      });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(usr),
      );
      blogService.setConfig(usr.token);
      setUsr(usr);
      usernamereset();
      passwordreset();
    } catch (exception) {
      notif('Wrong username or password', 'error');
    }
  };

  const Blogs = () => (
    blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        handleBlogUpdate={handleBlogUpdate}
        handleBlogDelete={handleBlogDelete}
        user={user}
      />
    )));

  const padding = {
    padding: 5,
  };

  const UsersYesHistory = withRouter(Users);

  const AppView = () => (
    <div>
      <Router>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in
          <button onClick={handleLogout} type="button">logout</button>
        </p>
        <Route exact path="/" render={() => <NewBlogForm />} />
        <Route exact path="/" render={() => <Blogs />} />
        <Route exact path="/users/:id?" render={({ match }) => <UsersYesHistory id={match.params.id} />} />
      </Router>
    </div>
  );


  /* eslint-disable react/jsx-props-no-spreading */
  const LoginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
            username
          <input {...username} />
        </div>
        <div>
            password
          <input {...password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
  /* eslint-disable react/jsx-first-prop-new-line, react/jsx-max-props-per-line */

  return (
    <div>
      {user === null && LoginForm()}
      {user !== null && AppView()}
    </div>
  );
};

const dispatchToProps = {
  rmvBlgFromUsr: removeBlogFromUser,
  initBlogs: initializeBlogs,
  updateBlg: updateBlog,
  deleteBlg: deleteBlog,
  notif: notify,
  setUsr: setUser,
  initUsers: initializeUsers,
};

const stateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
  users: state.users,
});

export default connect(stateToProps, dispatchToProps)(App);
