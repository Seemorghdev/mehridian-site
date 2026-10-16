import { readFileSync } from "node:fs";
import { ContentPage } from "../quartz-engine/.quartz/plugins/content-page/dist/index.js";
import { Backlinks } from "../quartz-engine/.quartz/plugins/backlinks/dist/index.js";
import { Search } from "../quartz-engine/.quartz/plugins/search/dist/index.js";
import { CrawlLinks } from "../quartz-engine/.quartz/plugins/crawl-links/dist/index.js";
import { h, cloneElement } from "../quartz-engine/node_modules/preact/dist/preact.module.js";
import { installHero } from "./hero.js";
import Graph from "./.graph-build/index.js";
import { publishedConnections, publishedPages } from "./connections.js";
import { readingExcerpt, readingOnly, rebaseReadingAnchors } from './reading.js';
import { applyPagePolicy, gateBacklinkPreviews } from './page-policy.js';

const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8") + "\n" + readFileSync(new URL("./hero.css", import.meta.url), "utf8") + "\n" + readFileSync(new URL("./graph.css", import.meta.url), "utf8") + '\n' + readFileSync(new URL('./reading.css',import.meta.url),'utf8');
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
      return { css: [{ content: styles, inline: true }], js:[{
        script:readFileSync(new URL('./theme-init.js',import.meta.url),'utf8'),
        contentType:'inline',loadTime:'beforeDOMReady',
      }] };
    },
    htmlPlugins(ctx = { allSlugs: [] }) {
      return [() => (tree, file) => {
        // Resolve a copy of the authored content with Quartz itself, before adding
        // shared navigation. Header/footer links are not knowledge relationships.
        const authoredFile = { data: { slug: file.data.slug } };
        file.data.mehridianExcerpt = readingExcerpt(tree);
        CrawlLinks({ markdownLinkResolution: "shortest", externalLinkIcon: false })
          .htmlPlugins(ctx)[0]()(structuredClone(tree), authoredFile);

        const slug = String(file.data.slug ?? "index");
        const base = "../".repeat(Math.max(0, slug.split("/").length - 1)) || "./";
        const home = `${base}index.md`;
        const projects = `${base}projects/index.md`;
        const notes = `${base}notes/index.md`;
        const isHome = slug === "index";
        const isProject = slug.startsWith("projects/");
        const isNote = slug.startsWith("notes/") || slug.startsWith("research/");
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
          element('button',{type:'button',className:['mehr-theme-toggle'],ariaLabel:'Switch to dark appearance',ariaPressed:'false'},[text('Dark')]),
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
          element("div", { id: "mehr-content", className: ["mehr-content", `mehr-${mode}`, 'popover-hint'] }, body),
          footer,
        ];
        CrawlLinks({ markdownLinkResolution:"shortest", externalLinkIcon:false }).htmlPlugins(ctx)[0]()(tree,file);
        rebaseReadingAnchors(tree.children.find(n=>n.properties?.id==='mehr-content'),slug);
        applyPagePolicy(tree, slug);
        file.data.links = authoredFile.data.links;
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
    if (!slug.startsWith("notes/") && !slug.startsWith("research/")) return readingOnly(renderContent(props),cloneElement);
    const article = readingOnly(slug !== "notes/index" ? renderNote(props) : renderContent(props),cloneElement);
    return insertSections(article, "start", h("div", { class: "mehr-note-tools" },
      h(search, props), h("span", {}, "Search published pages · Ctrl/Cmd + K")));
  };
  body.css = [renderNote.css, search.css].flat().join('\n');
  body.afterDOMLoaded = [renderNote.afterDOMLoaded, search.afterDOMLoaded, readFileSync(new URL("./search-accessibility.js", import.meta.url), "utf8"),readFileSync(new URL('./theme-controls.js',import.meta.url),'utf8')].flat().join('\n');
  return {
    ...page,
    name: "MehridianAuthoredPages",
    priority: 20,
    match: ({ slug }) => slug === 'index' || slug.startsWith('projects/') || slug.startsWith("notes/") || slug.startsWith("research/"),
    body: () => body,
  };
}

