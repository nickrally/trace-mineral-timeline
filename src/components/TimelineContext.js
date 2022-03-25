import React, { createContext, useContext } from "react";

const TimelineContext = createContext({ editMode: false });
export const useTimelineContext = () => useContext(TimelineContext);
export default TimelineContext;
