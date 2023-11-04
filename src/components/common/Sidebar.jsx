import React from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <h2>Sidebar Content</h2>
        <p>Here is some content for your sidebar.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Sidebar;
