import { NextResponse } from "next/server";
import { appendJsonItem, readJsonList, type Inquiry } from "@/lib/storage";

export async function GET() {
  const inquiries = await readJsonList<Inquiry>("inquiries.json");
  return NextResponse.json({ inquiries });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const inquiry: Inquiry = {
    id: crypto.randomUUID(),
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    phone: body.phone ? String(body.phone).trim() : "",
    company: body.company ? String(body.company).trim() : "",
    message: String(body.message).trim(),
    source: body.source ? String(body.source).trim() : "website",
    createdAt: new Date().toISOString(),
  };

  await appendJsonItem<Inquiry>("inquiries.json", inquiry);
  return NextResponse.json({ inquiry }, { status: 201 });
}
