// Accessibility and opt-in controls; rendering is exclusively official Quartz.
document.querySelectorAll('.mehr-native-graph').forEach(section => {
  const button=section.querySelector('.graph-enable');
  const host=section.querySelector('.native-graph-host');
  const modal=section.querySelector('.global-graph-outer');
  const opener=section.querySelector('.global-graph-icon');
  const close=section.querySelector('.graph-close');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  function hide(){
    host.hidden=true;
    button.setAttribute('aria-expanded','false');
    button.textContent='Enable interactive graph';
    document.dispatchEvent(new CustomEvent('mehridian:graph-close'));
  }
  button.addEventListener('click',()=>{
    if(motion.matches) return;
    if(!host.hidden) return hide();
    host.hidden=false;
    button.setAttribute('aria-expanded','true');
    button.textContent='Hide interactive graph';
    document.dispatchEvent(new CustomEvent('mehridian:graph-open'));
  });
  motion.addEventListener('change',e=>{if(e.matches) hide();});
  close.addEventListener('click',()=>document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})));
  new MutationObserver(()=>{
    if(modal.classList.contains('active')) close.focus();
    else if(!host.hidden && !motion.matches) opener.focus();
  }).observe(modal,{attributes:true,attributeFilter:['class']});
  modal.addEventListener('keydown',e=>{
    if(e.key!=='Tab') return;
    const targets=[close,...modal.querySelectorAll('nav a[href]')];
    const at=targets.indexOf(document.activeElement);
    e.preventDefault();targets[(at+(e.shiftKey?-1:1)+targets.length)%targets.length].focus();
  });
});
