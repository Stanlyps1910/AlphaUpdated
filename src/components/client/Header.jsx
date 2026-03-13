import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path) => pathname === path;

  return (
    <header className="header">
      <div className="header-flex">
        <Link to="/">
          <div
            className="brand-container"
            style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
          >
            <img
              src="/logo.png"
              alt="Team Alpha"
              style={{ height: "60px", objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: "600",
                fontSize: "1.4rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "var(--primary)"
              }}
            >
              TEAM ALPHA
            </span>
          </div>
        </Link>

        <nav className="nav">
          <Link to="/portal" className={isActive("/portal") ? "active" : ""}>
            Home
          </Link>
          <Link to="/portal/gallery" className={isActive("/portal/gallery") ? "active" : ""}>
            Gallery
          </Link>
          <Link to="/portal/chats" className={isActive("/portal/chats") ? "active" : ""}>
            Chats
          </Link>
          <Link to="/portal/cloud" className={isActive("/portal/cloud") ? "active" : ""}>
            Cloud
          </Link>

          <div className="social-nav">
            <a
              href="https://www.instagram.com/teamalpha_crew/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="nav-icon"
              style={{ color: "var(--text-main)" }}
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://wa.me/919110603953"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="nav-icon"
              style={{ color: "#25D366" }}
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .header {
          background: var(--glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 40px;
          max-width: 1400px;
          margin: auto;
        }

        .nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .nav a {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 8px 16px;
          border-radius: var(--radius);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .nav a:hover {
          color: var(--text-main);
          background: rgba(0,0,0,0.03);
        }

        .nav a.active {
          color: var(--primary);
          background: rgba(212, 175, 55, 0.08);
          font-weight: 600;
        }

        .social-nav {
          display: flex;
          gap: 16px;
          margin-left: 12px;
          border-left: 1px solid var(--border);
          padding-left: 20px;
        }

        .nav-icon {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          opacity: 0.8;
        }

        .nav-icon:hover {
          transform: translateY(-2px);
          opacity: 1;
        }

        .nav-icon img {
            height: 18px;
            width: 18px;
        }

        @media (max-width: 768px) {
          .header-flex { padding: 12px 20px; }
          .nav { display: none; }
        }
      `}} />
    </header>
  );
}
