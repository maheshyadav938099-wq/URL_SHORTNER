import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { HiLink, HiClipboardCopy, HiCheck, HiExternalLink, HiUser, HiMail, HiCalendar } from "react-icons/hi";
import toast from "react-hot-toast";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = "https://" + finalUrl;
    }

    setLoading(true);
    setShortUrl("");
    setCopied(false);

    try {
      const data = await api.shortenUrl(finalUrl);
      const match = data.message.match(/http\S+/);
      if (match) {
        setShortUrl(match[0]);
        setHistory((prev) => [
          { original: finalUrl, short: match[0], createdAt: new Date().toLocaleString() },
          ...prev,
        ]);
        toast.success("URL shortened!");
      }
      setUrl("");
    } catch (err) {
      toast.error(err.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      toast.success("Copied!");
      setTimeout(() => setCopied(""), 2500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="dashboard-page">
      <div className="bg-grid"></div>

      <div className="dashboard-content" style={{ animation: "fadeInUp 0.5s ease" }}>
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="profile-info">
            <h2>{user?.username || "User"}</h2>
            <div className="profile-detail">
              <HiMail />
              <span>{user?.email || "email@example.com"}</span>
            </div>
            {user?.createdAt && (
              <div className="profile-detail">
                <HiCalendar />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            )}
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{history.length}</span>
              <span className="stat-label">Links Created</span>
            </div>
          </div>
        </div>

        {/* Shorten Card */}
        <div className="dash-shorten-card">
          <h3 className="dash-card-title">
            <HiLink />
            Shorten a URL
          </h3>
          <form className="dash-shorten-form" onSubmit={handleShorten}>
            <div className="dash-input-wrapper">
              <input
                type="text"
                className="dash-input"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                id="dash-url-input"
              />
              <button
                type="submit"
                className="dash-shorten-btn"
                disabled={loading}
                id="dash-shorten-btn"
              >
                {loading ? <div className="spinner"></div> : "Shorten"}
              </button>
            </div>
          </form>

          {shortUrl && (
            <div className="dash-result" style={{ animation: "fadeInUp 0.35s ease" }}>
              <div className="dash-result-header">
                <HiCheck />
                <span>Shortened successfully!</span>
              </div>
              <div className="dash-result-row">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="dash-result-url">
                  {shortUrl}
                  <HiExternalLink />
                </a>
                <button className="dash-copy-btn" onClick={() => handleCopy(shortUrl)}>
                  {copied === shortUrl ? <HiCheck /> : <HiClipboardCopy />}
                  {copied === shortUrl ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="history-card">
            <h3 className="dash-card-title">
              <HiCalendar />
              Recent Links
            </h3>
            <div className="history-list">
              {history.map((item, idx) => (
                <div className="history-item" key={idx}>
                  <div className="history-item-left">
                    <a href={item.short} target="_blank" rel="noopener noreferrer" className="history-short">
                      {item.short}
                      <HiExternalLink />
                    </a>
                    <span className="history-original">{item.original}</span>
                  </div>
                  <div className="history-item-right">
                    <span className="history-date">{item.createdAt}</span>
                    <button className="history-copy-btn" onClick={() => handleCopy(item.short)}>
                      {copied === item.short ? <HiCheck /> : <HiClipboardCopy />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
