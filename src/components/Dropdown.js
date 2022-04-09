import React, { Fragment, useRef, useEffect } from "react";
const Dropdown = ({ options, onOptionChange }) => {
  const dropdownRef = useRef(null);
  /*   useEffect(() => {
    console.log("inside useEffect:", dropdownRef.current.value);
    onFirstLoad(dropdownRef.current.value);
  }, [onFirstLoad]); */
  return (
    <Fragment>
      <label htmlFor="projectlist">Select:</label>
      <select id="projectlist" onChange={onOptionChange} ref={dropdownRef}>
        {options.map((item) => (
          <option key={item._ref} value={item._ref}>
            {item.name}
          </option>
        ))}
      </select>
    </Fragment>
  );
};
export default Dropdown;
