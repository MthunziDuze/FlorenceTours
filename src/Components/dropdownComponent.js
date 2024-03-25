import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
function DropdownComponent() {
  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Home</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Our Services</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Contact us</Dropdown.Item>
        <Dropdown.Item href="#/action-3">About us</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownComponent;
