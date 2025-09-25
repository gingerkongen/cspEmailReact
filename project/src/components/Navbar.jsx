import React, { useState } from "react";
import logo from "../assets/Logo.png.avif";
import LogoutButton from "../components/LogoutButton";

const Navbar = () => {
  return (
    <nav
      className="sticky top-0 z-50 w-full py-3 backdrop-blur-lg border-b
    border-neutral-700/80"
    >
      <div className="flex justify-between items-center px-6 h-20">
        <div className="flex items-center px-10">
          <img className="h-25 w-25" src={logo} alt="logo" />
        </div>

        <ul className="hidden lg:flex gap-80 text-3xl">
          <li>
            <a href="#filter-recievers">Filter recievers</a>
          </li>
          <li>
            <a href="#write-email">Write email</a>
          </li>
        </ul>

        <div className="flex items-center px-10">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
