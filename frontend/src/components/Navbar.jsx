import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiLink, HiMenu, HiX, HiUser, HiLogout, HiLogin } from "react-icons/hi";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
          <div className="brand-icon">
            <HiLink />
          </div>
          <span className="brand-text">Snip<span className="brand-accent">Link</span></span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
              <div className="nav-user-section">
                <div className="nav-user-badge">
                  <HiUser />
                  <span>{user.username}</span>
                </div>
                <button className="nav-btn-logout" onClick={handleLogout}>
                  <HiLogout />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth-btns">
              <Link
                to="/login"
                className={`nav-link ${isActive("/login") ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                <HiLogin />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="nav-btn-register"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
    </nav>
  );
}
