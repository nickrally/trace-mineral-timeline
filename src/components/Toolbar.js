import React from "react";
import { useTimelineContext } from "./TimelineContext";

function Toolbar() {
  const { editMode } = useTimelineContext();
  const buttonText = editMode ? "can write" : "cannot write";
  return (
    <div>
      <button>{buttonText}</button>
    </div>
  );
}

export default Toolbar;
