import http from "node:http";
import { fileURLToPath } from "node:url";
import handler from "../quartz-engine/node_modules/serve-handler/src/index.js";

// The published site now lives at the custom-domain root, with no Pages project prefix.
const publicDirectory = fileURLToPath(new URL("../preview/", import.meta.url));
const port = Number(process.env.MEHRIDIAN_PREVIEW_PORT ?? 8175);

http.createServer((req, res) => {
  // Local QA fault injection only; never part of the production deployment.
  if (process.env.MEHRIDIAN_GRAPH_FAILURE_FIXTURE === "1" && req.url.startsWith("/static/graph/")) {
    res.writeHead(404);
    res.end("Controlled graph asset failure");
    return;
  }
  handler(req, res, { public: publicDirectory, cleanUrls: true, directoryListing: false });
}).listen(port, "127.0.0.1", () => {
  console.log(`Mehridian review preview: http://127.0.0.1:${port}/`);
});
