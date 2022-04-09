import React, { useContext, useRef, useEffect } from "react";
import { TimelineContext } from "./TimelineContext";
import { workItemsToTasks } from "../utils/Format";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Gantt } from "@mineral-community/gantt";

function PlanningTimeline({ workItems, updateFn, selectedProject }) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(updateFn, [
    "features",
    selectedProject._ref,
  ]);
  let { current: ganttApi } = useRef();
  const setGanttApi = (api) => {
    ganttApi = api;
    console.log("ganttApit", ganttApi.gantt.config);
  };

  useEffect(() => {
    ganttApi.gantt.config.duration_unit === "day";
    console.log("ganttApit duration_unit", ganttApi.gantt.config.duration_unit);
  });

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
        PlannedEndDate: new Date(task.end_date).toISOString().split("T")[0],
      };
      mutateAsync(payload);
      queryClient.invalidateQueries(["features", selectedProject._ref]);
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
    zoom: {
      levels: [[{ unit: "day", format: `%M %Y`, step: 1 }]],
    },
  };

  return (
    <>
      <Gantt
        data={{ tasks: tasks }}
        config={config}
        actions={actions}
        getGanttApi={setGanttApi}
      />
      {res.map((item) => (
        <li key={item.ObjectID}>
          "Name:" {item.Name} "StartDate:" {item.PlannedStartDate} "EndDate:"
          {item.PlannedEndDate}
        </li>
      ))}
    </>
  );
}

export default PlanningTimeline;
