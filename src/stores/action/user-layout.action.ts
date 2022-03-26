export const getUserById = (data: any) => {
  return {
    type: "GET_USER_BY_ID",
    payload: data,
  };
};
