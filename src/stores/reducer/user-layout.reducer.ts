const initialState = {
  loading: false,
  updating: false,
  userData: null,
  badluckerType: null,
};

const userLayoutReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_USER_BY_ID": {
      return { ...state, userData: action.payload };
    }
    case "GET_BADLUCKER_TYPE": {
      return { ...state, badluckerType: action.payload };
    }
    default:
      return state;
  }
};

export default userLayoutReducer;