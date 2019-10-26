export const setNotification = (text, msgClass) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: { text, msgClass },
  });
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.data.text, msgClass: action.data.msgClass };
    default:
      return state;
  }
};

export default reducer;
