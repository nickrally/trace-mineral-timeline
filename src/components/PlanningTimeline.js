import React, { useContext, useRef } from "react";
import { TimelineContext } from "./TimelineContext";
import { workItemsToTasks } from "../utils/Format";

import { Gantt } from "@mineral-community/gantt";

function PlanningTimeline({ workItems, updateFn }) {
  let { current: ganttApi } = useRef();
  const setGanttApi = (api) => {
    ganttApi = api;
  };

  const { state } = useContext(TimelineContext);
  const editMode = state.editMode;

  console.log("RENDERING PlanningTimeline...editMode:", editMode);
  const randomValue = Math.random();
  const handleTaskDrag = function (id, mode, e) {
    console.log("editMode inside handleTaskDrag:", editMode);
    if (editMode) {
      const task = ganttApi.getTask(id);
      const payload = {
        objectid: id,
        PlannedStartDate: new Date(task.start_date).toISOString().split("T")[0],
      };
      updateFn(payload);
      return true;
    }
    console.log("whatever", randomValue);
  };

  const actions = {
    onAfterTaskDrag: handleTaskDrag,
  };

  const res = workItems["QueryResult"]["Results"];
  const tasks = workItemsToTasks(res);

  const config = {
    datagrid: {
      columns: [
        {
          name: "text",
          label: " ",
          tree: true,
          width: "*",
        },
        {
          align: "left",
          label: "Progress",
          name: "progress",
          width: 120,
        },
      ],
    },
    date_format: "%Y-%m-%d",
    end_date: "2022-09-01",
    grid_elastic_columns: true,
    readonly: !editMode,
    start_date: "2022-03-01",
  };

  return (
    <Gantt
      data={{ tasks: tasks }}
      config={config}
      actions={actions}
      getGanttApi={setGanttApi}
    />
  );
}

export default PlanningTimeline;
