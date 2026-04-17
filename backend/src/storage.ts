import fs from "fs";
import path from "path";

const STORE_PATH = path.resolve(__dirname, "../data-store.json");

export function loadStore<T>(defaultData: T): T {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      fs.writeFileSync(STORE_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }

    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    fs.writeFileSync(STORE_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
}

export function saveStore<T>(data: T) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
}
