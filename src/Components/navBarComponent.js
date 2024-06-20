import { Button, NavDropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./navbar.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

function NavBarComponent(props) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    console.log("Inside Nav Bar....");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn, token]);

  const logout = () => {
    userService
      .logout()
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("access_token");
        //navigate(0);
        return navigate("/login");
      })
      .catch((err) => {
        console.log("err logging Out: ", err);
      });

    setLoggedIn(false);
  };

  return (
    <nav
      className="navbar navbar-expand-sm bg-body-tertiary rounded"
      aria-label="Florence Tours NavBar"
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
              <a
                className="nav-link active"
                aria-current="page"
                href="/dashboard/userdash"
              >
                Dashboard
              </a>
            </li>
            {!loggedIn ? (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            ) : null}
            <li className="nav-item dropdown">
              <NavDropdown title="Learn More">
                <NavDropdown.Item eventKey="4.1" href="/contact-us">
                  Contact Us
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2" href="/about-us">
                  About Us
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.13">Vacations</NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
          <div className="d-lg-flex col-lg-3 justify-content-lg-end">
            {loggedIn ? (
              <Button className="btn btn-secondary" onClick={logout}>
                Logout
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavBarComponent;
