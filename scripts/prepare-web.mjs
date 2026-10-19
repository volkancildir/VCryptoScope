import { cp, mkdir, rm } from "node:fs/promises";

const files = [
  "index.html",
  "analysis.html",
  "news.html",
  "news.json",
  "manifest.json",
  "icon.svg",
  "privacy.html",
];
await rm("www", { recursive: true, force: true });
await mkdir("www", { recursive: true });
for (const file of files) await cp(file, `www/${file}`);
console.log(`Prepared ${files.length} web assets in www/.`);
