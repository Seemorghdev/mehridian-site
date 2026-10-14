// Small accessibility adapter for the existing Quartz Search modal. Its native
// search/index/result navigation remain unchanged. No network or storage access.
(() => {
  function enhanceSearch() {
    document.querySelectorAll(".mehr-note-tools .search").forEach(search => {
      if (search.dataset.mehridianAccessible) return;
      search.dataset.mehridianAccessible = "true";
      const panel = search.querySelector(".search-container");
      const button = search.querySelector(".search-button");
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.setAttribute("aria-label", "Search published Mehridian pages");
      const close = document.createElement("button");
      close.className = "mehr-search-close";
      close.type = "button";
      close.textContent = "Close search";
      close.addEventListener("click", () => {
        // Use Quartz's existing Escape handler rather than a second modal state.
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      });
      panel.querySelector(".search-space").prepend(close);
      panel.addEventListener("keydown", event => {
        if (event.key !== "Tab" || !panel.classList.contains("active")) return;
        const items = [close, panel.querySelector(".search-bar"), ...panel.querySelectorAll("a[href], button:not(.mehr-search-close)")]
          .filter(item => item && item.getClientRects().length);
        if (!items.length) return;
        const current = items.indexOf(document.activeElement);
        const next = (current + (event.shiftKey ? -1 : 1) + items.length) % items.length;
        event.preventDefault();
        event.stopPropagation();
        items[next].focus();
      }, true);
      button.setAttribute("aria-haspopup", "dialog");
    });
  }
  document.addEventListener("nav", enhanceSearch);
  enhanceSearch();
})();
