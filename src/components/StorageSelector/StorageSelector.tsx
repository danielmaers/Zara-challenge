import { StorageOption } from "@/types";
import styles from "./StorageSelector.module.css";

interface Props {
  options: StorageOption[];
  selected: string | null;
  onSelect: (option: StorageOption) => void;
}

export default function StorageSelector({
  options,
  selected,
  onSelect,
}: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.label}>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</p>
      <div className={styles.options} role="radiogroup" aria-label="Select storage">
        {options.map((option) => (
          <button
            key={option.capacity}
            type="button"
            role="radio"
            aria-checked={selected === option.capacity}
            aria-label={option.capacity}
            className={`${styles.option} ${selected === option.capacity ? styles.optionSelected : ""}`}
            onClick={() => onSelect(option)}
          >
            {option.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
