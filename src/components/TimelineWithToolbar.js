import React from "react";
import TimelineContextProvider from "./TimelineContext";
import PlanningTimeline from "./PlanningTimeline";
import { getAllItems, updateItem } from "../../src/api/wsapi";
import WithProjects from "./withProjects";
import { useQuery } from "react-query";
import Toolbar from "./Toolbar";

export default WithProjects(function TimelineWithToolbar(props) {
  console.log("Projects", props);
  const { data, isLoading, isFetching, isError } = useQuery(
    "features",
    getAllItems
  );

  const planningTimelineProps = {
    workItems: data,
    updateFn: updateItem,
  };

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : isFetching ? (
        "Fetching..."
      ) : isError ? (
        "Oh noes!"
      ) : data ? (
        <TimelineContextProvider>
          <Toolbar />
          <PlanningTimeline {...planningTimelineProps} />
        </TimelineContextProvider>
      ) : (
        "no results"
      )}
    </div>
  );
});
