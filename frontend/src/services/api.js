const API_BASE = import.meta.env.VITE_API_URL !== undefined
  ? import.meta.env.VITE_API_URL
  : (typeof window !== "undefined" && window.location.port === "5173" ? "http://localhost:3000" : "");

export const api = {
  async register(username, email, password) {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  },

  async getProfile(token) {
    const res = await fetch(`${API_BASE}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
    return data;
  },

  async shortenUrl(redirectURL) {
    const res = await fetch(`${API_BASE}/shorturl`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ redirectURL }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to shorten URL");
    return data;
  },
};
