import React, { useRef } from "react";
const Dropdown = ({ options, onOptionChange, selectedProject }) => {
  const dropdownRef = useRef(null);
  return (
    <>
      <label htmlFor="projectlist">Select:</label>
      <select
        id="projectlist"
        onChange={onOptionChange}
        ref={dropdownRef}
        value={selectedProject.name}
      >
        {options.map((item) => (
          <option key={item._ref}>{item.name}</option>
        ))}
      </select>
    </>
  );
};
export default Dropdown;
