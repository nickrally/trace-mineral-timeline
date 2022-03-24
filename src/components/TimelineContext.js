import React, { createContext, useContext } from "react";

const TimelineContext = createContext({});
export const useTimelineContext = () => useContext(TimelineContext);
export default TimelineContext;
