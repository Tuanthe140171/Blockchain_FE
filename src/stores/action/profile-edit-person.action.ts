export const getUserById = (id: any) => {
  return {
    type: "GET_USER_BY_ID",
    payload: id,
  };
};

export const uploadMultipleFile = (files: any) => {
  return {
    type: "UPLOAD_MULTIPLE_FILE",
    payload: files,
  };
};

export const updateUserProfile = (data: any) => {
  return {
    type: "UPLOAD_MULTIPLE_FILE",
    payload: data,
  };
};
