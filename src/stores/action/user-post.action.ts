export const getUserPostData = (data: any) => {
  return {
    type: "GET_USER_POST_DATA",
    payload: data,
  };
};
