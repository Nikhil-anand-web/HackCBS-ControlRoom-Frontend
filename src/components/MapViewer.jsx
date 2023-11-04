import "./MapViewer.modules.css";
import { useArcGISMapObjects } from "../contexts/ArcGISMapObjectContext";
export default function MapViewer({ style }) {
  const { mapRef, view } = useArcGISMapObjects({ style });

  return (
    <>
      <div style={style} ref={mapRef}></div>
    </>
  );
}
