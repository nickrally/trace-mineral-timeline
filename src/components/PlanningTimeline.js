import React, { useEffect, useMemo } from "react";
import { useTimelineContext } from "./TimelineContext";
import { workItemsToTasks } from "../utils/Format";
import { useZoomContext } from "./ZoomContext";
import { useViewModelContext } from "./ViewModelContext";

import { Gantt, useGanttApiRef } from "@mineral-community/gantt";

import "./PlanningTimeline.css";

function PlanningTimeline({ projects, workItems }) {
  const ganttApiRef = useGanttApiRef();

  const {
    getZoomMinMaxLevel,
    setZoomLevelLimits,
    setZoomLevel,
    zoomConfig,
    zoomLevel,
  } = useZoomContext();

  const { selectedEnd, selectedStart } = useViewModelContext();

  useEffect(() => {
    ganttApiRef.current.setZoomLevel(zoomLevel);
  }, [ganttApiRef, zoomLevel]);

  useEffect(() => {
    const [minLevel, maxLevel] = getZoomMinMaxLevel(
      new Date(selectedStart),
      new Date(selectedEnd)
    );
    setZoomLevelLimits({ maxLevel, minLevel });
    setZoomLevel(minLevel);
  }, [getZoomMinMaxLevel, setZoomLevel, setZoomLevelLimits]);

  const { editMode } = useTimelineContext();

  const actions = useMemo(() => {
    const handleTaskClick = function (id, mode, e) {
      const task = ganttApi.getTask(id);
      console.log("task progress", task.progress);
      return false;
    };

    const handleTaskDrag = function (id, mode, e) {
      if (editMode) {
        const task = ganttApi.getTask(id);
      } else {
        console.log("Can't edit!");
      }
      return false;
    };
    return {
      onAfterTaskDrag: handleTaskDrag,
      onTaskClick: handleTaskClick,
      onParse: () => {
        ganttApiRef.current?.setZoomLevel(zoomLevel);
      },
    };
  }, []);

  const res = workItems["QueryResult"]["Results"];
  const tasks = workItemsToTasks(res);

  const config = {
    date_format: "%Y-%m-%d", //important! date_format, dateFormat did not work
    duration_unit: "day",
    zoom: zoomConfig,
  };

  return (
    <Gantt
      data={{ tasks: tasks }}
      config={config}
      actions={actions}
      apiRef={ganttApiRef}
    />
  );
}

export default PlanningTimeline;
