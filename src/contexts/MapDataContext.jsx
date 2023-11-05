import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import data from "../../data/data";

const MapDataContext = createContext();

function MapDataProvider({ children }) {
  const [stat, setStat] = useState(data());

  const RandomColorGenerator = useCallback(() => {
    var randomColor;

    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generate a random hexadecimal color

    return randomColor;
  }, []);

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
        color: RandomColorGenerator(),
      },
    };
    return null;
  });
  console.log(trailState);
  useEffect(() => {
    const sessionData = sessionStorage;
    console.log(sessionData.getItem("user_id"));
    const socket = io("http://127.0.0.1:8000/", {
      withCredentials: true,
      debug: true,
      reconnection: true,
      query: { user_id: sessionData.getItem("user_id") },
    });

    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("frame_processed_controller", (response) => {
      response = JSON.parse(response);
      console.log(response);
      setStat((pre) => [
        ...pre,
        { ...response, image: "data:image/jpeg;base64," + response.image },
      ]);
    });

    socket.on("connected", (response) => {
      console.log(response);
    });

    socket.emit("connect_control_room", "Hello, server!");

    window.onbeforeunload = function () {
      socket.emit("disconnect");
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
