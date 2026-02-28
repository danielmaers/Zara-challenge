import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhoneDetailPage from "@/app/[id]/page";
import { CartProvider } from "@/context/CartContext";
import * as api from "@/services/api";
import { Phone } from "@/types";

jest.mock("@/services/api");
jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "SMG-S24U" }),
  notFound: jest.fn(),
}));

const mockPhone: Phone = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  description: "Flagship Android smartphone",
  basePrice: 1329,
  rating: 4.5,
  specs: {
    screen: '6.8"',
    resolution: "3088 x 1440",
    processor: "Snapdragon 8 Gen 3",
    mainCamera: "200 MP",
    selfieCamera: "12 MP",
    battery: "5000 mAh",
    os: "Android 14",
    screenRefreshRate: "120 Hz",
  },
  colorOptions: [
    {
      name: "Titanium Black",
      hexCode: "#2E2E2E",
      imageUrl: "http://example.com/black.webp",
    },
    {
      name: "Titanium Violet",
      hexCode: "#7C4D9F",
      imageUrl: "http://example.com/violet.webp",
    },
  ],
  storageOptions: [
    { capacity: "256 GB", price: 1329 },
    { capacity: "512 GB", price: 1429 },
  ],
  similarProducts: [],
};

function renderPage() {
  return render(
    <CartProvider>
      <PhoneDetailPage />
    </CartProvider>
  );
}

describe("PhoneDetailPage (integration)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("shows loading state on init", () => {
    jest.spyOn(api, "getPhone").mockReturnValue(new Promise(() => {}));
    renderPage();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders phone name in heading", async () => {
    jest.spyOn(api, "getPhone").mockResolvedValue(mockPhone);
    renderPage();
    expect(
      await screen.findByRole("heading", { name: "Galaxy S24 Ultra", level: 1 })
    ).toBeInTheDocument();
  });

  it("shows base price", async () => {
    jest.spyOn(api, "getPhone").mockResolvedValue(mockPhone);
    renderPage();
    await screen.findByRole("heading", { level: 1 });
    expect(screen.getByText("1329 EUR")).toBeInTheDocument();
  });

  it("shows color and storage selectors", async () => {
    jest.spyOn(api, "getPhone").mockResolvedValue(mockPhone);
    renderPage();
    await screen.findByRole("heading", { level: 1 });
    expect(
      screen.getByRole("radiogroup", { name: "Select color" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radiogroup", { name: "Select storage" })
    ).toBeInTheDocument();
  });

  it("updates price when storage is selected", async () => {
    const user = userEvent.setup();
    jest.spyOn(api, "getPhone").mockResolvedValue(mockPhone);
    renderPage();
    await screen.findByRole("heading", { level: 1 });
    await user.click(screen.getByRole("radio", { name: "512 GB" }));
    expect(screen.getByText("1429 EUR")).toBeInTheDocument();
  });

  it("ADD button is disabled without complete selection", async () => {
    jest.spyOn(api, "getPhone").mockResolvedValue(mockPhone);
    renderPage();
    await screen.findByRole("heading", { level: 1 });
    expect(screen.getByRole("button", { name: /ADD/i })).toBeDisabled();
  });

  it("ADD button is enabled with color and storage selected", async () => {
    const user = userEvent.setup();
    jest.spyOn(api, "getPhone").mockResolvedValue(mockPhone);
    renderPage();
    await screen.findByRole("heading", { level: 1 });
    await user.click(screen.getByRole("radio", { name: "256 GB" }));
    await user.click(screen.getByRole("radio", { name: "Titanium Black" }));
    expect(screen.getByRole("button", { name: /ADD/i })).toBeEnabled();
  });

  it("shows technical specifications", async () => {
    jest.spyOn(api, "getPhone").mockResolvedValue(mockPhone);
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("SPECIFICATIONS")).toBeInTheDocument();
      expect(screen.getByText("Snapdragon 8 Gen 3")).toBeInTheDocument();
    });
  });
});
