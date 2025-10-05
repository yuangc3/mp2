import { getCached } from "./http";
import type {
  PokemonListResponse,
  PokemonSummary,
  PokemonDetail,
  PokemonTypeList,
} from "../types/pokemon";

export async function listPokemon(limit = 200, offset = 0) {
  return getCached<PokemonListResponse>(`pokemon?limit=${limit}&offset=${offset}`);
}

export async function fetchPokemonByNameOrId(idOrName: string | number) {
  return getCached<PokemonDetail>(`pokemon/${idOrName}`);
}

export async function fetchTypes() {
  return getCached<PokemonTypeList>(`type`);
}

// Expand summaries to include full details (sprites, types, etc.)
export async function expandSummaries(summaries: PokemonSummary[]) {
  return Promise.all(
    summaries.map((s) => fetchPokemonByNameOrId(s.name))
  );
}