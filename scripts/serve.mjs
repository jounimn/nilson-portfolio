import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../site", import.meta.url)));
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8" };

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const requested = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
    const target = resolve(root, `.${requested}`);
    if (target !== root && !target.startsWith(`${root}${sep}`)) throw new Error("Invalid path");
    const body = await readFile(target);
    response.writeHead(200, { "Content-Type": types[extname(target)] ?? "application/octet-stream", "Cache-Control": "no-cache" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(Number(process.env.PORT || 4178), "127.0.0.1", () => {
  console.log(`Portfolio preview: http://127.0.0.1:${server.address().port}`);
});
