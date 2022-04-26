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

export const getUserBlkType = (data: any) => {
  return {
    type: "GET_USER_BLK_TYPE",
    payload: data,
  };
};

export const getDefaultNotification = (data: any) => {
  return {
    type: "GET_DEFAULT_NOTIFICATION",
    payload: data,
  };
};
