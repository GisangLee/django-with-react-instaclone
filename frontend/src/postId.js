import React, { createContext, useContext } from "react";
import { getStorageItem, setStorageItem } from "./utils/useLocalStorage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update,
} from "use-reducer-with-side-effects";

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;

  if (type === SET_POST_ID) {
    return prevState;
  }
  return prevState;
};

export const AppProvider = ({ children }) => {
  const postId = getStorageItem("postId", "");
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    postId,
    isAuthenticated: postId.length > 0,
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const postIdContext = () => useContext(AppContext);

// Actions
const SET_POST_ID = "APP/SET_POST_ID";

// Action Creators
export const setToken = (token) => ({ type: SET_POST_ID, payload: token });
