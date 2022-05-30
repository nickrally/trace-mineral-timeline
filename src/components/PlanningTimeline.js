import React, { useEffect } from "react";
import { useTimelineContext } from "./TimelineContext";
import { workItemsToTasks } from "../utils/Format";

import { Gantt, useGanttApiRef } from "@mineral-community/gantt";

function PlanningTimeline({ projects, workItems }) {
  const ganttApiRef = useGanttApiRef();

  useEffect(() => {
    console.log(
      "ganttApiRef?.current.gantt.config",
      ganttApiRef?.current.gantt.config
    );
    console.log(
      "duration_unit",
      ganttApiRef?.current.gantt.config.duration_unit
    );
  }, []);

  const { editMode } = useTimelineContext();

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

  const actions = {
    onAfterTaskDrag: handleTaskDrag,
    onTaskClick: handleTaskClick,
  };

  console.log("projects", projects);
  const res = workItems["QueryResult"]["Results"];
  const tasks = workItemsToTasks(res);

  const config = {
    date_format: "%Y-%m-%d", //important! date_format, dateFormat did not work
    duration_unit: "day",
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
