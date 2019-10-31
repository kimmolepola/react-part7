import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

const cellStyle = {
  display: 'table-cell',
  paddingRight: '10px',
};

const AllUsersRow = ({ user }) => (
  <div style={{ display: 'table-row' }}>
    <Link style={cellStyle} to={`/users/${user.id}`}>{user.name}</Link>
    <div style={cellStyle}>{user.blogs.length}</div>
  </div>
);

const AllUsers = ({ users }) => (
  <div>
    <h1>Users</h1>
    <div style={{ display: 'table' }}>
      <div style={{ display: 'table-row' }}>
        <div style={cellStyle} />
        <div style={cellStyle}><b>blogs created</b></div>
      </div>
      {users === undefined ? null : users.map((x) => <AllUsersRow key={x.id} user={x} />)}
    </div>
  </div>
);

const Users = ({ users, id }) => {
  if (!id) {
    return <AllUsers users={users} />;
  }
  const user = users.find((x) => id && x.id.toString() === id.toString());
  if (user) {
    return <OneUser user={user} />;
  }
  return <div>404 Page not found</div>;
};

export default connect((state) => ({ users: state.users }))(Users);

/*
const Row = ({ user }) => (
  <tr>
    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
    <td>{user.blogs.length}</td>
  </tr>
);

const AllUsers = ({ users }) => (
  <div>
    <h1>Users</h1>
    <table>
      <tbody>
        <tr>
          <td />
          <th>blogs created</th>
        </tr>
        {users === undefined ? null : users.map((x) => <Row key={x.id} user={x} />)}
      </tbody>
    </table>
  </div>
);
*/
