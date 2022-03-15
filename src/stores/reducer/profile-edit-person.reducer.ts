const initialState = {
  loading: false,
  updating: false,
  userData: null,
  uploadFiles: null,
  updateData: null,
};

const profileEditPersonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_USER_BY_ID": {
      return { ...state, userData: action.payload };
    }
    case "UPLOAD_MULTIPLE_FILE": {
      return { ...state, uploadFiles: action.payload };
    }
    case "UPDATE_USER_PROFILE": {
      return { ...state, updateData: action.payload };
    }
    default:
      return state;
  }
};

export default profileEditPersonReducer;
