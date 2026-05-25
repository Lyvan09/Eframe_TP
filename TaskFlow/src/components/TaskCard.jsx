import { Link } from "react-router-dom";

const statutConfig = {
  "A faire":  { color: "#e67e22", bg: "#fef3e2", label: "À faire" },
  "En cours": { color: "#4f6ef7", bg: "#eef1fe", label: "En cours" },
  "Termine":  { color: "#27ae60", bg: "#e8f8ef", label: "Terminé"  },
};

export default function TaskCard({ task }) {
  const s = statutConfig[task.statut] || statutConfig["A faire"];

  return (
    <Link to={`/task/${task.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "1rem 1.25rem",
        boxShadow: "var(--shadow)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        transition: "box-shadow 0.15s, transform 0.15s",
      }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.11)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "var(--shadow)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.2rem",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {task.titre}
          </p>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {task.description}
          </p>
        </div>

        <span style={{
          fontSize: "0.75rem", fontWeight: 500, whiteSpace: "nowrap",
          padding: "0.3rem 0.75rem", borderRadius: "99px",
          color: s.color, background: s.bg,
        }}>
          {s.label}
        </span>
      </div>
    </Link>
  );
}