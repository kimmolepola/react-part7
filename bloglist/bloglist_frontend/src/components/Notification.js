import React from 'react';

/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  return (
    <div className={notification.className}>
      {notification.message}
    </div>
  );
};
/* eslint-enable react/prop-types */

export default Notification;
