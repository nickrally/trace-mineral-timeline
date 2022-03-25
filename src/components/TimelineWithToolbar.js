import React from "react";
import TimelineContextProvider from "./TimelineContext";
import PlanningTimeline from "./PlanningTimeline";
import { getAllItems } from "../../src/api/wsapi";
import { useQuery } from "react-query";
import withProjects from "./withProjects";
import Toolbar from "./Toolbar";

export default withProjects(function TimelineWithToolbar(props) {
  const projectsData = props.data;

  const { data, isLoading, isFetching, isError } = useQuery(
    "features",
    getAllItems
  );

  const planningTimelineProps = {
    projects: projectsData,
    workItems: data,
  };

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : isFetching ? (
        "Fetching..."
      ) : isError ? (
        "Oh noes!"
      ) : data && projectsData ? (
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
