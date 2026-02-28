import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "@/components/CartItem/CartItem";
import { CartItem as CartItemType } from "@/types";

const mockItem: CartItemType = {
  cartId: "cart-1",
  phoneId: "SMG-S24U",
  name: "Galaxy S24 Ultra",
  brand: "Samsung",
  imageUrl: "http://example.com/image.webp",
  colorName: "Titanium Black",
  storageCapacity: "256 GB",
  price: 1229,
};

describe("CartItem", () => {
  it("shows the phone name", () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
  });

  it("shows specs in uppercase", () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByText("256 GB | TITANIUM BLACK")).toBeInTheDocument();
  });

  it("shows price with EUR", () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByText("1229 EUR")).toBeInTheDocument();
  });

  it("has accessible image alt", () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Samsung Galaxy S24 Ultra"
    );
  });

  it("calls onRemove with correct cartId when Remove is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();
    render(<CartItem item={mockItem} onRemove={onRemove} />);
    await user.click(
      screen.getByRole("button", {
        name: /Remove Samsung Galaxy S24 Ultra/i,
      })
    );
    expect(onRemove).toHaveBeenCalledWith("cart-1");
  });

  it("Remove button has descriptive aria-label", () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(
      screen.getByRole("button", {
        name: "Remove Samsung Galaxy S24 Ultra from cart",
      })
    ).toBeInTheDocument();
  });
});
