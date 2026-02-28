"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem/CartItem";
import styles from "./page.module.css";

export default function CartPage() {
  const { items, removeItem, totalPrice } = useCart();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>CART ({items.length})</h1>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <Link href="/" className={styles.continueButton}>
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.list} aria-label="Cart items">
            {items.map((item) => (
              <CartItem key={item.cartId} item={item} onRemove={removeItem} />
            ))}
          </ul>

          <div className={styles.footer}>
            <Link href="/" className={styles.continueButton}>
              CONTINUE SHOPPING
            </Link>
            <div className={styles.total}>
              <span className={styles.totalLabel}>TOTAL</span>
              <span className={styles.totalPrice}>{totalPrice} EUR</span>
            </div>
            <button className={styles.payButton}>PAY</button>
          </div>
        </>
      )}
    </div>
  );
}
