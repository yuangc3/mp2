import { useEffect, useMemo, useState } from "react";
import { listPokemon, expandSummaries } from "../api/poke";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import SortControls, { SortDir, SortKey } from "../components/SortControls";
import layout from "../styles/layout.module.css";
import type { PokemonDetail } from "../types/pokemon";



export default function ListView() {
  const [all, setAll] = useState<PokemonDetail[]>([]);
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const dq = useDebouncedValue(q, 200);

  // Fetch data once when the component loads
  useEffect(() => {
    (async () => {
      const list = await listPokemon(151, 0); // Gen 1 Pokémon
      const details = await expandSummaries(list.results);
      setAll(details);
    })();
  }, []);

  // Filter + sort results client-side
  const filtered = useMemo(() => {
    const f = all.filter((p) => p.name.includes(dq.toLowerCase()));
    const s = [...f].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else cmp = a.id - b.id;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return s;
  }, [all, dq, sortDir, sortKey]);

  return (
    <div className={layout.container}>
      <div className={layout.spread}>
        <SearchBar value={q} onChange={setQ} placeholder="Search Pokémon..." />
        <SortControls
          sortKey={sortKey}
          sortDir={sortDir}
          onChange={(k, d) => {
            setSortKey(k);
            setSortDir(d);
          }}
        />
      </div>
      <div className={layout.sep} />
      <div className={layout.grid}>
        {filtered.map((p) => (
          <PokemonCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
