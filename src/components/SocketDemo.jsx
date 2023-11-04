import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SocketDemo = () => {
  const [image, setImage] = useState("");

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

      setImage("data:image/jpeg;base64," + response.image);
      // console.log(response.image);
    });

    socket.emit("msg", "Hello, server!"); // Send a message to the server

    return () => {
      socket.disconnect(); // Disconnect when the component unmounts
    };
  }, []);

  return (
    <div>
      Socket.io example
      <img src={image} alt="no image" />
    </div>
  );
};

export default SocketDemo;
