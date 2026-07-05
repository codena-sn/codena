import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="card">
      <h1>Bienvenue sur Codéna</h1>
      <p>
        Application de démonstration v3. Le parcours utilisateur est testable de
        bout en bout : connexion par code OTP puis accès au dashboard.
      </p>
      <div className="row">
        <Link to="/login" className="btn btn-primary">
          Se connecter avec un OTP
        </Link>
        <Link to="/dashboard" className="btn btn-ghost">
          Voir le dashboard
        </Link>
      </div>
    </section>
  );
}
