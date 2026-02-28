"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  onSearch: (query: string) => void;
  resultCount: number;
}

export default function SearchBar({ onSearch, resultCount }: Props) {
  const [value, setValue] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setValue(query);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch(query);
      }, 300);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setValue("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onSearch("");
  }, [onSearch]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          id="phone-search"
          type="search"
          className={styles.input}
          placeholder="Search for a smartphone..."
          value={value}
          onChange={handleChange}
          aria-label="Search phones"
          aria-controls="phone-grid"
        />
        {value && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <p
        className={styles.results}
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        {resultCount} {resultCount === 1 ? "RESULT" : "RESULTS"}
      </p>
    </div>
  );
}
