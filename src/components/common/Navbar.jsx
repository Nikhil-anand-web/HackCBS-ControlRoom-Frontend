import React from "react";
import { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = ({ logout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  return (
    <nav
      style={{ backgroundColor: "#011222", height: "4rem" }}
      className="w-full z-10 absolute  flex items-center justify-between shadow-lg"
    >
      <div className="sidebar_icon pb-2">
        {!sidebarOpen ? (
          <div className="space-y-2 pl-3" onClick={handleSidebarOpen}>
            <span
              style={{ backgroundColor: "#a0dbe6" }}
              className="block w-8 h-1"
            ></span>
            <span
              style={{ backgroundColor: "#a0dbe6" }}
              className="block w-8 h-1"
            ></span>
            <span
              style={{ backgroundColor: "#a0dbe6" }}
              className="block w-8 h-1"
            ></span>
          </div>
        ) : (
          <>
            <div
              className="pl-5 text-xl sidebar_icon"
              onClick={handleSidebarClose}
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </div>
            <div className="sidebar_items">
              <div
                style={{ backgroundColor: "#011222" }}
                className="absolute top-20 sidebar_item "
              >
                <ul className="flex flex-col space-y-4 p-5">
                  <Link to="/maps">
                    <li className="">Home </li>
                  </Link>
                  <Link to="/AboutUs">
                    <li className="">About Us</li>
                  </Link>

                  <li onClick={logout} className="">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
      <Link to="/">
        <p
          style={{ color: "#a0dbe6" }}
          className="md:text-2xl sm:text-xl font-SpaceMono font-bold drop-shadow-glow"
        >
          Control Room
        </p>
      </Link>
      <div></div>
    </nav>
  );
};

export default Navbar;
