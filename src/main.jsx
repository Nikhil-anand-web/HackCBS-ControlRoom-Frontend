import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ArcGISMapObjectProvider } from "../src/contexts/ArcGISMapObjectContext.jsx";
import { MapDataProvider } from "./contexts/MapDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MapDataProvider>
    <ArcGISMapObjectProvider>
      <App />
    </ArcGISMapObjectProvider>
  </MapDataProvider>
);