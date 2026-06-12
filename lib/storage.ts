import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const bundledDataDir = path.join(process.cwd(), "data");
const writableDataDir =
  process.env.EVERFLUX_DATA_DIR ||
  (process.env.NETLIFY ? path.join("/tmp", "everflux-data") : bundledDataDir);

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
  await mkdir(writableDataDir, { recursive: true });
}

async function readJsonFile<T>(filePath: string): Promise<T[] | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return null;
  }
}

export async function readJsonList<T>(fileName: string): Promise<T[]> {
  const writablePath = path.join(writableDataDir, fileName);
  const writableList = await readJsonFile<T>(writablePath);

  if (writableList) {
    return writableList;
  }

  const bundledPath = path.join(bundledDataDir, fileName);

  if (bundledPath !== writablePath) {
    const bundledList = await readJsonFile<T>(bundledPath);

    if (bundledList) {
      return bundledList;
    }
  }

  return [];
}

export async function appendJsonItem<T>(fileName: string, item: T): Promise<T> {
  const list = await readJsonList<T>(fileName);
  list.unshift(item);
  await ensureDataDir();
  await writeFile(path.join(writableDataDir, fileName), JSON.stringify(list, null, 2));
  return item;
}

export async function writeJsonList<T>(fileName: string, list: T[]): Promise<void> {
  await ensureDataDir();
  await writeFile(path.join(writableDataDir, fileName), JSON.stringify(list, null, 2));
}
