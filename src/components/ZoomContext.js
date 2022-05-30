import React, { createContext, useContext, useState } from "react";

const ZoomContext = createContext({});

export const useZoomContext = () => useContext(ZoomContext);

export const zoomConfig = {
  levels: [
    {
      name: "days-50",
      min_column_width: 50,
      scales: [
        { unit: "month", format: "%F %Y", step: 1 },
        { unit: "day", format: "%d", step: 1 },
      ],
    },
    {
      name: "days-100",
      min_column_width: 100,
      scales: [
        { unit: "month", format: "%F %Y", step: 1 },
        { unit: "day", format: "%d", step: 1 },
      ],
    },
    {
      name: "days-200",
      min_column_width: 200,
      scales: [{ unit: "day", format: "%d %F %Y", step: 1 }],
    },
  ],
};

export const MAX_ZOOM_LEVEL = zoomConfig.levels.length - 1;

const INITIAL_ZOOM_LEVEL = 0;
const INITIAL_ZOOM_LEVEL_LIMITS = {
  maxLevel: MAX_ZOOM_LEVEL,
  minLevel: 0,
};

export default ZoomContext;

function findLevelByName(name) {
  return zoomConfig.levels.findIndex((level) => level.name === name);
}

function getZoomMinMaxLevel(startDate, endDate) {
  const minLevel = findLevelByName("days-50");
  const maxLevel = findLevelByName("days-200");
  return [minLevel, maxLevel];
}

export const ZoomContextProvider = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM_LEVEL);
  const [zoomLevelLimits, setZoomLevelLimits] = useState(
    INITIAL_ZOOM_LEVEL_LIMITS
  );
  const value = {
    zoomLevel,
    setZoomLevel,
    zoomLevelLimits,
    setZoomLevelLimits,
    zoomConfig,
    getZoomMinMaxLevel,
  };
  return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>;
};
