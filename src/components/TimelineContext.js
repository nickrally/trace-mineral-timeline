import React, { createContext, useReducer, useEffect } from "react";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case "TOGGLE":
      return { ...state, editMode: !state.editMode };
    default:
      return state;
  }
}

function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Can't set localStorage");
  }
}

function getLocalStorage(key, initialValue) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    console.log("Can't get localStorage");
    return initialValue;
  }
}

const initialState = {
  editMode: false,
};

export const TimelineContext = createContext(initialState);

export default function TimelineContextProvider({ children }) {
  const initState = getLocalStorage("editMode", initialState.editMode);
  const [state, dispatch] = useReducer(reducer, { editMode: initState });
  useEffect(() => {
    //state is in the dependencies array,
    //when state is changed, which is done by the reducer, useEffect is called and setLocalStorage is called
    setLocalStorage("editMode", state.editMode);
  }, [state]);
  return (
    <TimelineContext.Provider value={{ state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  );
}
