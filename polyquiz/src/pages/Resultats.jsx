import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Resultats() {
  const { state }               = useLocation();
  const { pseudo, meilleurScore } = useUser();
  const navigate                = useNavigate();
  const [theme, setTheme]       = useState("clair"); 

  const score = state?.score ?? 0;
  const total = state?.total ?? 10;

  const ratio = useMemo(() => {
    console.log("Calcul du ratio — ne s'exécute qu'une fois");
    return ((score / total) * 100).toFixed(1);
  }, [score, total]);

  const mention = useMemo(() => {
    if (ratio >= 80) return { texte: "Excellent !", couleur: "#27ae60" };
    if (ratio >= 50) return { texte: "Bien joué !",  couleur: "#4f6ef7" };
    return              { texte: "À améliorer",     couleur: "#e67e22" };
  }, [ratio]);

  const bg = theme === "clair" ? "#f4f5f7" : "#1a1d23";
  const fg = theme === "clair" ? "#1a1d23" : "#f4f5f7";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: fg, transition: "all 0.3s" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "3rem 1.5rem", textAlign: "center" }}>

        <button onClick={() => setTheme(t => t === "clair" ? "sombre" : "clair")}
          style={{ marginBottom: "2rem", padding: "0.4rem 1rem", cursor: "pointer" }}>
          {theme === "clair" ? "Sombre" : "Clair"}
        </button>

        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Résultats</h1>
        <p style={{ color: "#888" }}>Bravo, <strong>{pseudo}</strong> !</p>

        <div style={{ margin: "2rem 0", padding: "1.5rem", background: theme === "clair" ? "#fff" : "#2a2d35",
                      borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <p style={{ fontSize: "3rem", fontWeight: 700 }}>{score} <span style={{ fontSize: "1.2rem", color: "#888" }}>/ {total}</span></p>
          <p style={{ fontSize: "1.5rem", color: mention.couleur, fontWeight: 600 }}>{mention.texte}</p>
          <p style={{ marginTop: "0.75rem", color: "#888" }}>Ratio : <strong>{ratio}%</strong></p>
          <p style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "#aaa" }}>
            Meilleur score : {meilleurScore} pts
          </p>
        </div>

        <button onClick={() => navigate("/quiz")}
          style={{ padding: "0.7rem 1.5rem", background: "#4f6ef7", color: "#fff",
                   border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
          Rejouer
        </button>
      </div>
    </div>
  );
}