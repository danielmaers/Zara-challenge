import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StorageSelector from "@/components/StorageSelector/StorageSelector";
import { StorageOption } from "@/types";

const options: StorageOption[] = [
  { capacity: "256 GB", price: 1229 },
  { capacity: "512 GB", price: 1329 },
  { capacity: "1 TB", price: 1529 },
];

describe("StorageSelector", () => {
  it("renders all options", () => {
    render(
      <StorageSelector options={options} selected={null} onSelect={jest.fn()} />
    );
    expect(screen.getByText("256 GB")).toBeInTheDocument();
    expect(screen.getByText("512 GB")).toBeInTheDocument();
    expect(screen.getByText("1 TB")).toBeInTheDocument();
  });

  it("calls onSelect with correct option", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <StorageSelector options={options} selected={null} onSelect={onSelect} />
    );
    await user.click(screen.getByText("512 GB"));
    expect(onSelect).toHaveBeenCalledWith({ capacity: "512 GB", price: 1329 });
  });

  it("marks selected option as aria-checked", () => {
    render(
      <StorageSelector
        options={options}
        selected="512 GB"
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText("512 GB")).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("256 GB")).toHaveAttribute("aria-checked", "false");
  });
});
