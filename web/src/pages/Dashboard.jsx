import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="card">
      <h1>Dashboard</h1>
      <p>
        Page accessible après une connexion OTP réussie. Elle sert de point de
        départ pour le reste de l'application.
      </p>
      <ul className="stats">
        <li>
          <span className="stat-value">OK</span>
          <span className="stat-label">Statut backend</span>
        </li>
        <li>
          <span className="stat-value">OTP</span>
          <span className="stat-label">Auth active</span>
        </li>
        <li>
          <span className="stat-value">v3</span>
          <span className="stat-label">Version</span>
        </li>
      </ul>
      <Link to="/" className="btn btn-ghost">
        Retour à l'accueil
      </Link>
    </section>
  );
}
