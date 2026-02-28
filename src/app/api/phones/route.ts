import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL!;
const API_KEY = process.env.API_KEY!;

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");
  const url = search
    ? `${API_BASE_URL}/products?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/products`;

  try {
    const response = await fetch(url, {
      headers: { "x-api-key": API_KEY },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch phones" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const unique = Array.from(
      new Map(data.map((p: { id: string }) => [p.id, p])).values()
    );
    const result = search ? unique : unique.slice(0, 20);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch phones" },
      { status: 503 }
    );
  }
}
