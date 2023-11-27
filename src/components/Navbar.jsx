import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import UserProfileModal from "./UserProfileModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const { token, user } = useContext(UserContext);

  const toggleUserProfileModal = () => {
    setShowUserProfile(!showUserProfile);
  };

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

  const handleLogout = () => {
    // delete user data and token from cookies
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // reload page
    window.location.reload();
  };

  return (
    <>
      <nav
        className="py-4 fixed w-full flex justify-center z-50"
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
          } w-full py-5 px-8 xl:mx-24 mx-4 rounded-3xl transition-colors duration-500 flex flex-col md:flex-row justify-between items-center `}
        >
          <div className="flex justify-between items-center w-full">
            <a href="/" className="text-2xl font-bold">
              WorkSpot
            </a>
            <button
              className="md:hidden"
              onClick={toggleMenu}
              type="button"
              title={`${menu ? "Close Menu" : "Show Menu"}`}
            >
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
              {!token && (
                <NavLink to="/login" className="hover:underline">
                  Login
                </NavLink>
              )}
              {token && (
                <div className="flex gap-2 items-center bg-teal-500 p-1 rounded-full text-white shadow-md">
                  <button
                    className="flex items-center gap-2 hover:underline outline-none focus:outline-none"
                    onClick={toggleUserProfileModal}
                    type="button"
                    title="Profile"
                  >
                    <div className="h-7 w-7 rounded-full overflow-clip">
                      <img
                        src={user.image_url}
                        alt="profile_picture"
                        onError={(e) => {
                          e.target.src =
                            "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg";
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="whitespace-nowrap max-w-[200px] text-ellipsis truncate">
                      {user.name}
                    </h1>
                  </button>

                  <button
                    className="hover:scale-105 mr-2"
                    onClick={handleLogout}
                    type="button"
                    title="Logout"
                  >
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
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showUserProfile && (
        <UserProfileModal toggleModal={toggleUserProfileModal} />
      )}
    </>
  );
};

export default Navbar;
