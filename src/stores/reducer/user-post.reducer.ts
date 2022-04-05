const initialState = {
  loading: false,
  updating: false,
  userPostData: null,
};

const userPostDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_USER_POST_DATA": {
      return { ...state, userPostData: action.payload };
    }
    default:
      return state;
  }
};

export default userPostDataReducer;
