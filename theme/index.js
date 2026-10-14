import { readFileSync } from "node:fs";
import { ContentPage } from "../quartz-engine/.quartz/plugins/content-page/dist/index.js";
import { Backlinks } from "../quartz-engine/.quartz/plugins/backlinks/dist/index.js";
import { Search } from "../quartz-engine/.quartz/plugins/search/dist/index.js";
import { CrawlLinks } from "../quartz-engine/.quartz/plugins/crawl-links/dist/index.js";
import { h, cloneElement } from "../quartz-engine/node_modules/preact/dist/preact.module.js";
import { installHero } from "./hero.js";
import { localConnections, graphGeometry, titleLines } from "./garden.js";

const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8") + "\n" + readFileSync(new URL("./hero.css", import.meta.url), "utf8");
const text = (value) => ({ type: "text", value });
const element = (tagName, properties = {}, children = []) => ({
  type: "element", tagName, properties, children,
});
const link = (label, href, properties = {}) => element("a", { href, ...properties }, [text(label)]);
const containsHeading = (node) => node.tagName === "h1" || (node.children ?? []).some(containsHeading);

export const manifest = {
  name: "mehridian-presentation",
  displayName: "Mehridian presentation",
  version: "0.3.0",
  category: ["transformer", "pageType"],
  quartzVersion: ">=5.0.0",
};

export function MehridianPresentation() {
  return {
    name: "MehridianPresentation",
    externalResources() {
      return { css: [{ content: styles, inline: true }] };
    },
    htmlPlugins(ctx = { allSlugs: [] }) {
      return [() => (tree, file) => {
        // Resolve a copy of the authored content with Quartz itself, before adding
        // shared navigation. Header/footer links are not knowledge relationships.
        const authoredFile = { data: { slug: file.data.slug } };
        CrawlLinks({ markdownLinkResolution: "shortest", externalLinkIcon: false })
          .htmlPlugins(ctx)[0]()(structuredClone(tree), authoredFile);
        file.data.mehridianLinks = authoredFile.data.links;
        const slug = String(file.data.slug ?? "index");
        const base = "../".repeat(Math.max(0, slug.split("/").length - 1)) || "./";
        const home = `${base}index.md`;
        const projects = `${base}projects/index.md`;
        const notes = `${base}notes/index.md`;
        const isHome = slug === "index";
        const isProject = slug.startsWith("projects/");
        const isNote = slug.startsWith("notes/");
        const mode = String(file.data.frontmatter?.presentation ?? "note");
        if (isHome && mode === "home") installHero(tree);
        // installHero replaces decorative nodes, not authored text or links.
        const body = [...tree.children];
        // Ordinary connected notes need no copied HTML/CSS or page shell.
        if (!body.some(containsHeading)) {
          body.unshift(element("h1", {}, [text(String(file.data.frontmatter?.title ?? file.data.title ?? "Note"))]));
        }
        const brand = link("Mehridian", home, { className: ["mehr-brand"] });
        const nav = element("header", { className: ["mehr-header"] }, [
          brand,
          element("nav", { ariaLabel: "Main navigation" }, [
            link("Home", home, isHome ? { ariaCurrent: "page" } : {}),
            link("Projects", projects, isProject ? { ariaCurrent: slug === "projects/index" ? "page" : "location" } : {}),
            link("Notes", notes, isNote ? { ariaCurrent: slug === "notes/index" ? "page" : "location" } : {}),
          ]),
        ]);
        const footer = element("footer", { className: ["mehr-footer"] }, [
          element("div", {}, [
            element("span", { className: ["mehr-brand-small"] }, [text("Mehridian")]),
            element("p", {}, [text("Independent engineering & research.")]),
          ]),
          element("nav", { ariaLabel: "Footer navigation" }, [
            link("Home", home),
            link("Projects", projects),
            link("Notes", notes),
            link("GitHub profile ↗", "https://github.com/Seemorghdev"),
            link("Site source ↗", "https://github.com/Seemorghdev/mehridian-site"),
          ]),
        ]);
        tree.children = [
          link("Skip to content", "#mehr-content", { className: ["mehr-skip"] }),
          nav,
          element("div", { id: "mehr-content", className: ["mehr-content", `mehr-${mode}`] }, body),
          footer,
        ];
      }];
    },
  };
}

