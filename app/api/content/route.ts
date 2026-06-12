import { NextResponse } from "next/server";
import { appendJsonItem, readJsonList, writeJsonList, type ContentItem } from "@/lib/storage";

const allowedTypes = new Set(["image", "video", "link", "case", "news"]);

export async function GET() {
  const items = await readJsonList<ContentItem>("content.json");
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.title || !body?.url || !allowedTypes.has(body?.type)) {
    return NextResponse.json(
      { error: "Title, type, and url are required." },
      { status: 400 },
    );
  }

  const item: ContentItem = {
    id: crypto.randomUUID(),
    title: String(body.title).trim(),
    type: body.type,
    url: String(body.url).trim(),
    description: body.description ? String(body.description).trim() : "",
    createdAt: new Date().toISOString(),
  };

  await appendJsonItem<ContentItem>("content.json", item);
  return NextResponse.json({ item }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Content id is required." }, { status: 400 });
  }

  const items = await readJsonList<ContentItem>("content.json");
  const nextItems = items.filter((item) => item.id !== id);
  await writeJsonList<ContentItem>("content.json", nextItems);

  return NextResponse.json({ ok: true });
}
