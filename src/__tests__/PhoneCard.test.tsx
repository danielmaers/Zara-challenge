import { render, screen } from "@testing-library/react";
import PhoneCard from "@/components/PhoneCard/PhoneCard";
import { PhoneListItem } from "@/types";

const mockPhone: PhoneListItem = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  basePrice: 1329,
  imageUrl:
    "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp",
};

describe("PhoneCard", () => {
  it("shows name, brand and price", () => {
    render(<PhoneCard phone={mockPhone} />);
    expect(screen.getByText("Samsung")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("1329 EUR")).toBeInTheDocument();
  });

  it("has a link to phone detail", () => {
    render(<PhoneCard phone={mockPhone} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/SMG-S24U");
  });

  it("has an accessible image alt", () => {
    render(<PhoneCard phone={mockPhone} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Samsung Galaxy S24 Ultra");
  });
});
