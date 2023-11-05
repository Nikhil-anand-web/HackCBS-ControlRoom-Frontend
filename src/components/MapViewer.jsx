import "./MapViewer.modules.css";
import Navbar from "./common/Navbar";
import ScreenshotButton from "./common/ScreenshotButton";
import { useArcGISMapObjects } from "../contexts/ArcGISMapObjectContext";
export default function MapViewer({ style }) {
  const { mapRef, view } = useArcGISMapObjects({ style });

  return (
    <>
      <Navbar />
      <div style={style} ref={mapRef}></div>
      <ScreenshotButton />
    </>
  );
}
