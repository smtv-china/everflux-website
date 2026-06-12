import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: string;
  createdAt: string;
};

export type ContentItem = {
  id: string;
  title: string;
  type: "image" | "video" | "link" | "case" | "news";
  url: string;
  description?: string;
  createdAt: string;
};

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

export async function readJsonList<T>(fileName: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(dataDir, fileName);

  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export async function appendJsonItem<T>(fileName: string, item: T): Promise<T> {
  const list = await readJsonList<T>(fileName);
  list.unshift(item);
  await writeFile(path.join(dataDir, fileName), JSON.stringify(list, null, 2));
  return item;
}

export async function writeJsonList<T>(fileName: string, list: T[]): Promise<void> {
  await ensureDataDir();
  await writeFile(path.join(dataDir, fileName), JSON.stringify(list, null, 2));
}
