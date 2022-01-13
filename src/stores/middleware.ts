export const applyMiddleware = (dispatch: any) => (action: any) => {
  dispatch(action);
};

export default applyMiddleware;
