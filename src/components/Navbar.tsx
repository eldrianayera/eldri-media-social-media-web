import { MenuIcon, X, Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const linkStyle = (path: string): React.CSSProperties => ({
    fontFamily: FONT,
    fontSize: "16px",
    fontWeight: 400,
    color: isActive(path) ? "#e60023" : "#211922",
    textDecoration: "none",
    padding: "6px 4px",
    borderBottom: isActive(path) ? "2px solid #e60023" : "2px solid transparent",
    transition: "color 0.15s, border-color 0.15s",
  });

  const mobileLinkStyle = (path: string): React.CSSProperties => ({
    display: "block",
    fontFamily: FONT,
    fontSize: "16px",
    fontWeight: isActive(path) ? 700 : 400,
    color: isActive(path) ? "#e60023" : "#211922",
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: "12px",
    backgroundColor: isActive(path) ? "rgba(230,0,35,0.06)" : "transparent",
  });

  return (
    <nav
      className="fixed top-0 w-full z-40"
      style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e5e0" }}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }} aria-label="Home">
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#e60023",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  e
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#211922",
                  letterSpacing: "-0.3px",
                }}
              >
                eldri.media
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm">
            <div
              className="flex items-center w-full"
              style={{
                backgroundColor: "#f6f6f3",
                border: "1px solid #e5e5e0",
                borderRadius: "20px",
                padding: "8px 16px",
                gap: "8px",
              }}
            >
              <Search size={16} style={{ color: "#91918c", flexShrink: 0 }} />
              <span style={{ fontSize: "14px", color: "#91918c", fontFamily: FONT }}>
                Search posts…
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            <Link to="/" style={linkStyle("/")}>Home</Link>
            <Link to="/explore" style={linkStyle("/explore")}>Explore</Link>
            <Link to="/communities" style={linkStyle("/communities")}>Communities</Link>
            <Link
              to="/create"
              style={{
                fontFamily: FONT,
                fontSize: "12px",
                fontWeight: 400,
                backgroundColor: "#e60023",
                color: "#ffffff",
                padding: "6px 14px",
                borderRadius: "16px",
                textDecoration: "none",
              }}
            >
              Create
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              color: "#211922",
              backgroundColor: menuOpen ? "#e0e0d9" : "transparent",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e5e0", padding: "12px 16px 16px" }}>
          <Link to="/" style={mobileLinkStyle("/")} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/explore" style={mobileLinkStyle("/explore")} onClick={() => setMenuOpen(false)}>Explore</Link>
          <Link to="/communities" style={mobileLinkStyle("/communities")} onClick={() => setMenuOpen(false)}>Communities</Link>
          <Link to="/community/create" style={mobileLinkStyle("/community/create")} onClick={() => setMenuOpen(false)}>Create Community</Link>
          <div style={{ marginTop: "12px", padding: "0 16px" }}>
            <Link
              to="/create"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                backgroundColor: "#e60023",
                color: "#ffffff",
                fontFamily: FONT,
                fontSize: "14px",
                padding: "10px 14px",
                borderRadius: "16px",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Create Post
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
