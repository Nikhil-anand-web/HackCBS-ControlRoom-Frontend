import React from "react";
import ImageCard from "../components/ImageCard";
import HarshPic from "../assets/team/harsh.jpg";
import MukeshPic from "../assets/team/mukesh.jpg";
import AdityaPic from "../assets/team/aditya.jpeg";
import NikhilPic from "../assets/team/Nikhil.jpg";
import Navbar from "../components/common/Navbar";

const AboutUs = () => {
  const photos = [
    {
      id: 1,
      name: "Harsh",
      img: HarshPic,
    },
    {
      id: 2,
      name: "Mukesh",
      img: MukeshPic,
    },
    {
      id: 3,
      name: "Nikhil",
      img: NikhilPic,
    },
    {
      id: 4,
      name: "Aditya",
      img: AdityaPic,
    },
  ];

  return (
    <>
      <Navbar style={{ marginTop: "8vh" }} />
      <div
        style={{ backgroundColor: "#011222", color: "#a0dbe6" }}
        className="w-full flex flex-col items-center justify-center pt-10"
      >
        <div className="w-11/12 mt-10 flex flex-col items-center justify-center">
          {/* heading div */}
          <div className="text-center w-11/12 font-serif h-auto text-6xl font-extrabold overflow-hidden">
            Meet The Developers
          </div>

          {/* info div */}
          <div className="md:w-6/12 sm:w-full sm:mt-4 text-lg font-Roborto opacity-80 text-center">
            {`"At MDU Rohtak, we are a dedicated team of aspiring engineers pursuing 
          our B.Tech in Computer Science and Engineering. With a passion for technology
           and innovation, we embarked on our journey to create cutting-edge solutions.
            Leveraging the power of different technology including  React, Esri ArcGIS,Firebase,Flask,OpenCV,SocketIO,TailwindCSS.
             We've developed applications that push boundaries and redefine user experiences.
              Our mission is to continually learn, grow, and contribute to the ever-evolving 
              field of technology while striving for excellence in every project we undertake."`}
          </div>

          {/* Image cards */}

          <div className=" w-9/12 mt-10 gap-y-10 flex flex-row items-center justify-center gap-x-32 flex-wrap overflow-hidden">
            {photos.map((data) => (
              <ImageCard key={data.id} data={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
