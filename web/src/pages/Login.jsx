import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { otpSend, otpVerify, API_URL } from "../api.js";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("221771234567");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("phone"); // "phone" | "code"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "ok"|"err", text }
  const [devHint, setDevHint] = useState(null);

  async function handleSend(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setDevHint(null);
    try {
      const data = await otpSend(phone.trim());
      setStep("code");
      setMessage({ type: "ok", text: "Code OTP envoyé. Saisis-le ci-dessous." });
      // En mode démo, le backend renvoie le code pour faciliter le test.
      if (data && data.dev_code) setDevHint(data.dev_code);
    } catch (err) {
      setMessage({ type: "err", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await otpVerify(phone.trim(), code.trim());
      setMessage({ type: "ok", text: "Connexion réussie ✅ Redirection…" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      setMessage({ type: "err", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h1>Connexion par OTP</h1>
      <p className="muted">
        Backend&nbsp;: <code>{API_URL}</code>
      </p>

      {step === "phone" && (
        <form onSubmit={handleSend} className="form">
          <label htmlFor="phone">Numéro de téléphone</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="221771234567"
            required
          />
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Envoi…" : "Envoyer l'OTP"}
          </button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={handleVerify} className="form">
          <label htmlFor="code">Code OTP reçu</label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            required
          />
          <div className="row">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Vérification…" : "Vérifier"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setStep("phone");
                setCode("");
                setMessage(null);
              }}
            >
              Changer de numéro
            </button>
          </div>
          {devHint && (
            <p className="muted">
              (Démo) code généré côté serveur&nbsp;: <strong>{devHint}</strong>
            </p>
          )}
        </form>
      )}

      {message && (
        <p className={message.type === "ok" ? "alert alert-ok" : "alert alert-err"}>
          {message.text}
        </p>
      )}
    </section>
  );
}
