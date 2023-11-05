import React, { useState } from "react";
import "./ScreenshotButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";

const ScreenshotButton = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="sidebar">
      {!sidebarOpen ? (
        <div className="sidebar_icon rounded" onClick={handleSidebarOpen}>
          <FontAwesomeIcon icon={faCamera} />
        </div>
      ) : (
        <>
          <div
            className="sidebar_icon rounded mb-1"
            onClick={handleSidebarClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <div className="sidebar_items rounded">
            <div className="pl-4 pt-3 sidebar_item">
              <FontAwesomeIcon className="mr-2" icon={faCamera} />
              <p>Take Screenshot</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ScreenshotButton;
