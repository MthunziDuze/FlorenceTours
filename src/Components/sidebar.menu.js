import React from "react";
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

  return (
    <div className="sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100">
      <div>
        <a href="d-flex align-items-center">
          <i className="bi bi-bootstrap fs-5 me-2"></i>
          <span className="fs-4">Manage Offers</span>
        </a>
        <hr className="text-secondary mt-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
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
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <hr className="text-secondary"></hr>
        <span className="fs-4">Florence Tours</span>
      </div>
    </div>
    // <div
    //   className="d-flex flex-column flex-shrink-0 p-3 bg-light"
    //   style={{ width: "280px" }}
    // >
    //   <a
    //     href="/"
    //     className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    //   >
    //     <svg class="bi me-2" width="40" height="32">
    //       <i className="bi bi-bootstrap fs-5 me-2"></i>
    //     </svg>
    //     <span class="fs-4">Sidebar</span>
    //   </a>
    //   <hr></hr>
    //   <ul class="nav nav-pills flex-column mb-auto">
    //     <li className="nav-item">
    //       <a href="#" className="nav-link active" aria-current="page">
    //         <svg className="bi me-2" width="16" height="16">
    //           <i className="bi bi-bootstrap fs-5 me-2"></i>
    //         </svg>
    //         Home
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" class="nav-link link-dark">
    //         <svg class="bi me-2" width="16" height="16">
    //           <i className="bi bi-bootstrap fs-5 me-2"></i>
    //         </svg>
    //         Dashboard
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" class="nav-link link-dark">
    //         <svg class="bi me-2" width="16" height="16">
    //           <i className="bi bi-bootstrap fs-5 me-2"></i>
    //         </svg>
    //         Orders
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" class="nav-link link-dark">
    //         <svg class="bi me-2" width="16" height="16">
    //           <i className="bi bi-bootstrap fs-5 me-2"></i>
    //         </svg>
    //         Products
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" class="nav-link link-dark">
    //         <svg class="bi me-2" width="16" height="16">
    //           <i className="bi bi-bootstrap fs-5 me-2"></i>
    //         </svg>
    //         Customers
    //       </a>
    //     </li>
    //   </ul>
    //   <hr></hr>
    //   <div class="dropdown">
    //     <a
    //       href="#"
    //       class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
    //       id="dropdownUser2"
    //       data-bs-toggle="dropdown"
    //       aria-expanded="false"
    //     >
    //       <img
    //         src="https://github.com/mdo.png"
    //         alt=""
    //         width="32"
    //         height="32"
    //         class="rounded-circle me-2"
    //       />
    //       <strong>mdo</strong>
    //     </a>
    //     <ul
    //       class="dropdown-menu text-small shadow"
    //       aria-labelledby="dropdownUser2"
    //     >
    //       <li>
    //         <a class="dropdown-item" href="#">
    //           New project...
    //         </a>
    //       </li>
    //       <li>
    //         <a class="dropdown-item" href="#">
    //           Settings
    //         </a>
    //       </li>
    //       <li>
    //         <a class="dropdown-item" href="#">
    //           Profile
    //         </a>
    //       </li>
    //       <li>
    //         <hr class="dropdown-divider" />
    //       </li>
    //       <li>
    //         <a class="dropdown-item" href="#">
    //           Sign out
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
}
export default SidebarMenu;
