import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import data from "../../data/data";

const MapDataContext = createContext();

function MapDataProvider({ children }) {
  const [stat, setStat] = useState(data());

  var trailState = {};
  stat.map((obj) => {
    trailState = {
      ...trailState,
      [obj.threatId]: {
        ...trailState[obj.threatId],
        trails: trailState[obj.threatId]
          ? [
              ...trailState[obj.threatId].trails,
              [obj.location.long, obj.location.lat],
            ]
          : [[obj.location.long, obj.location.lat]],
      },
    };
    return null;
  });

  useEffect(() => {
    const sessionData = sessionStorage;
    console.log(sessionData.getItem("user_id"));
    const socket = io("https://qhp6cf8t-8000.inc1.devtunnels.ms/", {
      withCredentials: true,
      debug: true,
      reconnection: true,
      query: { user_id: sessionData.getItem("user_id") },
    });

    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("reply", (response) => {
      response = JSON.parse(response);

      setStat((pre) => [...pre, { ...response,image:"data:image/jpeg;base64,"+response.image }]);
    });

    socket.emit("msg", "Hello, server!"); // Send a message to the server

    return () => {
      socket.disconnect(); // Disconnect when the component unmounts
    };
  }, []);
  console.log();

  return (
    <MapDataContext.Provider value={{ stat, trailState }}>
      {children}
    </MapDataContext.Provider>
  );
}

function useSocketData() {
  const cont = useContext(MapDataContext);
  if (cont === undefined) {
    throw new Error("outside of context");
  }

  return cont;
}

export { MapDataProvider, useSocketData };
