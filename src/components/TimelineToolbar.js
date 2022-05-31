import React from "react";
import moment from "moment";
import TimeLineDateEditor from "./TimelineDateEditor";
import { useViewModelContext } from "./ViewModelContext";

const TimelineToolbar = () => {
  const { updateEndDate, updateStartDate, endDate, startDate } =
    useViewModelContext();

  //must use moment to convert date to ISOString:
  const endDatePickerProps = {
    onChange: (date) => {
      updateEndDate(moment(date).toISOString());
    },
    value: moment(endDate).toISOString(),
  };

  const startDatePickerProps = {
    onChange: (date) => {
      updateStartDate(moment(date).toISOString());
    },
    value: moment(startDate).toISOString(),
  };

  return (
    <div>
      <div id="startDatePicker">
        <TimeLineDateEditor {...startDatePickerProps} />
      </div>
      <div id="endDatePicker">
        <TimeLineDateEditor {...endDatePickerProps} />
      </div>
    </div>
  );
};

export default TimelineToolbar;
