import React from "react";
import backgroundImage from "../assets/Background.png";

const HomePage = () => {
  return (
    <div
      className="min-h-screen   bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};

export default HomePage;
