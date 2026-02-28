"use client";

import { useState } from "react";
import { ColorOption } from "@/types";
import styles from "./ColorSelector.module.css";

interface Props {
  colors: ColorOption[];
  selected: string | null;
  onSelect: (color: ColorOption) => void;
}

export default function ColorSelector({ colors, selected, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const displayedName = hovered ?? selected;

  return (
    <div className={styles.container}>
      <p className={styles.label}>COLOR. PICK YOUR FAVOURITE</p>
      <div className={styles.options} role="radiogroup" aria-label="Select color">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            role="radio"
            aria-checked={selected === color.name}
            aria-label={color.name}
            className={`${styles.swatch} ${selected === color.name ? styles.swatchSelected : ""}`}
            style={{ backgroundColor: color.hexCode }}
            onClick={() => onSelect(color)}
            onMouseEnter={() => setHovered(color.name)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </div>
      {displayedName && (
        <p className={styles.colorName}>{displayedName}</p>
      )}
    </div>
  );
}
