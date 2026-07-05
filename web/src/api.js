// Base URL du backend. Configurable via la variable d'environnement Vite.
// Fallback sur le backend Render de production si non défini.
export const API_URL = (
  import.meta.env.VITE_API_URL || "https://codena-backend.onrender.com"
).replace(/\/+$/, "");

async function postJSON(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const detail =
      (data && (data.detail || data.message)) ||
      `Erreur ${res.status} (${res.statusText})`;
    throw new Error(
      typeof detail === "string" ? detail : JSON.stringify(detail)
    );
  }
  return data;
}

export function otpSend(phone) {
  return postJSON("/auth/otp-send", { phone });
}

export function otpVerify(phone, code) {
  return postJSON("/auth/otp-verify", { phone, code });
}
