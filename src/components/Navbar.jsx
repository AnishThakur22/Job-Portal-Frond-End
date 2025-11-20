import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark h-fit">
      <div className="container">
        <Link className="navbar-brand" to="/">Elevate Workforce</Link>

        <div className="d-flex align-items-center">

          {/* LEFT MENU */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* Only show when logged in */}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/post-job">Post Job</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
              </>
            )}
          </ul>

          {/* RIGHT BUTTONS */}
          <div>
            {!isAuthenticated ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                <Link className="btn btn-warning" to="/register">Register</Link>
              </>
            ) : (
              <button
                className="btn btn-danger ms-2"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
