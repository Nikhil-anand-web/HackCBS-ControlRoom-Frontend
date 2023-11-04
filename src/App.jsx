import "./App.css";

import MapViewer from "../src/components/MapViewer";
import SideDisplay from "./components/Utilities/SideDisplay";

function App() {
  return (
    <div>
      <MapViewer
        style={{ height: "100vh", position: "absolute", width: "100%",zIndex:"0" }}
      />
      {/* <SideDisplay /> */}
    </div>
  );
}

export default App;
