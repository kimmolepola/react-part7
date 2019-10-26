import React from 'react';

/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  console.log('nottt-----', notification);
  return (
    <div className={notification.msgClass}>
      {notification.message}
    </div>
  );
};
/* eslint-enable react/prop-types */

export default Notification;
