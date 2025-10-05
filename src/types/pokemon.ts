export interface PokemonSummary {
  name: string;
  url: string;
}


export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}


export interface PokemonTypeRef {
  slot: number;
  type: { name: string; url: string };
}


export interface PokemonSprites {
  front_default: string | null;
  other?: { [key: string]: any };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeRef[];
  sprites: PokemonSprites;
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
}

export interface PokemonTypeList {
  results: { name: string; url: string }[];
}
