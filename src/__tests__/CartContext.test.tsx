import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "@/context/CartContext";

const mockItem = {
  phoneId: "SMG-S24U",
  name: "Galaxy S24 Ultra",
  brand: "Samsung",
  imageUrl: "http://example.com/image.webp",
  colorName: "Titanium Black",
  storageCapacity: "256 GB",
  price: 1229,
};

function TestComponent() {
  const { items, addItem, removeItem, totalItems, totalPrice } = useCart();
  return (
    <div>
      <p data-testid="count">{totalItems}</p>
      <p data-testid="total">{totalPrice}</p>
      <ul>
        {items.map((i) => (
          <li key={i.cartId} data-testid="cart-item">
            {i.name}
            <button onClick={() => removeItem(i.cartId)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addItem(mockItem)}>Add</button>
    </div>
  );
}

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("total")).toHaveTextContent("0");
  });

  it("adds an item to the cart", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    await user.click(screen.getByText("Add"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("total")).toHaveTextContent("1229");
    expect(screen.getByTestId("cart-item")).toHaveTextContent("Galaxy S24 Ultra");
  });

  it("removes an item from the cart", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    await user.click(screen.getByText("Add"));
    await user.click(screen.getByText("Remove"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.queryByTestId("cart-item")).not.toBeInTheDocument();
  });

  it("correctly accumulates total price", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    await user.click(screen.getByText("Add"));
    await user.click(screen.getByText("Add"));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
    expect(screen.getByTestId("total")).toHaveTextContent("2458");
  });
});
