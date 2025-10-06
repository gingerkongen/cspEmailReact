import React from "react";
import backgroundImage from "../assets/Background.png";

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col text-xl items-center">
        <div>Home page coming soon...</div>
        <div>Use the navigation bar to start sending emails</div>
      </div>
    </div>
  );
};

export default HomePage;
