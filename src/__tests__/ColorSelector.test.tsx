import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ColorSelector from "@/components/ColorSelector/ColorSelector";
import { ColorOption } from "@/types";

const colors: ColorOption[] = [
  {
    name: "Midnight Black",
    hexCode: "#000000",
    imageUrl: "http://example.com/black.webp",
  },
  {
    name: "Pearl White",
    hexCode: "#FFFFFF",
    imageUrl: "http://example.com/white.webp",
  },
];

describe("ColorSelector", () => {
  it("renders all swatches", () => {
    render(
      <ColorSelector colors={colors} selected={null} onSelect={jest.fn()} />
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("calls onSelect with correct color when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <ColorSelector colors={colors} selected={null} onSelect={onSelect} />
    );
    await user.click(screen.getByRole("radio", { name: "Pearl White" }));
    expect(onSelect).toHaveBeenCalledWith(colors[1]);
  });

  it("marks selected color as aria-checked", () => {
    render(
      <ColorSelector
        colors={colors}
        selected="Midnight Black"
        onSelect={jest.fn()}
      />
    );
    expect(
      screen.getByRole("radio", { name: "Midnight Black" })
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("radio", { name: "Pearl White" })
    ).toHaveAttribute("aria-checked", "false");
  });

  it("shows the name of the selected color", () => {
    render(
      <ColorSelector
        colors={colors}
        selected="Midnight Black"
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText("Midnight Black")).toBeInTheDocument();
  });

  it("shows color name on hover", async () => {
    const user = userEvent.setup();
    render(
      <ColorSelector colors={colors} selected={null} onSelect={jest.fn()} />
    );
    await user.hover(screen.getByRole("radio", { name: "Pearl White" }));
    expect(screen.getByText("Pearl White")).toBeInTheDocument();
  });

  it("hides color name on unhover when no color is selected", async () => {
    const user = userEvent.setup();
    render(
      <ColorSelector colors={colors} selected={null} onSelect={jest.fn()} />
    );
    await user.hover(screen.getByRole("radio", { name: "Pearl White" }));
    await user.unhover(screen.getByRole("radio", { name: "Pearl White" }));
    expect(screen.queryByText("Pearl White")).not.toBeInTheDocument();
  });

  it("shows no name without selection or hover", () => {
    render(
      <ColorSelector colors={colors} selected={null} onSelect={jest.fn()} />
    );
    expect(screen.queryByText("Midnight Black")).not.toBeInTheDocument();
    expect(screen.queryByText("Pearl White")).not.toBeInTheDocument();
  });
});
