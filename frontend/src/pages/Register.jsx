import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiMail, HiLockClosed, HiUser, HiArrowRight } from "react-icons/hi";
import toast from "react-hot-toast";
import "./Auth.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register(username, email, password);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="bg-grid"></div>
      <div className="auth-container" style={{ animation: "fadeInUp 0.5s ease" }}>
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Start shortening your URLs today</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label htmlFor="register-username">Username</label>
              <div className="auth-input-wrapper">
                <HiUser className="auth-input-icon" />
                <input
                  id="register-username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="register-email">Email Address</label>
              <div className="auth-input-wrapper">
                <HiMail className="auth-input-icon" />
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="register-password">Password</label>
              <div className="auth-input-wrapper">
                <HiLockClosed className="auth-input-icon" />
                <input
                  id="register-password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading} id="register-submit-btn">
              {loading ? <div className="spinner"></div> : (
                <>
                  Create Account
                  <HiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
