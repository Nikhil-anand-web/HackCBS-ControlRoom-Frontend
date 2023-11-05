import "./MapViewer.modules.css";
import Navbar from "./common/Navbar";


import { useArcGISMapObjects } from "../contexts/ArcGISMapObjectContext";
export default function MapViewer({ style }) {
  const { mapRef } = useArcGISMapObjects({ style });

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  

  return (
    <>
      <Navbar logout={logout} />
      <div style={style} ref={mapRef}></div>
    </>
  );
}
