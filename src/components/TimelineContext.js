import React, { createContext, useReducer } from "react";

export const TimelineContext = createContext();

const initState = {
  editMode: false,
};

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case "TOGGLE_MODE": {
      return {
        editMode: !state.editMode,
      };
    }
    default:
      return state;
  }
}
export default function TimelineContextProvider({ children }) {
  const store = useReducer(reducer, initState);
  console.log("store", store);
  return (
    <TimelineContext.Provider value={store}>
      {children}
    </TimelineContext.Provider>
  );
}
