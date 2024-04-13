import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown.js";
import "./sidebar.stylig.css";
function SidebarMenu() {
  const sidebarData = [
    {
      title: "Locations",
      path: "location",
      icon: "bi bi-speedometer2 me-2",
      className: "nav-item p-1",
    },
    {
      title: "Offer",
      path: "offer",
      icon: "bi bi-speedometer2 me-2",
      className: "nav-item p-1",
    },
    {
      title: "vacation",
      path: "vacation",
      icon: "bi bi-grid me-2",
      className: "nav-item p-1",
    },
    {
      title: "activity",
      path: "activity",
      icon: "bi bi-grid me-2",
      className: "nav-item p-1",
    },
  ];

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100">
      <div>
        <a href="d-flex align-items-center">
          <i className="bi bi-bootstrap fs-5 me-2"></i>
          <span className="fs-4">Manage Offers</span>
        </a>
        <hr className="text-secondary mt-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          {/* <li className="nav-item p-1">
            <a
              href="/activities"
              className="nav-link text-white fs-5"
              aria-current="page"
            >
              <i className="bi bi-grid me-2"></i>
              <span className="fs-5">Activities</span>
            </a>
          </li> */}
          {sidebarData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <a
                  href={item.path}
                  className="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className={item.icon} />
                  <span className="fs-5">{item.title}</span>
                </a>
                {/* <Link to={item.path}>
                  <span className="fs-5">{item.title}</span>
                </Link> */}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <hr className="text-secondary"></hr>

        <i className="bi bi-person fs-5"></i>
        <span className="fs-4">YourSelf</span>
      </div>
    </div>
  );
}
export default SidebarMenu;
