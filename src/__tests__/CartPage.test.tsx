import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "@/app/cart/page";
import { CartProvider } from "@/context/CartContext";
import { CartItem } from "@/types";

const mockCartItem: CartItem = {
  cartId: "cart-1",
  phoneId: "SMG-S24U",
  name: "Galaxy S24 Ultra",
  brand: "Samsung",
  imageUrl: "http://example.com/image.webp",
  colorName: "Titanium Black",
  storageCapacity: "256 GB",
  price: 1229,
};

function renderCartPage() {
  return render(
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
}

describe("CartPage (integration)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows CART (0) when cart is empty", () => {
    renderCartPage();
    expect(screen.getByText("CART (0)")).toBeInTheDocument();
  });

  it("shows CONTINUE SHOPPING button when cart is empty", () => {
    renderCartPage();
    expect(
      screen.getByRole("link", { name: "CONTINUE SHOPPING" })
    ).toHaveAttribute("href", "/");
  });

  it("shows cart items when there are products", async () => {
    localStorage.setItem("zara-cart", JSON.stringify([mockCartItem]));
    renderCartPage();
    expect(await screen.findByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("CART (1)")).toBeInTheDocument();
  });

  it("shows total price in the footer", async () => {
    localStorage.setItem("zara-cart", JSON.stringify([mockCartItem]));
    renderCartPage();
    await screen.findByText("Galaxy S24 Ultra");
    // Price appears in the item and in the footer total
    expect(screen.getAllByText("1229 EUR")).toHaveLength(2);
    expect(screen.getByText("TOTAL")).toBeInTheDocument();
  });

  it("shows CONTINUE SHOPPING button with items in cart", async () => {
    localStorage.setItem("zara-cart", JSON.stringify([mockCartItem]));
    renderCartPage();
    await screen.findByText("Galaxy S24 Ultra");
    expect(
      screen.getByRole("link", { name: "CONTINUE SHOPPING" })
    ).toBeInTheDocument();
  });

  it("removes an item when Remove is clicked", async () => {
    const user = userEvent.setup();
    localStorage.setItem("zara-cart", JSON.stringify([mockCartItem]));
    renderCartPage();
    await screen.findByText("Galaxy S24 Ultra");
    await user.click(
      screen.getByRole("button", {
        name: /Remove Samsung Galaxy S24 Ultra/i,
      })
    );
    expect(screen.queryByText("Galaxy S24 Ultra")).not.toBeInTheDocument();
    expect(screen.getByText("CART (0)")).toBeInTheDocument();
  });
});
