import React, { useState } from "react";
import TimelineContextProvider from "./TimelineContext";
import PlanningTimeline from "./PlanningTimeline";
import { getAllItems, updateItem } from "../../src/api/wsapi";
import WithProjects from "./withProjects";
import { useQuery } from "react-query";
import Toolbar from "./Toolbar";

export default WithProjects(function TimelineWithToolbar({
  data: projectData,
}) {
  const [selectedProject, setSelectedProject] = useState({
    name: "SampleProject",
    _ref: "/project/48689019574",
  });
  const projects = projectData?.QueryResult.Results.map((project) => ({
    name: project.Name,
    _ref: project._ref.split("/v2.0")[1],
  }));

  const { data, isLoading, isFetching, isError } = useQuery(
    ["features", selectedProject._ref],
    getAllItems
  );

  const onProjectChange = (e) => {
    const proj = projects.find((project) => project.name === e.target.value);
    setSelectedProject({ ...selectedProject, ...proj });
  };

  const planningTimelineProps = {
    workItems: data,
    updateFn: updateItem,
    selectedProject: selectedProject,
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
          <Toolbar
            options={projects}
            onOptionChange={onProjectChange}
            selectedProject={selectedProject}
          />
          <PlanningTimeline {...planningTimelineProps} />
        </TimelineContextProvider>
      ) : (
        "no results"
      )}
    </div>
  );
});
