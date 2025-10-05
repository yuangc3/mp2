import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPokemonByNameOrId } from "../api/poke";
import type { PokemonDetail } from "../types/pokemon";
import layout from "../styles/layout.module.css";
import s from "../styles/card.module.css";

export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  const [p, setP] = useState<PokemonDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await fetchPokemonByNameOrId(id);
      setP(data);
    })();
  }, [id]);

  if (!p) return <div className={layout.container}>Loading...</div>;

  const prev = Math.max(1, p.id - 1);
  const next = Math.min(151, p.id + 1);

  return (
    <div className={layout.container}>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
        ← Back to List
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <img
          className={s.media}
          src={p.sprites.front_default ?? ""}
          alt={p.name}
          width={120}
          height={120}
        />
        <h2 style={{ textTransform: "capitalize" }}>
          #{p.id} {p.name}
        </h2>
        <div>
          {p.types.map((t) => (
            <span key={t.type.name} className={s.badge}>
              {t.type.name}
            </span>
          ))}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => navigate(`/pokemon/${prev}`)}
            disabled={p.id === 1}
            style={{ marginRight: "1rem" }}
          >
            ← Previous
          </button>
          <button
            onClick={() => navigate(`/pokemon/${next}`)}
            disabled={p.id === 151}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
