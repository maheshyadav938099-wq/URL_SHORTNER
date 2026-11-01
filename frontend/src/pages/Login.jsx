import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiMail, HiLockClosed, HiArrowRight } from "react-icons/hi";
import toast from "react-hot-toast";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
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
            <h1>Welcome Back</h1>
            <p>Sign in to manage your shortened URLs</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label htmlFor="login-email">Email Address</label>
              <div className="auth-input-wrapper">
                <HiMail className="auth-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="login-password">Password</label>
              <div className="auth-input-wrapper">
                <HiLockClosed className="auth-input-icon" />
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading} id="login-submit-btn">
              {loading ? <div className="spinner"></div> : (
                <>
                  Sign In
                  <HiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span>Don't have an account?</span>
            <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
