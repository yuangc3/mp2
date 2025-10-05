import axios from "axios";

export const http = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 15000,
});

// Simple in-memory cache to help with PokeAPI rate limits
const cache = new Map<string, any>();

export async function getCached<T>(url: string): Promise<T> {
    if (url in cache) {
        return cache.get(url)
    }
    const { data } = await http.get<T>(url);
    cache.set(url, data);
    return data;
}
