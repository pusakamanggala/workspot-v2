import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
    setIsScrolled(true);
  };

  return (
    <nav
      className="p-4 fixed w-full flex justify-center z-50"
      data-sal-duration="1000"
      data-sal="slide-down"
      data-sal-delay="300"
      data-sal-easing="ease-out-bounce"
    >
      <div
        className={`${
          isScrolled
            ? "bg-teal-400/80 backdrop-blur-md text-white"
            : "bg-transparent text-teal-400"
        } w-full py-5 px-8 xl:mx-24 rounded-3xl transition-colors duration-500 flex flex-col md:flex-row justify-between items-center `}
      >
        <div className="flex justify-between items-center w-full">
          <a href="/" className="text-2xl font-bold">
            WorkSpot
          </a>
          <button className="md:hidden" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={`${
                  menu
                    ? "M6 18L18 6M6 6l12 12"
                    : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                }`}
              />
            </svg>
          </button>
        </div>
        <div className={`${menu ? "flex mt-7 md:mt-0" : "hidden"} md:flex`}>
          <div className="gap-6 font-semibold flex md:flex-row flex-col w-full text-center items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "hidden" : "block hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/vacancy"
              className={({ isActive }) =>
                isActive ? "hidden" : "block hover:underline"
              }
            >
              Vacancy
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "hidden" : "block hover:underline"
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
