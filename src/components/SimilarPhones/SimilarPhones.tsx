import { PhoneListItem } from "@/types";
import PhoneCard from "@/components/PhoneCard/PhoneCard";
import styles from "./SimilarPhones.module.css";

interface Props {
  phones: PhoneListItem[];
}

export default function SimilarPhones({ phones }: Props) {
  if (phones.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Similar items">
      <h2 className={styles.title}>SIMILAR ITEMS</h2>
      <ul className={styles.grid}>
        {phones.map((phone) => (
          <li key={phone.id}>
            <PhoneCard phone={phone} />
          </li>
        ))}
      </ul>
    </section>
  );
}
