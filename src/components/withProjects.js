import React from "react";
import { getProjects } from "../../src/api/wsapi";
import { useQuery } from "react-query";

const WithProjects = (WrappedComponent, props) => {
  const getAllProjects = () => {
    const { data, error, isLoading, isFetching, isError } = useQuery(
      "projects",
      getProjects
    );

    return <WrappedComponent data={data} {...props} />;
  };

  return getAllProjects;
};

export default WithProjects;
