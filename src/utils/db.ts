import { readFileSync } from "fs";

export function getDbContent(dbFilePath: string) {
  const dbContent = JSON.parse(readFileSync(dbFilePath).toString());
  return dbContent;
}
