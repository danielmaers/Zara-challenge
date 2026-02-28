import Link from "next/link";
import Image from "next/image";
import { PhoneListItem } from "@/types";
import styles from "./PhoneCard.module.css";

interface Props {
  phone: PhoneListItem;
  priority?: boolean;
}

export default function PhoneCard({ phone, priority = false }: Props) {
  return (
    <Link
      href={`/${phone.id}`}
      className={styles.card}
      aria-label={`Ver detalles de ${phone.brand} ${phone.name}`}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={phone.imageUrl}
          alt={`${phone.brand} ${phone.name}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className={styles.image}
          priority={priority}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.nameGroup}>
          <span className={styles.brand}>{phone.brand}</span>
          <p className={styles.name}>{phone.name}</p>
        </div>
        <span className={styles.price}>{phone.basePrice} EUR</span>
      </div>
    </Link>
  );
}
