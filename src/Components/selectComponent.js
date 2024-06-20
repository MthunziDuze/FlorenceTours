import React, { useState } from "react";

const CustomSelect = ({ options, onchange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onchange) {
      onchange(newValue);
    }
  };

  return (
    <select value={selectedValue} onchange={handleSelectChange}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
