import "./App.css";

import MapViewer from "../src/components/MapViewer";
import SideDisplay from "./components/Utilities/SideDisplay";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/ScreenshotButton";
import ScreenshotButton from "./components/common/ScreenshotButton";

function App() {
  return (
    <div>
      <Navbar />
      <MapViewer
        style={{
          height: "100vh",
          position: "absolute",
          width: "100%",
          zIndex: "0",
        }}
      />
      <ScreenshotButton />

      {/* <SideDisplay /> */}
    </div>
  );
}

export default App;
