import React, { useState, useEffect, useMemo } from "react";
import { useTimelineContext } from "./TimelineContext";
import { workItemsToTasks } from "../utils/Format";
import { useZoomContext } from "./ZoomContext";

import { Gantt, useGanttApiRef } from "@mineral-community/gantt";

function PlanningTimeline({ projects, workItems }) {
  const ganttApiRef = useGanttApiRef();
  const [currentZoom, setCurrentZoom] = useState("Days");

  const {
    getZoomMinMaxLevel,
    setZoomLevelLimits,
    setZoomLevel,
    zoomConfig,
    zoomLevel,
  } = useZoomContext();

  useEffect(() => {
    ganttApiRef.current.setZoomLevel(zoomLevel);
  }, [ganttApiRef, zoomLevel]);

  useEffect(() => {
    const selectedStart = "05/01/2022";
    const selectedEnd = "12/31/2022";
    const [minLevel, maxLevel] = getZoomMinMaxLevel(
      new Date(selectedStart),
      new Date(selectedEnd)
    );
    setZoomLevelLimits({ maxLevel, minLevel });
    setZoomLevel(minLevel);
  }, [getZoomMinMaxLevel, setZoomLevel, setZoomLevelLimits]);

  /* useEffect(() => {
    console.log(
      "ganttApiRef?.current.gantt.config",
      ganttApiRef?.current.gantt.config
    );
    console.log(
      "duration_unit",
      ganttApiRef?.current.gantt.config.duration_unit
    );
  }, []); */

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
        console.log("task", task);
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

  console.log("projects", projects);
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
      zoom={currentZoom}
    />
  );
}

export default PlanningTimeline;
