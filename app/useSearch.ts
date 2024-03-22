"use client";
import React, { useState, useEffect } from "react";
import { SearchResult } from "./types";

/*
   Custom hook for fetching results from server.
*/

export default function useSearch(
  query: string,
  offset: number,
  limit: number
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [result, setResult] = useState<SearchResult[]>([]);

  useEffect(() => {
    setResult([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    async function fetchData() {
      try {
        const searchResults = await fetch(
          `http://localhost:3002/wiki/search?q=${query}&offset=${offset}&limit=${limit}`
        );
        const finalSearchResults = await searchResults.json();
        setResult((prevResults) => [...prevResults, ...finalSearchResults]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    query.length && fetchData();
  }, [query, offset]);

  return { loading, error, result };
}
