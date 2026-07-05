import { Link, Outlet, useLocation } from "react-router-dom";

export default function App() {
  const { pathname } = useLocation();

  const linkStyle = (path) => ({
    padding: "8px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
    color: pathname === path ? "#fff" : "#0b6b53",
    background: pathname === path ? "#0b6b53" : "transparent",
  });

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          Codéna <span className="brand-tag">v3</span>
        </Link>
        <nav className="app-nav">
          <Link to="/" style={linkStyle("/")}>
            Accueil
          </Link>
          <Link to="/login" style={linkStyle("/login")}>
            Connexion OTP
          </Link>
          <Link to="/dashboard" style={linkStyle("/dashboard")}>
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        Codéna © {new Date().getFullYear()} — Application en ligne
      </footer>
    </div>
  );
}
