import React from 'react';
import { connect } from 'react-redux';

const Row = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>


);

const Users = ({ users }) => (
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

export default connect((state) => ({ users: state.users }))(Users);
