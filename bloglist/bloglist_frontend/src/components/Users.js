import React from 'react';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */
const OneUser = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <b>added blogs</b>
    <ul>
      {user.blogs.map((x) => <li key={x.id}>{x.title}</li>)}
    </ul>
  </div>
);

const AllUsers = ({ users, history }) => (
  <div>
    <h1>Users</h1>
    <table>
      <tbody>
        <tr>
          <td />
          <th>blogs created</th>
        </tr>
        {/* eslint-disable-next-line max-len */}
        {users === undefined ? null : users.map((x) => <Row key={x.id} user={x} history={history} />)}
      </tbody>
    </table>
  </div>
);

const handleClick = (user, history) => () => {
  history.push(`/users/${user.id}`);
};

const linkStyle = {
  background: 'none!important',
  border: 'none',
  padding: '0!important',
  color: '#069',
  textDecoration: 'underline',
  cursor: 'pointer',
};

const Row = ({ user, history }) => (
  <tr>
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, max-len */}
    <td onKeyDown={handleClick(user, history)} style={linkStyle} onClick={handleClick(user, history)}>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>
);


const Users = ({ users, id, history }) => {
  const user = users.find((x) => id && x.id.toString() === id.toString());
  return (
    <div>
      {user ? <OneUser user={user} /> : <AllUsers history={history} users={users} />}
    </div>
  );
};

export default connect((state) => ({ users: state.users }))(Users);
