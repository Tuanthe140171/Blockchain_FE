const initialState = {
  loading: false,
  updating: false,
  userPostData: null,
  userFollowingData: null,
};

const userPostDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_USER_POST_DATA": {
      return { ...state, userPostData: action.payload };
    }
    case "GET_USER_FOLLOWING_DATA": {
      return { ...state, userFollowingData: action.payload };
    }
    default:
      return state;
  }
};

export default userPostDataReducer;
