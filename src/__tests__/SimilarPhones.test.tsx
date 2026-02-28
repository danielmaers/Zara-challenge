import { render, screen } from "@testing-library/react";
import SimilarPhones from "@/components/SimilarPhones/SimilarPhones";
import { PhoneListItem } from "@/types";

const mockPhones: PhoneListItem[] = [
  {
    id: "SMG-S24U",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    basePrice: 1329,
    imageUrl: "http://example.com/img1.webp",
  },
  {
    id: "APL-I15P",
    brand: "Apple",
    name: "iPhone 15 Pro",
    basePrice: 1229,
    imageUrl: "http://example.com/img2.webp",
  },
];

describe("SimilarPhones", () => {
  it("renders similar phones", () => {
    render(<SimilarPhones phones={mockPhones} />);
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
  });

  it("shows SIMILAR ITEMS heading", () => {
    render(<SimilarPhones phones={mockPhones} />);
    expect(screen.getByText("SIMILAR ITEMS")).toBeInTheDocument();
  });

  it("renders nothing if list is empty", () => {
    const { container } = render(<SimilarPhones phones={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("has accessible section landmark", () => {
    render(<SimilarPhones phones={mockPhones} />);
    expect(
      screen.getByRole("region", { name: "Similar items" })
    ).toBeInTheDocument();
  });

  it("renders prices of similar phones", () => {
    render(<SimilarPhones phones={mockPhones} />);
    expect(screen.getByText("1329 EUR")).toBeInTheDocument();
    expect(screen.getByText("1229 EUR")).toBeInTheDocument();
  });
});
