export const getUserById = (data: any) => {
  return {
    type: "GET_USER_BY_ID",
    payload: data,
  };
};

export const getBadluckerType = (data: any) => {
  return {
    type: "GET_BADLUCKER_TYPE",
    payload: data,
  };
};