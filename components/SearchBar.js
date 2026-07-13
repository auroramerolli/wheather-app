"use client";

import { useEffect, useRef, useState } from "react";
import { geocodeCity } from "@/lib/weather";

export default function SearchBar({ onSelectPlace }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      try {
        const places = await geocodeCity(query);
        setResults(places);
        setOpen(true);
      } catch {
        setResults([]);
      }
    }, 350);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function pick(place) {
    onSelectPlace(place);
    setQuery(place.name);
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (results[0]) pick(results[0]);
  }

  return (
    <form className="search" onSubmit={handleSubmit} ref={boxRef}>
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
        placeholder="Kërko një qytet (p.sh. Korçë, Tiranë...)"
        aria-label="Kërko qytet"
        autoComplete="off"
      />
      <button className="search-btn" type="submit">
        Kërko
      </button>

      {open && results.length > 0 && (
        <div className="search-results" role="listbox">
          {results.map((r) => (
            <button
              key={r.id}
              type="button"
              className="search-result-item"
              onClick={() => pick(r)}
            >
              <span>
                {r.name}
                {r.admin1 ? `, ${r.admin1}` : ""}
              </span>
              <span className="search-result-country">{r.country}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
