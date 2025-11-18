import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark h-fit">
    <div className="container">
      <Link className="navbar-brand" to="/">Elevate Workforce</Link>
      <div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/post-job">Post Job</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
      <div>
        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
        <Link className="btn btn-warning" to="/register">Register</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
