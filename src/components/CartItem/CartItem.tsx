import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import styles from "./CartItem.module.css";

interface Props {
  item: CartItemType;
  onRemove: (cartId: string) => void;
}

export default function CartItem({ item, onRemove }: Props) {
  return (
    <li className={styles.item}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.imageUrl}
          alt={`${item.brand} ${item.name}`}
          fill
          sizes="280px"
          className={styles.image}
        />
      </div>

      <div className={styles.details}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.specs}>
          {item.storageCapacity} | {item.colorName.toUpperCase()}
        </p>
        <p className={styles.price}>{item.price} EUR</p>
        <button
          className={styles.removeButton}
          onClick={() => onRemove(item.cartId)}
          aria-label={`Remove ${item.brand} ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
