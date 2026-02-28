import { getPhones, getPhone } from "@/services/api";

describe("api", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getPhones", () => {
    it("fetches /api/phones without parameters", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: "SMG-S24U", name: "Galaxy S24 Ultra" }],
      });

      const result = await getPhones();

      expect(global.fetch).toHaveBeenCalledWith("/api/phones", {
        cache: "no-store",
      });
      expect(result).toEqual([{ id: "SMG-S24U", name: "Galaxy S24 Ultra" }]);
    });

    it("adds search parameter when query is passed", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await getPhones("samsung");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/phones?search=samsung",
        { cache: "no-store" }
      );
    });

    it("correctly encodes query with special characters", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await getPhones("galaxy s24");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/phones?search=galaxy%20s24",
        { cache: "no-store" }
      );
    });

    it("throws error if response is not ok", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(getPhones()).rejects.toThrow(
        "Failed to fetch phones"
      );
    });
  });

  describe("getPhone", () => {
    it("fetches /api/phones/:id", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "SMG-S24U", name: "Galaxy S24 Ultra" }),
      });

      const result = await getPhone("SMG-S24U");

      expect(global.fetch).toHaveBeenCalledWith("/api/phones/SMG-S24U", {
        cache: "no-store",
      });
      expect(result).toEqual({ id: "SMG-S24U", name: "Galaxy S24 Ultra" });
    });

    it("throws error if phone is not found", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(getPhone("NOT-FOUND")).rejects.toThrow(
        "Failed to fetch phone"
      );
    });
  });
});
