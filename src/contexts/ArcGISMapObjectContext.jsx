import { createContext, useContext } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView.js";
import { useEffect, useRef, useState } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Point from "@arcgis/core/geometry/Point.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import Graphic from "@arcgis/core/Graphic.js";
import esriConfig from "@arcgis/core/config.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";

import { useSocketData } from "./MapDataContext";

import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

import data from "../../data/data";

const ArcGISMapObjectContext = createContext();

function ArcGISMapObjectProvider({ children }) {
  esriConfig.apiKey =
    "AAPK3b27eade346a4b22be20f03a6ca4253dUVPuCpt9pF8QT6N0GwbLUuFUXjPOpJT66Z-EMT5KcpYzDi1CcqU3uXEZve3TPJxO";
  const { stat, trailState } = useSocketData();
  console.log(trailState);

  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [pointGraphicLayer] = useState(new GraphicsLayer());
  const [polyLineGraphicLayer] = useState(new GraphicsLayer());
  // const [arrayForPoints, setArrayForPoints] = useState(data());
  useEffect(() => {
    const map = new Map({
      basemap: {
        portalItem: {
          id: "90f86b329f37499096d3715ac6e5ed1f", // enhanced contrast basemap
        },
      },
      spatialReference: {
        wkid: 4326, // Set the desired spatial reference using the well-known ID (WKID)
      },
    });

    setView(
      new MapView({
        map: map,

        container: mapRef.current,
        extent: {
          xmin: 45.464664,
          ymin: 9.188540,
          ymax: 35.6762,
          xmax: 139.6503,
          spatialReference: 4326,
        },
      })
    );
  }, []);

  useEffect(() => {
    view?.map.add(polyLineGraphicLayer);
    view?.map.add(pointGraphicLayer);
  }, [pointGraphicLayer, view?.map, polyLineGraphicLayer]);
  useEffect(() => {
    stat.map((spot) => {
      const oneDGraphic = new Graphic();
      const clickedPoint = new Point({
        x: spot.location.long,
        y: spot.location.lat,
        spatialReference: {
          wkid: 4326, // Set the desired spatial reference using the well-known ID (WKID)
        },
      });

      var symbolCircle = {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        url: spot.image,
        width: "25px",
        height: "25px",
      };
      var halo = {
        type: "simple-marker",
        style: "circle",
        color: "red",
        size: "10px",
      };
      const loger = {
        title: "loger",
        id: "measure-this",
        image: "Measure_Distance16.png",
      };
      const popupTemplateT = {
        title: "NikhilAnand",
        content: `<button onClick={()=>{console.log("i am from button")}}>hello</button>`,
        actions: [loger],
      };

      const popupTemplateAttribute = {
        OBJECTID: "Nikhil",
      };
      oneDGraphic.geometry = clickedPoint;
      oneDGraphic.symbol = symbolCircle;
      oneDGraphic.attributes = popupTemplateAttribute;
      oneDGraphic.popupTemplate = popupTemplateT;

      pointGraphicLayer.add(oneDGraphic);
    });
    return () => pointGraphicLayer.removeAll();
  }, [stat, pointGraphicLayer]);

  useEffect(() => {
    reactiveUtils.on(
      () => view?.popup,
      "trigger-action",
      (event) => {
        // Execute the measureThis() function if the measure-this action is clicked
        if (event.action.id === "measure-this") {
          console.log("clicked");
        }
      }
    );
  }, [view]);

  useEffect(() => {
    for (const [key, value] of Object.entries(trailState)) {
      var polylineGraphic = new Graphic();
      var polyline = {
        type: "polyline", // autocasts as Polyline
        paths: value.trails,
        spatialReference: 4326,
      };
      var symbolA = {
        type: "simple-line", // autocasts as SimpleLineSymbol
        color: [4, 90, 141],
        width: 3,
        cap: "round",
        join: "round",
      };
      const popupTemplateT = {
        title: "{OBJECTID}",
      };

      const popupTemplateAttribute = {
        OBJECTID: "line",
      };

      polylineGraphic.geometry = polyline;
      polylineGraphic.symbol = symbolA;
      polylineGraphic.attributes = popupTemplateAttribute;
      polylineGraphic.popupTemplate = popupTemplateT;
      polyLineGraphicLayer.add(polylineGraphic);
    }
  }, [polyLineGraphicLayer, trailState]);
  console.log(view);
  return (
    <ArcGISMapObjectContext.Provider
      value={{
        view: view,
        pointGraphicLayer: pointGraphicLayer,
        polyLineGraphicLayer: polyLineGraphicLayer,
        setView: setView,
        mapRef: mapRef,
      }}
    >
      {children}
    </ArcGISMapObjectContext.Provider>
  );
}

function useArcGISMapObjects() {
  const cont = useContext(ArcGISMapObjectContext);
  if (cont === undefined) {
    throw new Error("used outside of context");
  }

  return cont;
}

export { ArcGISMapObjectProvider, useArcGISMapObjects };
