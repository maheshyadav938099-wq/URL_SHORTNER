import { useState } from "react";
import { api } from "../services/api";
import { HiLink, HiClipboardCopy, HiCheck, HiExternalLink, HiLightningBolt, HiShieldCheck, HiClock } from "react-icons/hi";
import toast from "react-hot-toast";
import "./Home.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
        toast.success("URL shortened successfully!");
      }
    } catch (err) {
      toast.error(err.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="home-page">
      <div className="bg-grid"></div>

      <section className="hero-section">
        <div className="hero-badge">
          <HiLightningBolt />
          <span>Fast & Reliable URL Shortener</span>
        </div>

        <h1 className="hero-title">
          Make Your Links
          <br />
          <span className="hero-gradient-text">Short & Powerful</span>
        </h1>

        <p className="hero-subtitle">
          Transform long, unwieldy URLs into clean, shareable links in seconds.
          Track clicks and manage your links with ease.
        </p>

        <form className="shorten-form" onSubmit={handleShorten}>
          <div className="shorten-input-wrapper">
            <HiLink className="input-icon" />
            <input
              type="text"
              className="shorten-input"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              id="url-input"
            />
            <button
              type="submit"
              className="shorten-btn"
              disabled={loading}
              id="shorten-btn"
            >
              {loading ? <div className="spinner"></div> : "Shorten"}
            </button>
          </div>
        </form>

        {shortUrl && (
          <div className="result-card" style={{ animation: "fadeInUp 0.4s ease" }}>
            <div className="result-header">
              <HiCheck className="result-check" />
              <span>Your shortened URL is ready!</span>
            </div>
            <div className="result-url-row">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="result-url" id="short-url-link">
                {shortUrl}
                <HiExternalLink />
              </a>
              <button className="copy-btn" onClick={handleCopy} id="copy-btn">
                {copied ? <HiCheck /> : <HiClipboardCopy />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: "rgba(99, 102, 241, 0.1)" }}>
              <HiLightningBolt style={{ color: "#818cf8" }} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Generate short URLs in milliseconds with our optimized infrastructure.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: "rgba(34, 197, 94, 0.1)" }}>
              <HiShieldCheck style={{ color: "#22c55e" }} />
            </div>
            <h3>Secure & Reliable</h3>
            <p>Your links are protected with enterprise-grade security and 99.9% uptime.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: "rgba(168, 85, 247, 0.1)" }}>
              <HiClock style={{ color: "#a855f7" }} />
            </div>
            <h3>Click Analytics</h3>
            <p>Track how your links perform with built-in view history and analytics.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
