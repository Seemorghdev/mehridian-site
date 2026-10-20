// Decorative geometry, not telemetry, simulation output, or an engineering claim.
const el = (tagName, properties = {}, children = []) => ({ type: "element", tagName, properties, children });
const path = (d, properties = {}) => el("path", { d, ...properties });
const circle = (cx, cy, r, properties = {}) => el("circle", { cx, cy, r, ...properties });
const line = (x1, y1, x2, y2, properties = {}) => el("line", { x1, y1, x2, y2, ...properties });
const label = (value, x, y) => el("text", { x, y, fill: "#637a76", stroke: "none", "font-size": 8, "font-family": "monospace", "letter-spacing": 1.4 }, [{ type: "text", value }]);
const group = (children, properties = {}) => el("g", properties, children);

function surveyFrame() {
  return group([
    ...[76, 143, 210, 277, 344].flatMap(p => [line(p, 48, p, 354), line(48, p, 372, p)]),
  ], { stroke: "#637a76", "stroke-width": .45, opacity: .27 });
}

function meridian() {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = i * Math.PI / 18;
    const outer = i % 3 === 0 ? 152 : 148;
    return line(210 + Math.cos(a) * 144, 195 + Math.sin(a) * 144,
      210 + Math.cos(a) * outer, 195 + Math.sin(a) * outer);
  });
  return [surveyFrame(),
    group(ticks, { stroke: "#637a76", "stroke-width": .8, opacity: .57 }),
    group([
      el("ellipse", { cx: 0, cy: 0, rx: 113, ry: 113 }),
      ...[26, 59, 89].map(rx => el("ellipse", { cx: 0, cy: 0, rx, ry: 113 })),
      ...[-73, -38, 0, 38, 73].map(y => el("ellipse", { cx: 0, cy: y, rx: Math.sqrt(113 ** 2 - y ** 2), ry: 12 })),
    ], { transform: "translate(210 195) rotate(-24)", stroke: "#637a76", "stroke-width": .85, opacity: .66 }),
    group([
      el("ellipse", { cx: 0, cy: 0, rx: 136, ry: 53, stroke: "#995037", "stroke-width": 1.15, opacity: .68 }),
      el("ellipse", { cx: 0, cy: 0, rx: 152, ry: 66, stroke: "#637a76", "stroke-width": .7, opacity: .43 }),
    ], { transform: "translate(210 195) rotate(-24)" }),
    line(77, 254, 344, 136, { stroke: "#995037", "stroke-width": 1.15, opacity: .74 }),
    circle(210, 195, 4.4, { fill: "#995037" }),
    group([group([circle(136, 0, 5, { fill: "#995037" }), circle(136, 0, 9, { stroke: "#995037", "stroke-width": .7, opacity: .3 })], { className: ["meridian-traveller"] })], { transform: "translate(210 195) rotate(-24) scale(1 .39)" }),
    group([group([circle(152, 0, 3, { fill: "#637a76", opacity: .8 })], { className: ["meridian-companion"] })], { transform: "translate(210 195) rotate(-24) scale(1 .434)" }),
    label("N", 207, 28), label("S", 207, 373), label("W", 31, 198), label("E", 382, 198),
  ];
}

function flight() {
  return [surveyFrame(),
    group(Array.from({ length: 11 }, (_, i) => {
      const y = 56 + i * 28;
      return path(`M 28 ${y} C 155 ${y + 100}, 193 ${y - 60}, 391 ${y - 25}`);
    }), { stroke: "#637a76", "stroke-width": .8, opacity: .34 }),
    path("M 32 312 C 126 296, 192 183, 353 97", { stroke: "#995037", "stroke-width": 1.5, opacity: .7 }),
    path("M 43 331 C 152 272, 191 147, 341 71", { stroke: "#995037", "stroke-width": .55, "stroke-dasharray": "2 8", opacity: .45 }),
    group([path("M -34 4 L 12 -7 L 28 -2 L 12 3 Z"), line(-11, 0, -2, -24), line(-11, 0, -4, 22)], { transform: "translate(226 179) rotate(-36)", stroke: "#2e4a55", "stroke-width": 1, fill: "none" }),
    ...[[32,312],[173,227],[353,97]].map(([x,y]) => circle(x,y,3,{ fill: "#995037" })),
  ];
}

function signals() {
  const curves = Array.from({ length: 19 }, (_, i) => {
    const y = 70 + i * 14;
    return path(`M 28 ${y} C 124 ${y - 76}, 163 ${y + 96}, 222 ${y + 4} S 318 ${y - 73}, 392 ${y + 15}`);
  });
  return [surveyFrame(), group(curves, { stroke: "#637a76", "stroke-width": .7, opacity: .4 }),
    path("M 28 182 C 124 106, 163 278, 222 186 S 318 109, 392 197", { stroke: "#995037", "stroke-width": 1.3, opacity: .8 }),
    ...[[87,173],[151,191],[222,186],[300,153],[360,184]].map(([x,y],i) => group([circle(x,y,3,{ fill: i===2?"#995037":"#637a76" }),circle(x,y,8,{ stroke:"#637a76", "stroke-width":.55, opacity:.35 })])),
  ];
}

export function createHero(direction = "meridian") {
  const drawings = { meridian, flight, signals };
  if (!drawings[direction]) throw new Error(`Unknown hero direction: ${direction}`);
  return el("svg", { viewBox: "0 0 420 420", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: ["mehr-hero-art", `hero-${direction}`], "aria-hidden": "true", focusable: "false" }, drawings[direction]());
}

export function installHero(tree) {
  const walk = node => {
    if (node.tagName === "div" && (node.properties?.className ?? []).includes("field")) {
      node.children = [createHero(), ...node.children.filter(child => child.tagName !== "svg")];
      return el("div", { className: ["hero-visual"] }, [node,
        el("label", { className: ["hero-motion-control"] }, [
          el("input", { type: "checkbox", className: ["hero-motion-pause"], ariaLabel: "Pause decorative hero motion" }),
          el("span", {}, [{ type: "text", value: "Pause motion" }]),
        ]),
      ]);
    }
    if (node.children) node.children = node.children.map(walk);
    return node;
  };
  walk(tree);
}

// Build-time serializer used only by the local three-direction review generator.
export function heroMarkup(direction) {
  const escape = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
  const serialize = node => node.type === "text" ? escape(node.value) :
    `<${node.tagName} ${Object.entries(node.properties).map(([key,value]) => `${key === "className" ? "class" : key}="${escape(Array.isArray(value)?value.join(" "):value)}"`).join(" ")}>${node.children.map(serialize).join("")}</${node.tagName}>`;
  return serialize(createHero(direction));
}
