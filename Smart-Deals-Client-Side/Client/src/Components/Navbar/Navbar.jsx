import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/allProducts"}>AllProducts</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/myProducts"}>My Products</NavLink>
          </li>
          <li>
            <NavLink to={"/myBids"}>My Bids</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={"/auth/register"}>Register</NavLink>
      </li>
      <li>
        <NavLink to={"/auth/login"}>Login</NavLink>
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
        <NavLink to={"/"} className=" text-xl">
          Smart<span className="text-primary text-xl font-bold">Deals</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <li>
              <span className="text-gray-700">{user.displayName}</span>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="text-red-600 font-semibold hover:bg-red-50 w-full text-left px-2 py-1 rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/auth/login"
                className="text-green-600 font-semibold hover:bg-green-50 w-full block px-2 py-1 rounded"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/auth/register"
                className="text-green-700 font-semibold hover:bg-green-100 w-full block px-2 py-1 rounded"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
