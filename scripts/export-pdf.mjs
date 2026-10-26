import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const root = resolve(fileURLToPath(new URL("../site", import.meta.url)));
const output = resolve(root, "downloads/nilson-lopes-portfolio.pdf");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".txt": "text/plain; charset=utf-8" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const target = resolve(root, `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`);
    if (target !== root && !target.startsWith(`${root}${sep}`)) throw new Error("Invalid path");
    response.writeHead(200, { "Content-Type": types[extname(target)] ?? "application/octet-stream" });
    response.end(await readFile(target));
  } catch {
    response.writeHead(404).end();
  }
});

await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
let browser;
try {
  const executablePath = process.env.PORTFOLIO_BROWSER || undefined;
  browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const port = server.address().port;
  const combined = await PDFDocument.create();
  for (const language of ["pt", "en"]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
    await page.goto(`http://127.0.0.1:${port}/?lang=${language}&export=1`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print", colorScheme: "dark" });
    await page.evaluate(() => document.fonts.ready);
    const bytes = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true });
    const localePdf = await PDFDocument.load(bytes);
    const copied = await combined.copyPages(localePdf, localePdf.getPageIndices());
    copied.forEach((pdfPage) => combined.addPage(pdfPage));
    await page.close();
  }
  await mkdir(resolve(root, "downloads"), { recursive: true });
  await writeFile(output, await combined.save());
  console.log(`Wrote bilingual PDF: ${output} (${combined.getPageCount()} pages)`);
} finally {
  await browser?.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
