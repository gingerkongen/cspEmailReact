import React from "react";

import backgroundImage from "../assets/Background.png";

import Navbar from "../components/NavBar";

const HomePage = () => {
  return (
    <div
      className="min-h-screen   bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
    </div>
  );
};

export default HomePage;
