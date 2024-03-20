import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink className="navbar-brand">Attendance Portal</NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className=" nav-link custom-color">{auth?.user?.name}</li>

              <li className="nav-item">
                <NavLink
                  to={`dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="nav-link active"
                  aria-current="page"
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className="nav-link text-danger "
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
