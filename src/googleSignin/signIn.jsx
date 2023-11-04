import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import MapViewer from "../components/MapViewer";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [dataa, setDataa] = useState('')

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      sessionStorage.setItem("email", data.user.email);
      setDataa(data);
    });
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setValue(email);
    }
  }, []);

  console.log("data is: ",dataa);

  return (
    <div>
      {value ? (
        <Home/>
        // navigate("/maps")
      ) : (
        <button onClick={handleClick}>Sign in with Google</button>
      )}
    </div>
  );
};

export default SignIn;
