// Reuse Quartz's saved-theme / theme storage key / themechange mechanism.
// Explicit saved choice wins over system changes; blocked storage is harmless.
(() => {
  let manual=false;
  try { manual=['light','dark'].includes(localStorage.getItem('theme')); } catch {}
  const system=matchMedia('(prefers-color-scheme: dark)');
  function sync(){
    const dark=document.documentElement.getAttribute('saved-theme')==='dark';
    document.body.classList.toggle('theme-dark',dark);
    document.body.classList.toggle('theme-light',!dark);
    document.querySelectorAll('.mehr-theme-toggle').forEach(button=>{
      button.textContent=dark?'Light':'Dark';
      button.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} appearance`);
      button.setAttribute('aria-pressed',String(dark));
    });
  }
  function apply(theme){
    document.documentElement.setAttribute('saved-theme',theme);
    document.documentElement.style.colorScheme=theme;
    sync();document.dispatchEvent(new CustomEvent('themechange',{detail:{theme}}));
  }
  function setup(){
    sync();document.querySelectorAll('.mehr-theme-toggle').forEach(button=>{
      if(button.dataset.bound) return;button.dataset.bound='true';
      button.addEventListener('click',()=>{
        const next=document.documentElement.getAttribute('saved-theme')==='dark'?'light':'dark';
        manual=true;try{localStorage.setItem('theme',next);}catch{}apply(next);
      });
    });
  }
  system.addEventListener('change',event=>{if(!manual)apply(event.matches?'dark':'light');});
  document.addEventListener('nav',setup);document.addEventListener('render',setup);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
