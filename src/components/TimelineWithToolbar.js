import React, { useEffect } from "react";
import TimelineContext from "./TimelineContext";
import PlanningTimeline from "./PlanningTimeline";
import { getAllItems } from "../../src/api/wsapi";
import { useQuery } from "react-query";
import withProject from "./withProjects";
import TimelineToolbar from "./TimelineToolbar";
import { ZoomContextProvider } from "./ZoomContext";
import { useViewModelContext } from "./ViewModelContext";

export default withProject(function TimelineWithToolbar(props) {
  const projectsData = props.data;
  const editMode = true;

  const { startDate, endDate } = useViewModelContext();

  const { data, error, isLoading, isFetching, isError } = useQuery(
    ["features", startDate, endDate],
    () => getAllItems("features", startDate, endDate)
  );

  const timelineContextProps = {
    editMode,
  };

  const planningTimelineProps = {
    projects: projectsData,
    workItems: data,
  };

  useEffect(() => {
    console.log("PlanningTimeline mounted");
    return () => console.log("Planning timeline unmounted");
  }, []);
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
            <TimelineToolbar />
            <PlanningTimeline {...planningTimelineProps} />
          </ZoomContextProvider>
        </TimelineContext.Provider>
      ) : (
        "no results"
      )}
    </div>
  );
});
