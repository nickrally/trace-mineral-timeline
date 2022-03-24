import React from "react";
import { getProjects } from "../../src/api/wsapi";
import { useQuery } from "react-query";

const WithProjects = (WrappedComponent, props) => {
  const getAllProjects = () => {
    const { data, isLoading, isFetching, isError } = useQuery(
      "projects",
      getProjects
    );

    return (
      <div>
        {isLoading ? (
          "Loading..."
        ) : isFetching ? (
          "Fetching..."
        ) : isError ? (
          "Oh noes!"
        ) : data ? (
          <WrappedComponent data={data} {...props} />
        ) : (
          "no results"
        )}
      </div>
    );
  };
  return getAllProjects;
};

export default WithProjects;
