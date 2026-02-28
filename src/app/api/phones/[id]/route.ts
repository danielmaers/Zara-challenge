import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL!;
const API_KEY = process.env.API_KEY!;

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${params.id}`, {
      headers: { "x-api-key": API_KEY },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Phone not found" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Phone not found" },
      { status: 503 }
    );
  }
}
