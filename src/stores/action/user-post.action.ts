export const getUserPostData = (data: any) => {
  return {
    type: "GET_USER_POST_DATA",
    payload: data,
  };
};

export const getUserFollowingData = (data: any) => {
  return {
    type: "GET_USER_FOLLOWING_DATA",
    payload: data,
  };
};

export const getUserPostBanner = (data: any) => {
  return {
    type: "GET_USER_POST_BANNER",
    payload: data,
  };
};

