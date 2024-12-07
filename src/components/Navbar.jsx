import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import Hamburger from "hamburger-react";
import NavbarMenu from "./NavbarMenu";
import Search from "./Search";

export default function Navbar() {
  const {
    setId,
    setFirstname,
    firstname,
    setLastname,
    setEmail,
    setJwt,
    cartQuantity,
    authEndpoint,
    jwt,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (jwt && firstname === "") {
      const instance = axios.create({
        baseURL: authEndpoint,
        timeout: 1000,
        headers: { Authorization: "Bearer " + jwt },
      });

      instance.get("/token").then((response) => {
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setEmail(response.data.email);
        setId(response.data.id);
      });
    }
  }, [
    jwt,
    firstname,
    authEndpoint,
    setFirstname,
    setLastname,
    setEmail,
    setId,
  ]);

  const signOut = () => {
    setJwt("");
    setId("");
    setFirstname("");
    navigate("/", { replace: true });
  };

  return (
    <div className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Left Section: Hamburger + Search */}
        <div className="flex items-center space-x-4">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
          <Search />
        </div>

        {/* Center Section: Logo */}
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110">
          <Link to="/" className="hover:text-gray-700 transition">
            Shopiez
          </Link>
        </h1>

        {/* Right Section: User Profile + Cart */}
        <ul className="flex items-center space-x-6">
          {/* User Login/Profile */}
          {jwt ? (
            <div className="relative group">
              <FaRegUserCircle size={30} className="cursor-pointer" />
              <p className="text-sm text-center">{firstname}</p>
              <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-32">
                <ul className="text-sm">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </li>
                  <li
                    className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
                    onClick={signOut}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <li>
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition"
              >
                <FaRegUserCircle size={25} />
                <span className="text-sm">Login</span>
              </Link>
            </li>
          )}

          {/* Cart */}
          <li>
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-gray-900 transition"
            >
              <CgShoppingCart size={30} />
              <span className="text-sm">{cartQuantity}</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <NavbarMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className="bg-gray-100 transition-all"
        />
      )}
    </div>
  );
}
