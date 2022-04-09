import React, { useContext } from "react";
import { TimelineContext } from "./TimelineContext";
import Dropdown from "./Dropdown";

function Toolbar({ options, onOptionChange, onFirstLoad }) {
  const { state, dispatch } = useContext(TimelineContext);
  const buttonText = state.editMode ? "Click to read only" : "Click to edit";
  const modeText = state.editMode
    ? "Current Mode: EDIT"
    : "Current Mode: READ ONLY";
  const handleClick = () => {
    dispatch({ type: "TOGGLE" });
  };
  return (
    <>
      <Dropdown
        options={options}
        onOptionChange={onOptionChange}
        onFirstLoad={onFirstLoad}
      />
      <div>
        <p>{modeText}</p>
        <button onClick={handleClick}>{buttonText}</button>
      </div>
    </>
  );
}

export default Toolbar;
