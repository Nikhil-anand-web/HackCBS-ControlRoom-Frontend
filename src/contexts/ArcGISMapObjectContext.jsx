import { createContext, useCallback, useContext } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView.js";
import { useEffect, useRef, useState } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Point from "@arcgis/core/geometry/Point.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import Graphic from "@arcgis/core/Graphic.js";
import esriConfig from "@arcgis/core/config.js";
import ImageMediaInfo from "@arcgis/core/popup/content/ImageMediaInfo.js";
import ImageMediaInfoValue from "@arcgis/core/popup/content/support/ImageMediaInfoValue.js";
import MediaContent from "@arcgis/core/popup/content/MediaContent.js";
import Search from "@arcgis/core/widgets/Search.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";

import Polyline from "@arcgis/core/geometry/Polyline.js";

import { useSocketData } from "./MapDataContext";

import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

import data from "../../data/data";

const ArcGISMapObjectContext = createContext();

function ArcGISMapObjectProvider({ children }) {
  esriConfig.apiKey =
    "AAPK3b27eade346a4b22be20f03a6ca4253dUVPuCpt9pF8QT6N0GwbLUuFUXjPOpJT66Z-EMT5KcpYzDi1CcqU3uXEZve3TPJxO";
  const { stat, trailState } = useSocketData();

  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [pointGraphicLayer] = useState(new GraphicsLayer());
  const [polyLineGraphicLayer] = useState(new GraphicsLayer());
  const idArrayOfDrawnThreats = useRef([]);
  const [sketchGraphicLayer, setSketchGraphicLayer] = useState(
    new GraphicsLayer()
  );
  // view?.goTo({
  //   center: [-112, 38],
  //   zoom: 12,
  // });

  const getCity = useCallback(async function (lat, long) {
    lat = Number(lat);
    long = Number(long);
    console.log(lat, long);
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=f7a0c545c48f45508a59183d230e6a0c`
    );
    const data = await res.json();
    return data;
  }, []);

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
          ymin: 9.18854,
          ymax: 35.6762,
          xmax: 139.6503,
          spatialReference: 4326,
        },
      })
    );
  }, []);
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
        color: value.color,
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

  useEffect(() => {
    view?.map.add(polyLineGraphicLayer);
    view?.map.add(pointGraphicLayer);
    view?.map.add(sketchGraphicLayer);
  }, [pointGraphicLayer, view?.map, polyLineGraphicLayer]);
  useEffect(() => {
    stat.map((spot, number) => {
      const oneDGraphic = new Graphic();
      const clickedPoint = new Point({
        x: spot.location.long,
        y: spot.location.lat,
        spatialReference: {
          wkid: 4326, // Set the desired spatial reference using the well-known ID (WKID)
        },
      });
      var symbolCircle = {
        type: "simple-marker",
        style: "path",
        path: "m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z", // Set the SVG path data here
        size: 17.5, // Adjust the size as needed
        color: "red", // Set the color
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: null,
          width: 0, // points
        },
      };

      if (!idArrayOfDrawnThreats.current.includes(spot.threatId)) {
        symbolCircle.outline.color = "green";
        symbolCircle.outline.width = 2;
        idArrayOfDrawnThreats.current = [
          ...idArrayOfDrawnThreats.current,
          spot.threatId,
        ];
      }
      console.log(idArrayOfDrawnThreats);

      const imageMediaInfoValue = new ImageMediaInfoValue({
        sourceURL: spot.image,
      });

      getCity(spot.location.lat, spot.location.long).then((data) => {
        // Create the ImageMediaInfo
        const imageElement = new ImageMediaInfo({
          title: `Threat ID-: ${spot.threatId}`,
          caption: `<u><b>latest spot</b></u> <br/> Longitude:- ${spot.location.long} <br/> Latitude:-${spot.location.lat} <br/> Address:- ${data.features[0].properties.formatted} <br/> Time:- ${spot.time}`,
          value: imageMediaInfoValue,
        });

        // Create the MediaContent
        const mediaElement = new MediaContent({
          mediaInfos: [imageElement],
        });
        const popupTemplateT = {
          content: [mediaElement],
          // actions: [loger],
        };

        oneDGraphic.geometry = clickedPoint;
        oneDGraphic.symbol = symbolCircle;
        oneDGraphic.attributes = {
          threatId: spot.threatId,
        };

        oneDGraphic.popupTemplate = popupTemplateT;

        pointGraphicLayer.add(oneDGraphic);
      });
      // var symbolCircle = {
      //   type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      //   url: spot.image,
      //   width: "25px",
      //   height: "25px",
      // };
      // var symbolCircle = {
      //   type: "simple-marker",
      //   style: "circle",
      //   color: "red",
      //   size: "10px",
      //   outline: {
      //     // autocasts as new SimpleLineSymbol()
      //     color: null,
      //     width: 0, // points
      //   },
      // };
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
        }
      }
    );
  }, [view]);

  useEffect(() => {
    const searchWidget = new Search({
      view: view,
      icon: "pins",
    });
    var expandWidgetForSearch = new Expand({
      view: view,
      content: searchWidget,
      expandIconClass: "pins",
      expandTooltip: "Expand Sketch",
      collapseTooltip: "Collapse Sketch",
    });

    view?.ui.add(expandWidgetForSearch, {
      position: "top-right",
      index: 2,
    });
    return () => view?.ui.remove(expandWidgetForSearch);
  }, [view]);

  useEffect(() => {
    var sketchWidget = new Sketch({
      view: view,
      layer: sketchGraphicLayer,
      creationMode: "union",
      icon: "annotate-tool",
    });
    var expandWidgetForSketch = new Expand({
      view: view,
      content: sketchWidget,
      expandIconClass: "esri-icon-edit",
      expandTooltip: "Expand Sketch",
      collapseTooltip: "Collapse Sketch",
    });
    view?.ui.add(expandWidgetForSketch, "top-right");
    return () => view?.ui.remove(expandWidgetForSketch);
  }, [sketchGraphicLayer, view]);

  useEffect(() => {
    let basemapGallery = new BasemapGallery({
      view: view,
      source: {
        query: {
          title: '"World Basemaps for Developers"',
        },
      },
    });
    var expandWidgetForBaseMap = new Expand({
      view: view,
      content: basemapGallery,
      expandIconClass: "esri-icon-feature-layer",
      expandTooltip: "Expand Sketch",
      collapseTooltip: "Collapse Sketch",
    });

    view?.ui.add(expandWidgetForBaseMap, {
      position: "top-right",
    });

    return () => view?.ui.remove(expandWidgetForBaseMap);
  }, [view]);
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
