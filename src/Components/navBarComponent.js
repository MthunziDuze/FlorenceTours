import { Button, NavDropdown } from "react-bootstrap";
//import DropdownComponent from "./dropdownComponent";
import React, { useState } from "react";
//import { Link } from "react-router-dom";
import "./navbar.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
function NavBarComponent() {
  // const [loggedIn, setLoggedIn] = useState(false);

  // const token = localStorage.getItem("access_token");
  // if (token) {
  //   setLoggedIn(true);
  // } else {
  //   setLoggedIn(false);
  // }

  return (
    <nav
      className="navbar navbar-expand-sm bg-body-tertiary rounded"
      aria-label="Thirteenth navbar example"
    >
      <div className="container-fluid">
        <Button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>

        <div className="navbar-collapse d-sm-flex" id="navbarsExample11">
          <a className="navbar-brand col-lg-3 me-0" href="/">
            <img
              src="/images/mylogo.jpg"
              alt="nav_logo"
              width={30}
              height={30}
            />
          </a>
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item dropdown">
              <NavDropdown title="Learn More">
                <NavDropdown.Item eventKey="4.1">Contact Us</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">About Us</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.13">Vacations</NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
          <div className="d-lg-flex col-lg-3 justify-content-lg-end">
            <Button className="btn btn-secondary">Button</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavBarComponent;
