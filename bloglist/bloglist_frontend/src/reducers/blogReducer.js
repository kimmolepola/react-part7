export const setNewBlogs = (blogs) => (dispatch) => {
  dispatch({
    type: 'SET_BLOGS',
    data: blogs,
  });
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
