import { Button, Container, Navbar } from "react-bootstrap";
import DropdownComponent from "./dropdownComponent";
import React from "react";
function NavBarComponent() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="container-flued">
          <div className="collapse navbar-collapse" id="navbarButton">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-bar-brand" href="/">
                  <img
                    src="/images/mylogo.jpg"
                    alt="nav_logo"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
              <li className="nav-item">
                <DropdownComponent></DropdownComponent>
              </li>
            </ul>
            <div className="d-flex align-items-right">
              <Button as="Link" to="/login">
                Login
              </Button>
              <Button
                data-mdb-ripple-init
                type="button"
                className="btn btn-primary me-3"
              >
                Sign up for free
              </Button>
              <a
                data-mdb-ripple-init
                className="btn btn-dark px-3"
                href="/images/mylogo.jpg"
                role="button"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBarComponent;
