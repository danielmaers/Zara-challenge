import { Phone, PhoneListItem } from "@/types";

const BASE = "/api/phones";

export async function getPhones(search?: string): Promise<PhoneListItem[]> {
  const url = search ? `${BASE}?search=${encodeURIComponent(search)}` : BASE;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch phones");
  return response.json();
}

export async function getPhone(id: string): Promise<Phone> {
  const response = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch phone");
  return response.json();
}
