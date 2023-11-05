import "./App.css";

import MapViewer from "../src/components/MapViewer";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MapViewer
              style={{
                height: "100vh",
                position: "absolute",
                width: "100%",
                zIndex: "0",
              }}
            />
          }
        />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>

      {/* <SideDisplay /> */}
    </div>
  );
}

export default App;
