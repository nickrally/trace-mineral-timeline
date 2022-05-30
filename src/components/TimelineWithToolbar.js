import React from "react";
import TimelineContext from "./TimelineContext";
import PlanningTimeline from "./PlanningTimeline";
import { getAllItems } from "../../src/api/wsapi";
import { useQuery } from "react-query";
import withProject from "./withProjects";
import { ZoomContextProvider } from "./ZoomContext";

export default withProject(function TimelineWithToolbar(props) {
  console.log("props", props);
  const projectsData = props.data;
  const editMode = true;

  const { data, error, isLoading, isFetching, isError } = useQuery(
    "features",
    getAllItems
  );

  const timelineContextProps = {
    editMode,
  };

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
        <TimelineContext.Provider value={timelineContextProps}>
          <ZoomContextProvider>
            <PlanningTimeline {...planningTimelineProps} />
          </ZoomContextProvider>
        </TimelineContext.Provider>
      ) : (
        "no results"
      )}
    </div>
  );
});
