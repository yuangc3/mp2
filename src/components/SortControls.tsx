import c from "../styles/controls.module.css";

export type SortKey = "name" | "id";
export type SortDir = "asc" | "desc";

type Props = {
  sortKey: SortKey;
  sortDir: SortDir;
  onChange: (k: SortKey, d: SortDir) => void;
};

export default function SortControls({ sortKey, sortDir, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <select
        className={c.select}
        value={sortKey}
        onChange={(e) => onChange(e.target.value as SortKey, sortDir)}
      >
        <option value="name">Name</option>
        <option value="id">ID</option>
      </select>

      <select
        className={c.select}
        value={sortDir}
        onChange={(e) => onChange(sortKey, e.target.value as SortDir)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
