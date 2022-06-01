import React, { useEffect, useMemo } from "react";
import { useTimelineContext } from "./TimelineContext";
import { workItemsToTasks } from "../utils/Format";
import { useZoomContext } from "./ZoomContext";
import { useViewModelContext } from "./ViewModelContext";

import { Gantt, useGanttApiRef } from "@mineral-community/gantt";

import { useMutation, QueryClient, useQueryClient } from "react-query";
import { updateItem } from "../api/wsapi";
import "./PlanningTimeline.css";
import moment from "moment";

//const queryClient = new QueryClient();

function PlanningTimeline({ projects, workItems }) {
  const ganttApiRef = useGanttApiRef();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(updateItem);

  const {
    getZoomMinMaxLevel,
    setZoomLevelLimits,
    setZoomLevel,
    zoomConfig,
    zoomLevel,
  } = useZoomContext();

  const { startDate, endDate } = useViewModelContext();

  useEffect(() => {
    ganttApiRef.current.setZoomLevel(zoomLevel);
  }, [ganttApiRef, zoomLevel]);

  useEffect(() => {
    const [minLevel, maxLevel] = getZoomMinMaxLevel(
      new Date(startDate),
      new Date(endDate)
    );

    setZoomLevelLimits({ maxLevel, minLevel });
    setZoomLevel(minLevel);
  }, [getZoomMinMaxLevel, setZoomLevel, setZoomLevelLimits]);

  const { editMode } = useTimelineContext();
  //console.log("editMode", editMode); //true

  const actions = useMemo(() => {
    const handleTaskClick = function (id, mode, e) {
      const task = ganttApiRef.current.getTask(id);
      console.log("task", task);
      return false;
    };

    const handleTaskDrag = async function (id, mode, e) {
      if (editMode) {
        const task = ganttApiRef.current.getTask(id);
        console.log("task", task);
        await mutateAsync({
          objectid: task.id,
          plannedstartdate: moment(task.start_date).toISOString(),
          plannedenddate: moment(task.end_date).toISOString(),
        });
        queryClient.invalidateQueries(["features", startDate, endDate]);
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
