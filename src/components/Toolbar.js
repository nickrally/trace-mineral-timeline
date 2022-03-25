import React, { useContext } from "react";
import { TimelineContext } from "./TimelineContext";

function Toolbar() {
  const [state, dispatch] = useContext(TimelineContext);
  const buttonText = state.editMode ? "can write" : "cannot write";
  const handleClick = () => {
    dispatch({ type: "TOGGLE_MODE" });
  };
  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
}

export default Toolbar;
