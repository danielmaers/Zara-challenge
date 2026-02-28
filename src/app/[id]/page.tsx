"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPhone } from "@/services/api";
import { Phone, ColorOption, StorageOption } from "@/types";
import { useCart } from "@/context/CartContext";
import ColorSelector from "@/components/ColorSelector/ColorSelector";
import StorageSelector from "@/components/StorageSelector/StorageSelector";
import SimilarPhones from "@/components/SimilarPhones/SimilarPhones";
import styles from "./page.module.css";

export default function PhoneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const [phone, setPhone] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null
  );
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPhone(id);
        setPhone(data);
      } catch {
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (notFoundError) notFound();
  if (loading || !phone) {
    return (
      <p className={styles.loading} aria-live="polite">
        Loading...
      </p>
    );
  }

  const currentImage =
    selectedColor?.imageUrl ?? phone.colorOptions[0]?.imageUrl ?? "";
  const hasStorageSelected = selectedStorage !== null;
  const currentPrice = hasStorageSelected
    ? selectedStorage!.price
    : phone.basePrice;
  const priceLabel = `${currentPrice} EUR`;
  const canAddToCart = selectedColor !== null && selectedStorage !== null;

  function handleAddToCart() {
    if (!canAddToCart || !phone) return;
    addItem({
      phoneId: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageUrl: selectedColor!.imageUrl,
      colorName: selectedColor!.name,
      storageCapacity: selectedStorage!.capacity,
      price: selectedStorage!.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const specRows: [string, string][] = [
    ["NAME", phone.name],
    ["DESCRIPTION", phone.description],
    ["SCREEN", phone.specs.screen],
    ["RESOLUTION", phone.specs.resolution],
    ["PROCESSOR", phone.specs.processor],
    ["MAIN CAMERA", phone.specs.mainCamera],
    ["SELFIE CAMERA", phone.specs.selfieCamera],
    ["BATTERY", phone.specs.battery],
    ["OS", phone.specs.os],
    ["SCREEN REFRESH RATE", phone.specs.screenRefreshRate],
  ];

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back} aria-label="Back to listing">
        &#8249; BACK
      </Link>

      <div className={styles.detail}>
        <div className={styles.imageWrapper}>
          <Image
            src={currentImage}
            alt={`${phone.brand} ${phone.name}${selectedColor ? ` - ${selectedColor.name}` : ""}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{phone.name}</h1>
          <p className={styles.price} aria-live="polite">
            {priceLabel}
          </p>

          <div className={styles.selectors}>
            <StorageSelector
              options={phone.storageOptions}
              selected={selectedStorage?.capacity ?? null}
              onSelect={setSelectedStorage}
            />
            <ColorSelector
              colors={phone.colorOptions}
              selected={selectedColor?.name ?? null}
              onSelect={setSelectedColor}
            />
          </div>

          <button
            className={styles.addButton}
            onClick={handleAddToCart}
            disabled={!canAddToCart}
          >
            {added ? "ADDED" : "ADD"}
          </button>
        </div>
      </div>

      <section className={styles.specs} aria-label="Specifications">
        <h2 className={styles.specsTitle}>SPECIFICATIONS</h2>
        <dl className={styles.specsList}>
          {specRows.map(([label, value]) => (
            <div key={label} className={styles.specRow}>
              <dt className={styles.specLabel}>{label}</dt>
              <dd className={styles.specValue}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <SimilarPhones phones={phone.similarProducts} />
    </div>
  );
}
