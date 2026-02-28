import { render, screen, act } from "@testing-library/react";
import HomePage from "@/app/page";
import * as api from "@/services/api";

jest.mock("@/services/api");

const mockPhones = [
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

describe("HomePage (integration)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state on init", () => {
    jest.spyOn(api, "getPhones").mockReturnValue(new Promise(() => {}));
    render(<HomePage />);
    expect(screen.getByText("loading phones...")).toBeInTheDocument();
  });

  it("renders phone list after loading", async () => {
    jest.spyOn(api, "getPhones").mockResolvedValue(mockPhones);
    await act(async () => {
      render(<HomePage />);
    });
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
  });

  it("shows price for each phone", async () => {
    jest.spyOn(api, "getPhones").mockResolvedValue(mockPhones);
    await act(async () => {
      render(<HomePage />);
    });
    expect(screen.getByText("1329 EUR")).toBeInTheDocument();
    expect(screen.getByText("1229 EUR")).toBeInTheDocument();
  });

  it("shows error message if API fails", async () => {
    jest.spyOn(api, "getPhones").mockRejectedValue(new Error("API error"));
    await act(async () => {
      render(<HomePage />);
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    jest.spyOn(api, "getPhones").mockReturnValue(new Promise(() => {}));
    render(<HomePage />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
});