// One page-type factory per category is supported by the pinned Quartz loader.
// Keep authored indexes and readable notes on the normal content renderer.
export function MehridianProjectIndex() {
  const page = ContentPage();
  const renderContent = page.body();
  const search = Search({ enablePreview: false });
  const renderNote = connectedNoteBody();
  const body = props => {
    const slug = String(props.fileData?.slug);
    if (!slug.startsWith("notes/")) return renderContent(props);
    const article = slug !== "notes/index" ? renderNote(props) : renderContent(props);
    return insertSections(article, "start", h("div", { class: "mehr-note-tools" },
      h(search, props), h("span", {}, "Search published pages · Ctrl/Cmd + K")));
  };
  body.css = [renderNote.css, search.css];
  body.afterDOMLoaded = [search.afterDOMLoaded, readFileSync(new URL("./search-accessibility.js", import.meta.url), "utf8")];
  return {
    ...page,
    name: "MehridianAuthoredPages",
    priority: 20,
    match: ({ slug }) => slug === "projects/index" || slug.startsWith("notes/"),
    body: () => body,
  };
}

// Reuse Quartz's real backlink selector/renderer with the parsed public file graph.
// Place it after the readable note, rather than in the intentionally hidden sidebar.
function connectedNoteBody() {
  const page = ContentPage();
  const backlinks = Backlinks();
  const renderContent = page.body();
  const body = props => {
    const article = renderContent(props);
    return insertSections(article, "end",
      props.fileData.frontmatter?.graph === false ? null : connectionMap(props),
      h("aside", { class: "mehr-note-backlinks", "aria-label": "Backlinks" }, h(backlinks, props)),
    );
  };
  body.css = backlinks.css;
  return body;
}

function insertSections(article, position, ...inserted) {
  const wrapper = article.props.children;
  const content = wrapper.props.children;
  const sections = Array.isArray(content.props.children) ? content.props.children : [content.props.children];
  const target = sections.findIndex(node => position === "start"
    ? node?.props?.id === "mehr-content" : node?.type === "footer");
  const at = target < 0 ? sections.length : target;
  const connected = cloneElement(content, {}, ...sections.slice(0, at), ...inserted.filter(Boolean), ...sections.slice(at));
  return cloneElement(article, {}, cloneElement(wrapper, {}, connected));
}

function connectionMap(props) {
  const map = localConnections(props.fileData, props.allFiles);
  const geometry = graphGeometry(map);
  const prefix = "../".repeat(Math.max(0, String(props.fileData.slug).split("/").length - 1)) || "./";
  const href = node => `${prefix}${node.route ?? node.slug}`;
  return h("details", { class: "mehr-local-graph" },
    h("summary", {}, "Explore this note’s connections"),
    h("p", { class: "mehr-graph-caption" }, "Published pages linked to or from this note. Select a node to read it. Navigation links are excluded."),
    h("svg", { viewBox: `0 0 320 ${geometry.height}`, class: "mehr-graph-map", role: "group", "aria-label": "Local published-page connections" },
      ...geometry.edges.map(edge => h("path", { d: edge, class: "mehr-graph-edge", "aria-hidden": "true" })),
      ...geometry.nodes.map(node => h("a", {
        href: href(node), "aria-label": `Read ${node.title}`, class: `mehr-graph-node${node.current ? " is-current" : ""}`,
      }, h("title", {}, node.title),
      h("rect", { x: node.x - node.width / 2, y: node.y - 32, width: node.width, height: 64, rx: 9 }),
      h("text", { x: node.x, y: node.y, textAnchor: "middle", "aria-hidden": "true" },
        ...titleLines(node.title, node.current ? 30 : 17).map((line, i, lines) =>
          h("tspan", { x: node.x, dy: i === 0 ? `${-(lines.length - 1) * 0.6}em` : "1.2em" }, line))))),
    ),
    h("p", { class: "mehr-graph-caption" }, map.neighbors.length
      ? `${map.neighbors.length} connected published ${map.neighbors.length === 1 ? "page" : "pages"}. ${map.neighbors.length > 6 ? "The diagram shows six; all are linked below. " : ""}Lines show a link in either direction, not endorsement or shared evidence.`
      : "No connections to other published pages yet."),
    h("ul", { class: "mehr-graph-links", "aria-label": "Connected pages — text alternative" },
      ...map.neighbors.map(node => h("li", {}, h("a", { href: href(node) }, node.title)))),
  );
}
