import React, { useContext } from "react";
import { TimelineContext } from "./TimelineContext";
import { workItemsToTasks } from "../utils/Format";

import { Gantt } from "@mineral-community/gantt";

function PlanningTimeline({ projects, workItems }) {
  console.log("RENDERING PlanningTimeline...");
  let ganttApi;
  const [{ editMode }] = useContext(TimelineContext);

  console.log("editMode:", editMode);

  const handleTaskClick = function (id, mode, e) {
    const task = ganttApi.getTask(id);
    console.log("task progress", task.progress);
    return false;
  };

  const handleTaskDrag = function (id, mode, e) {
    console.log("id", id);
    console.log("editMode inside handleTaskDrag:", editMode);
    if (editMode) {
      const task = ganttApi.getTask(id);
      console.log("Can edit task ok", task);
      return false;
    }
  };

  const actions = {
    onAfterTaskDrag: handleTaskDrag,
    onTaskClick: handleTaskClick,
  };

  //console.log("projects", projects);
  const res = workItems["QueryResult"]["Results"];
  const tasks = workItemsToTasks(res);

  const config = {
    date_format: "%Y-%m-%d", //important! date_format, dateFormat did not work
  };

  return (
    <Gantt
      data={{ tasks: tasks }}
      config={config}
      actions={actions}
      getGanttApi={(api) => (ganttApi = api)}
    />
  );
}

export default PlanningTimeline;
