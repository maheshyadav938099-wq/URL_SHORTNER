import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
      }}>
        <div className="spinner" style={{ width: 32, height: 32 }}></div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
      }}>
        <div className="spinner" style={{ width: 32, height: 32 }}></div>
      </div>
    );
  }
  return user ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(26, 26, 46, 0.95)",
              color: "#f0f0f5",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              backdropFilter: "blur(20px)",
              fontSize: "0.9rem",
              fontWeight: "500",
              padding: "12px 20px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
            },
            success: {
              iconTheme: { primary: "#22c55e", secondary: "#0a0a0f" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#0a0a0f" },
            },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
