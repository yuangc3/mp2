import { Link } from "react-router-dom";
import s from "../styles/card.module.css";
import type { PokemonDetail } from "../types/pokemon";

export default function PokemonCard({ p }: { p: PokemonDetail }) {
  const img = p.sprites.front_default;

  return (
    <Link to={`/pokemon/${p.id}`} className={s.card}>
      {img ? (
        <img className={s.media} alt={p.name} src={img} />
      ) : (
        <div className={s.media} />
      )}

      <div className={s.body}>
        <div className={s.title}>{p.name}</div>
        <div className={s.sub}>#{p.id}</div>

        <div style={{ display: "flex", gap: ".25rem", marginTop: ".25rem" }}>
          {p.types.map((t) => (
            <span key={t.type.name} className={s.badge}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
