// Quartz-compatible state, set synchronously in <head> before content paints.
(() => {
  let saved=null;
  try { saved=localStorage.getItem('theme'); } catch {}
  const theme=saved==='light'||saved==='dark'?saved:
    (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.setAttribute('saved-theme',theme);
  document.documentElement.style.colorScheme=theme;
})();
