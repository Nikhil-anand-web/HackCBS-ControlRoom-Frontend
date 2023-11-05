import "./App.css";

import MapViewer from "../src/components/MapViewer";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./googleSignin/signIn";
import UploadForm from "./components/ThreatForm";
import AboutUs from "./Pages/AboutUs";
import UserList from "./components/UserListView";
function PrivateRoute({ children }) {
  return sessionStorage.getItem("user_id") ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/maps"
          element={
            <PrivateRoute>
              <MapViewer
                style={{
                  height: "92vh",
                  position: "absolute",
                  width: "100%",
                  zIndex: "0",
                  top: "8vh",
                }}
              />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <UploadForm />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/user" element={<UserList/>}></Route>

        <Route path="/" element={<SignIn />}></Route>
      </Routes>
    </div>
  );
}

export default App;
