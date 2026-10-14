import http from "node:http";
import { fileURLToPath } from "node:url";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import handler from "../quartz-engine/node_modules/serve-handler/src/index.js";

const publicDirectory = fileURLToPath(new URL("../preview/", import.meta.url));
const prefix = "/mehridian-site";
const port = Number(process.env.MEHRIDIAN_PREVIEW_PORT ?? 8175);
const mountedLocation = location => {
  if (typeof location !== "string" || !location.startsWith("/")) return location;
  const unmounted = location === prefix ? "/" : location.startsWith(`${prefix}/`) ? location.slice(prefix.length) : location;
  const target = path.join(publicDirectory, unmounted);
  const trailingSlash = !unmounted.endsWith("/") && existsSync(target) && statSync(target).isDirectory() ? "/" : "";
  return prefix + unmounted + trailingSlash;
};
http.createServer((req, res) => {
  if (!req.url.startsWith(`${prefix}/`) && req.url !== prefix) {
    res.writeHead(302, { Location: `${prefix}/` });
    res.end();
    return;
  }
  // serve-handler sees the stripped mount path. Its clean-URL redirects must
  // retain the project prefix, just like the production GitHub Pages origin.
  const writeHead = res.writeHead.bind(res);
  res.writeHead = (status, ...args) => {
    const headers = args.find(value => value && typeof value === "object");
    for (const key of Object.keys(headers ?? {})) {
      if (key.toLowerCase() === "location") headers[key] = mountedLocation(headers[key]);
    }
    const location = res.getHeader("Location");
    if (location) res.setHeader("Location", mountedLocation(location));
    return writeHead(status, ...args);
  };
  req.url = req.url.slice(prefix.length) || "/";
  // Local QA fault injection only; not emitted or part of deployment.
  if (process.env.MEHRIDIAN_GRAPH_FAILURE_FIXTURE === '1' && req.url.startsWith('/static/graph/')) {
    res.writeHead(404);res.end('Controlled graph asset failure');return;
  }
  handler(req, res, { public: publicDirectory, cleanUrls: true, directoryListing: false });
}).listen(port, "127.0.0.1", () => {
  console.log(`Mehridian review preview: http://127.0.0.1:${port}${prefix}/`);
});