// Reuse Quartz's real backlink selector/renderer with the parsed public file graph.
// Place it after the readable note, rather than in the intentionally hidden sidebar.
function connectedNoteBody() {
  const page = ContentPage();
  const backlinks = Backlinks();
  const graph = Graph({localGraph:{depth:1,linkDistance:140,repelForce:1.4,fontSize:1,opacityScale:4,showTags:true},globalGraph:{depth:-1,linkDistance:140,repelForce:1.4,fontSize:1,opacityScale:4,showTags:true}});
  const renderContent = page.body();
  const body = props => {
    const article = renderContent(props);
    return insertSections(article, "end",
      props.fileData.frontmatter?.graph === false ? null : connectionMap(props, graph),
      h("aside", { class: "mehr-note-backlinks", "aria-label": "Backlinks" },
        gateBacklinkPreviews(backlinks(props), String(props.fileData.slug), cloneElement)),
    );
  };
  body.css = [backlinks.css,graph.css].join('\n');
  body.afterDOMLoaded = [graph.afterDOMLoaded, readFileSync(new URL("./graph-controls.js",import.meta.url),"utf8")].join('\n');
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

function connectionMap(props, graph) {
  const map = publishedConnections(props.fileData, props.allFiles);
  const pages = publishedPages(props.allFiles);
  const prefix = "../".repeat(Math.max(0,String(props.fileData.slug).split('/').length-1)) || './';
  const href = node => prefix + (node.slug === 'index' ? '' : node.slug.replace(/\/index$/, '/'));
  const widget=graph(props);
  const previewIndex=JSON.stringify(Object.fromEntries(pages.map(f=>[String(f.slug).replace(/\/index$/,'').replace(/\/$/,''),{title:f.frontmatter.title,excerpt:f.mehridianExcerpt??''}])));
  function addPreviews(node){
    if(node?.props?.class==='graph-container'||node?.props?.class==='global-graph-container')return cloneElement(node,{'data-preview-index':previewIndex});
    if(!node?.props?.children)return node;
    const children=Array.isArray(node.props.children)?node.props.children:[node.props.children];
    return cloneElement(node,{},...children.map(addPreviews));
  }
  const previewWidget=addPreviews(widget);
  const modal=previewWidget.props.children[2];
  const withLinks=cloneElement(modal, {role:'dialog','aria-modal':'true','aria-label':'Published knowledge graph'},
    ...(Array.isArray(modal.props.children)?modal.props.children:[modal.props.children]),
    h('button',{type:'button',class:'graph-close'},'Close graph'),
    h('nav',{class:'global-text-links','aria-label':'All published pages — text alternative'},...pages.map(f=>h('a',{href:href(f),'data-no-popover':'true'},f.frontmatter.title))));
  return h('section',{class:'mehr-native-graph','aria-label':'Explore connections'},
    h('h2',{},'Explore the connections'),
    h('p',{},'Authored links between published pages. Connections do not imply shared evidence or endorsement.'),
    h('button',{class:'graph-enable',type:'button','aria-expanded':'false'},'Enable interactive graph'),
    h('p',{class:'graph-motion-notice'},'Reduced motion is enabled. Explore through the connected-page links and backlinks below.'),
    h('div',{class:'native-graph-host',hidden:true},cloneElement(previewWidget,{},...previewWidget.props.children.slice(0,2),withLinks)),
    h('p',{class:'graph-instructions'},'Drag nodes to arrange them; scroll or pinch to zoom; drag empty space to pan. Hover or Tab to a node for a preview; click or press Enter to read it. Open the full map with the corner button. Escape closes it.'),
    h('nav',{class:'local-text-links','aria-label':'Connected pages — text alternative'},...map.neighbors.map(f=>h('a',{href:href(f),'data-no-popover':'true'},f.frontmatter.title))));
}
