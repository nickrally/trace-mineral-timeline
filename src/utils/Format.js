const caclulateDuration = (start, end) => {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);
  return diffInDays;
};

export const workItemsToTasks = (workItems) => {
  return workItems.map((workItem) => ({
    start_date: workItem.PlannedStartDate.split("T")[0],
    id: workItem.ObjectID,
    text: workItem.Name,
    duration: caclulateDuration(
      workItem.PlannedStartDate.split("T")[0],
      workItem.PlannedEndDate.split("T")[0]
    ),
    progress: workItem.PercentDoneByStoryPlanEstimate,
    //parent: "1",
  }));
};
