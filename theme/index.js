import { readFileSync } from "node:fs";
import { ContentPage } from "../quartz-engine/.quartz/plugins/content-page/dist/index.js";
import { Backlinks } from "../quartz-engine/.quartz/plugins/backlinks/dist/index.js";
import { h, cloneElement } from "../quartz-engine/node_modules/preact/dist/preact.module.js";
import { installHero } from "./hero.js";

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
    htmlPlugins() {
      return [() => (tree, file) => {
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
  const renderNote = connectedNoteBody();
  const body = props => String(props.fileData?.slug).startsWith("notes/") && props.fileData.slug !== "notes/index"
    ? renderNote(props) : renderContent(props);
  body.css = renderNote.css;
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
    const wrapper = article.props.children;
    const content = wrapper.props.children;
    const sections = Array.isArray(content.props.children) ? content.props.children : [content.props.children];
    const footerAt = sections.findIndex(node => node?.type === "footer");
    const at = footerAt < 0 ? sections.length : footerAt;
    const connected = cloneElement(content, {}, ...sections.slice(0, at),
      h("aside", { class: "mehr-note-backlinks", "aria-label": "Backlinks" }, h(backlinks, props)),
      ...sections.slice(at));
    return cloneElement(article, {}, cloneElement(wrapper, {}, connected));
  };
  body.css = backlinks.css;
  return body;
}
