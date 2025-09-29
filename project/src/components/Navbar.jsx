import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import logo from "../assets/Logo.png.avif";

import LogoutButton from "../components/LogoutButton";

const Navbar = ({ handleNavigation }) => {
  const { authToken } = useContext(AuthContext);

  return (
    <>
      {authToken ? (
        <nav
          className="fixed top-0 z-50 w-full  backdrop-blur-lg border-b
    border-neutral-700/80"
        >
          <div className="flex justify-between items-center h-17">
            <div className="flex items-center px-10">
              <img
                className="h-15 w-15 cursor-pointer"
                src={logo}
                alt="logo"
                onClick={() => handleNavigation("home")}
              />
            </div>

            <ul className="flex flex-nowrap items-center gap-8 md:gap-12">
              <li>
                <div
                  className="cursor-pointer"
                  onClick={() => handleNavigation("filter")}
                >
                  Filter recievers
                </div>
              </li>
              <li>
                <div
                  className="cursor-pointer"
                  onClick={() => handleNavigation("write")}
                >
                  Write email
                </div>
              </li>
            </ul>

            <div className="flex items-center px-10">
              <LogoutButton />
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
