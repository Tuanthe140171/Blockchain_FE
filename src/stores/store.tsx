import React, { createContext, useContext, useReducer } from "react";
import applyMiddleware from "./middleware";
import reducer, { IObject } from "./reducer";

const Context = createContext([] as any[]);

const combindedReducers = (state: IObject = {}, action: IObject = {}) => {
  const keys = Object.keys(reducer);
  return Object.assign(
    {},
    ...keys.map((key: string) => ({
      [key]: reducer[key](state[key], action),
    }))
  );
};

const ContextProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(
    combindedReducers,
    combindedReducers({})
  );
  return (
    <Context.Provider value={[state, applyMiddleware(dispatch)]}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

export const useStore = () => useContext(Context);
