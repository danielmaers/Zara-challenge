import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar/SearchBar";

describe("SearchBar", () => {
  it("renderiza el input y el contador de resultados", () => {
    render(<SearchBar onSearch={jest.fn()} resultCount={20} />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByText("20 RESULTS")).toBeInTheDocument();
  });

  it("muestra '1 RESULT' en singular", () => {
    render(<SearchBar onSearch={jest.fn()} resultCount={1} />);
    expect(screen.getByText("1 RESULT")).toBeInTheDocument();
  });

  it("llama a onSearch con debounce tras escribir", async () => {
    jest.useFakeTimers();
    const onSearch = jest.fn();
    const user = userEvent.setup({ delay: null });
    render(<SearchBar onSearch={onSearch} resultCount={0} />);

    await user.type(screen.getByRole("searchbox"), "samsung");
    expect(onSearch).not.toHaveBeenCalled();

    act(() => jest.runAllTimers());
    expect(onSearch).toHaveBeenCalledWith("samsung");

    jest.useRealTimers();
  });
});
