import { useReducer, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import useFetch from "../hooks/useFetch";

const etatInitial = {
  indexQuestion: 0,
  score:         0,
  statut:        "en_cours", 
  reponsesChoisies: [],
};

function quizReducer(state, action) {
  switch (action.type) {

    case "START_QUIZ":
      return { ...etatInitial, statut: "en_cours" };

    case "ANSWER_QUESTION": {
      const estCorrecte = action.payload.reponse === action.payload.bonneReponse;
      const prochainIndex = state.indexQuestion + 1;
      const estFini = prochainIndex >= action.payload.total;

      return {
        ...state,
        score: estCorrecte ? state.score + 1 : state.score,
        reponsesChoisies: [...state.reponsesChoisies, action.payload.reponse],
        indexQuestion: prochainIndex,
        statut: estFini ? "termine" : "en_cours",
      };
    }

    case "FINISH_QUIZ":
      return { ...state, statut: "termine" };

    default:
      return state;
  }
}
// ─────────────────────────────────────────────────────────────

export default function QuizEngine() {
  const [state, dispatch] = useReducer(quizReducer, etatInitial);
  const { data: questions, loading, error } = useFetch("/questions.json");
  const { sauvegarderScore } = useUser();
  const navigate = useNavigate();

  const intervalRef = useRef(null);
  const [tempsRestant, setTempsRestant] = useState(60);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTempsRestant(t => t - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current); 
  }, []);

  useEffect(() => {
    if (tempsRestant <= 0) {
      clearInterval(intervalRef.current); 
      dispatch({ type: "FINISH_QUIZ" });
    }
  }, [tempsRestant]);

  useEffect(() => {
    if (state.statut === "termine" && questions) {
      clearInterval(intervalRef.current);
      sauvegarderScore(state.score);
      navigate("/resultats", { state: { score: state.score, total: questions.length } });
    }
  }, [state.statut, questions]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "3rem" }}>Chargement des questions…</p>;
  if (error)   return <p style={{ color: "red", textAlign: "center" }}>Erreur : {error}</p>;
  if (!questions || questions.length === 0)
              return <p style={{ textAlign: "center" }}>Aucune question trouvée.</p>;
  if (state.statut === "termine")
              return <p style={{ textAlign: "center", marginTop: "3rem" }}>Calcul du score…</p>;

  const question = questions[state.indexQuestion];

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <span>Question {state.indexQuestion + 1} / {questions.length}</span>
        <span style={{ color: tempsRestant <= 10 ? "red" : "inherit", fontWeight: 600 }}>
          ⏱ {tempsRestant}s
        </span>
        <span>Score : {state.score}</span>
      </div>

      <div style={{ background: "#fff", borderRadius: 10, padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: "0.5rem" }}>{question.categorie}</p>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>{question.libelle}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {question.options.map((opt) => (
            <button key={opt} onClick={() =>
              dispatch({
                type: "ANSWER_QUESTION",
                payload: { reponse: opt, bonneReponse: question.bonne_reponse, total: questions.length }
              })
            } style={{
              padding: "0.7rem 1rem", textAlign: "left",
              border: "1px solid #e2e4e9", borderRadius: 8,
              background: "#f9f9fb", cursor: "pointer", fontFamily: "inherit",
            }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}