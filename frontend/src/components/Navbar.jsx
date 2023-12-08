import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleSearch = () => {
    navigate(prompt ? `?search=${prompt}` : "/");
  };

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useUser();

  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-6 md:px-[200px]">
        <h1 className="text-2xl font-bold">
          <Link to="/">TRENDIFY</Link>
        </h1>
        <div className="relative flex items-center">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
            placeholder="Search a post"
            type="text"
          />
          <button
            onClick={handleSearch}
            className="absolute top-0 right-0 mt-3 mr-4 text-gray-400 focus:outline-none"
          >
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <Link to="/write" className="text-lg font-medium">
              Write
            </Link>
          ) : (
            <Link to="/login" className="text-lg font-medium">
              Login
            </Link>
          )}
          {user ? (
            <div onClick={showMenu} className="relative">
              <FaBars className="text-2xl cursor-pointer" />
              {menu && <Menu />}
            </div>
          ) : (
            <Link to="/register" className="text-lg font-medium">
              Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
