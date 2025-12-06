import React from "react";
import Logo from "../../../Component/logo/logo";
import { NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import { MdOutlineArrowOutward } from "react-icons/md";
import Loading from "../../../Component/Loading";

const Navbar = () => {
  const { user, userLogout, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  const handleLogout = () => {
    userLogout()
      .then()
      .catch((err) => {
        console.log(err.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink>Service</NavLink>
      </li>

      <li>
        <NavLink to={"/send-parcel"}>Send Parcel </NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage Areas</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink>About Us </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Logo></Logo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <Link onClick={handleLogout} className="btn">
            {" "}
            Log out
          </Link>
        ) : (
          <Link to={"login"}> Login</Link>
        )}

        <div className="flex items-center mx-4 gap-3">
          <Link
            to={"/rider"}
            className="bg-primary cursor-pointer p-1 px-2  rounded-sm font-bold"
          >
            Be a rider
          </Link>
          <div className="w-8 h-8 bg-black rounded-full  flex justify-center items-center ">
            <MdOutlineArrowOutward className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
