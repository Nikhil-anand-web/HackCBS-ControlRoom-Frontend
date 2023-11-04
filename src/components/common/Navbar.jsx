import React from "react";
import { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  return (
    <nav
      style={{ backgroundColor: "#011222" }}
      className="w-full z-10 relative h-20 flex items-center justify-between shadow-lg"
    >
      <div className="sidebar_icon pb-2">
        {!sidebarOpen ? (
          <div className="space-y-2 " onClick={handleSidebarOpen}>
            <span className="block w-8 h-1 bg-gray-600"></span>
            <span className="block w-8 h-1 bg-gray-600"></span>
            <span className="block w-8 h-1 bg-gray-600"></span>
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
                <ul>
                  <li className="p-5">About Us</li>
                  <li className="p-5">Contacts Us</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      <p
        style={{ color: "#a0dbe6" }}
        className="md:text-2xl sm:text-xl font-SpaceMono font-bold drop-shadow-glow"
      >
        Control Room
      </p>
      <div></div>
    </nav>
  );
};

export default Navbar;
