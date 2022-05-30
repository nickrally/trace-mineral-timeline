import React, { createContext, useContext, useState } from "react";

export const ViewModelContext = createContext({});

export const useViewModelContext = () => {
  return useContext(ViewModelContext);
};

export const ViewModelContextProvider = ({ children }) => {
  const [startDate, setStartDate] = useState("2022-04-01");
  const [endDate, setEndDate] = useState("2022-12-31");

  const updateStartDate = (date) => {
    console.log("updateStartDate to:", date);
    setStartDate(date);
  };

  const updateEndDate = (date) => {
    console.log("updateEndtDate to:", date);
    setEndDate(date);
  };

  const contextProps = {
    updateEndDate,
    updateStartDate,
    startDate,
    endDate,
  };
  return (
    <ViewModelContext.Provider value={contextProps}>
      {children}
    </ViewModelContext.Provider>
  );
};
