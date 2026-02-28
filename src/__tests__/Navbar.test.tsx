import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar/Navbar";
import { CartProvider } from "@/context/CartContext";

function renderNavbar() {
  return render(
    <CartProvider>
      <Navbar />
    </CartProvider>
  );
}

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows cart counter at 0 by default", () => {
    renderNavbar();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("has home link with aria-label", () => {
    renderNavbar();
    expect(
      screen.getByRole("link", { name: /Go to home/i })
    ).toHaveAttribute("href", "/");
  });

  it("has cart link with dynamic aria-label", () => {
    renderNavbar();
    expect(
      screen.getByRole("link", { name: /Shopping cart, 0 items/i })
    ).toHaveAttribute("href", "/cart");
  });

  it("cart with 1 item uses singular 'item'", () => {
    localStorage.setItem(
      "zara-cart",
      JSON.stringify([
        {
          cartId: "cart-1",
          phoneId: "SMG-S24U",
          name: "Galaxy S24 Ultra",
          brand: "Samsung",
          imageUrl: "http://example.com/image.webp",
          colorName: "Titanium Black",
          storageCapacity: "256 GB",
          price: 1229,
        },
      ])
    );
    renderNavbar();
    expect(
      screen.findByRole("link", { name: /Shopping cart, 1 item$/i })
    ).toBeTruthy();
  });

  it("has main navigation landmark", () => {
    renderNavbar();
    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument();
  });
});
