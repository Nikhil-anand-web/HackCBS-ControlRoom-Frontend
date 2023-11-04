import "./App.css";

import MapViewer from "../src/components/MapViewer";
import SideDisplay from "./components/Utilities/SideDisplay";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./googleSignin/Home";
import SignIn from "./googleSignin/signIn";
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/maps"
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
        ></Route>

        <Route path="login" element={<SignIn/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
