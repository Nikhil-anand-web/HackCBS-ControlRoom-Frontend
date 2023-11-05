import React from "react";
import { auth, provider } from "./config"; // Make sure your Firebase config is set up correctly
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        sessionStorage.setItem("user_id", data.user.uid);
        navigate("/maps");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Sign-In Error:", error);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="p-8 w-6/12 h-96 bg-white flex flex-col items-center justify-center rounded-lg shadow-md">
        <h1 className="text-2xl mb-4 font-semibold">Central Intelligence</h1>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
