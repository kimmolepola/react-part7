import React from 'react';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  return (
    <div className={notification.msgClass}>
      {notification.message}
    </div>
  );
};
/* eslint-enable react/prop-types */

export default connect((state) => ({ notification: state.notification }))(Notification);
