"use client";

import { useCallback, useEffect, useState } from "react";
import { getPhones } from "@/services/api";
import { PhoneListItem } from "@/types";
import PhoneCard from "@/components/PhoneCard/PhoneCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.css";

export default function HomePage() {
  const [phones, setPhones] = useState<PhoneListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhones = useCallback(async (query?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPhones(query);
      setPhones(data);
    } catch {
      setError("Failed to load phones. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

  return (
    <div className={styles.page}>
      <SearchBar onSearch={fetchPhones} resultCount={phones.length} />

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className={styles.loading} aria-live="polite">
          loading phones...
        </p>
      ) : (
        <ul
          id="phone-grid"
          className={styles.grid}
          aria-label="Phone Catalog"
        >
          {phones.map((phone, index) => (
            <li key={phone.id}>
              <PhoneCard phone={phone} priority={index < 5} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
