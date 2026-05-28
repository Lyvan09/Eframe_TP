import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Accueil() {
  const [valeur, setValeur] = useState("");
  const { login } = useUser();
  const navigate  = useNavigate();

  const handleStart = () => {
    if (!valeur.trim()) return;
    login(valeur.trim());
    navigate("/quiz");
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", textAlign: "center" }}>
      <h1>PolyQuiz</h1>
      <p>Entrez votre pseudo pour commencer</p>
      <input
        value={valeur}
        onChange={e => setValeur(e.target.value)}
        placeholder="Votre pseudo..."
        style={{ padding: "0.6rem", width: "100%", marginTop: "1rem" }}
      />
      <button onClick={handleStart} style={{ marginTop: "0.75rem", padding: "0.6rem 1.5rem" }}>
        Jouer
      </button>
    </div>
  );
}