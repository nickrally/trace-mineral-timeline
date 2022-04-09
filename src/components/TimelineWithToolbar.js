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
  //console.log("Projects", data?.QueryResult.Results);
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
    const proj = projects.find((project) => project._ref === e.target.value);
    setSelectedProject({ name: proj.name, _ref: proj._ref });
    console.log("selectedProject", selectedProject);
  };

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
          <Toolbar
            options={projects}
            onOptionChange={onProjectChange}
            onFirstLoad={setSelectedProject}
          />
          <PlanningTimeline {...planningTimelineProps} />
        </TimelineContextProvider>
      ) : (
        "no results"
      )}
    </div>
  );
});
