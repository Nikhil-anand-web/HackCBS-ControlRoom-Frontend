import "./MapViewer.modules.css";
import { useArcGISMapObjects } from "../contexts/ArcGISMapObjectContext";
export default function MapViewer({ style }) {
  const { mapRef, view } = useArcGISMapObjects({ style });

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="w-full">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring focus:ring-blue-300"
        onClick={logout}
      >
        Logout
      </button>
      <div style={style} ref={mapRef}></div>
    </div>
  );
}
