import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { appendJsonItem, type ContentItem } from "@/lib/storage";

const uploadDir = path.join(process.cwd(), "public", "uploads");
const maxSize = 120 * 1024 * 1024;

function safeName(name: string) {
  const ext = path.extname(name).toLowerCase();
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);

  return `${Date.now()}-${base || "asset"}${ext}`;
}

export async function POST(request: Request) {
  if (process.env.NETLIFY) {
    return NextResponse.json(
      {
        error:
          "File upload needs object storage in production. Local uploads work in development; use Aliyun OSS, Netlify Blobs, or S3 for the live site.",
      },
      { status: 501 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (file.size > maxSize) {
    return NextResponse.json({ error: "File is larger than 120MB." }, { status: 400 });
  }

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (!isImage && !isVideo) {
    return NextResponse.json({ error: "Only image and video files are supported." }, { status: 400 });
  }

  await mkdir(uploadDir, { recursive: true });
  const fileName = safeName(file.name);
  const bytes = await file.arrayBuffer();
  await writeFile(path.join(uploadDir, fileName), Buffer.from(bytes));

  const item: ContentItem = {
    id: crypto.randomUUID(),
    title: String(formData.get("title") || file.name).trim(),
    type: isImage ? "image" : "video",
    url: `/uploads/${fileName}`,
    description: String(formData.get("description") || "").trim(),
    createdAt: new Date().toISOString(),
  };

  await appendJsonItem<ContentItem>("content.json", item);
  return NextResponse.json({ item }, { status: 201 });
}
