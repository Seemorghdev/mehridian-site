import http from "node:http";
import { fileURLToPath } from "node:url";
import handler from "../quartz-engine/node_modules/serve-handler/src/index.js";

const publicDirectory = fileURLToPath(new URL("../preview/", import.meta.url));
const prefix = "/mehridian-site";
const port = Number(process.env.MEHRIDIAN_PREVIEW_PORT ?? 8175);
http.createServer((req, res) => {
  if (!req.url.startsWith(`${prefix}/`) && req.url !== prefix) {
    res.writeHead(302, { Location: `${prefix}/` });
    res.end();
    return;
  }
  req.url = req.url.slice(prefix.length) || "/";
  handler(req, res, { public: publicDirectory, cleanUrls: true, directoryListing: false });
}).listen(port, "127.0.0.1", () => {
  console.log(`Mehridian review preview: http://127.0.0.1:${port}${prefix}/`);
});
