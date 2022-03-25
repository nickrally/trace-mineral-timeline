import React, { createContext, useReducer } from "react";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case "TOGGLE_MODE":
      return { editMode: !state.editMode };
    default:
      return state;
  }
}

export const TimelineContext = createContext();

const initState = {
  editMode: false,
};

export default function TimelineContextProvider({ children }) {
  const store = useReducer(reducer, initState);
  return (
    <TimelineContext.Provider value={store}>
      {children}
    </TimelineContext.Provider>
  );
}
