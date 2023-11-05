import "./App.css";

import MapViewer from "../src/components/MapViewer";
import SideDisplay from "./components/Utilities/SideDisplay";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./googleSignin/signIn";
import { useState } from "react";

function PrivateRoute({ children }) {
  return sessionStorage.getItem("user_id") ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/maps"
          element={
            <PrivateRoute>
              <MapViewer
                style={{
                  height: "100vh",
                  position: "absolute",
                  width: "100%",
                  zIndex: "0",
                }}
              />{" "}
            </PrivateRoute>
          }
        ></Route>

        <Route path="/" element={<SignIn />}></Route>
      </Routes>
    </div>
  );
}

export default App;
