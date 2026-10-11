(() => {
 const root=document.documentElement;
 const overlay=document.querySelector('.cinematic-intro');
 const skip=document.querySelector('.intro-skip');
 const replay=document.querySelector('.intro-replay');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let endTimer, cleanupTimer, returnFocus;
 function finish(){
  clearTimeout(endTimer);clearTimeout(window.introFailsafe);
  const restoreFocus=overlay.contains(document.activeElement);
  root.classList.remove('intro-pending');
  document.querySelectorAll('[data-intro-inert]').forEach(el=>{el.inert=false;el.removeAttribute('data-intro-inert');});
  overlay.classList.remove('intro-leaving');
  if(restoreFocus)(returnFocus || document.querySelector('#main')).focus({preventScroll:true});
 }
 function dismiss(){clearTimeout(endTimer);clearTimeout(cleanupTimer);overlay.classList.add('intro-leaving');cleanupTimer=setTimeout(finish,reduced.matches?0:600);}
 function play(replaying=false){
  clearTimeout(cleanupTimer);clearTimeout(endTimer);clearTimeout(window.introFailsafe);
  if(reduced.matches){finish();return;}
  returnFocus=replaying?replay:null;
  overlay.classList.remove('intro-leaving');
  root.classList.add('intro-pending');
  document.querySelectorAll('body > .header, body > main, body > footer, body > .skip').forEach(el=>{el.inert=true;el.setAttribute('data-intro-inert','');});
  try{sessionStorage.setItem('sg-intro-seen','1');}catch(_){}
  skip.focus({preventScroll:true});
  endTimer=setTimeout(dismiss,3400);
  window.introFailsafe=setTimeout(finish,6500);
 }
 skip.addEventListener('click',dismiss);
 overlay.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();dismiss();}if(e.key==='Tab'){e.preventDefault();skip.focus();}});
 replay.addEventListener('click',()=>play(true));
 reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
 if(root.classList.contains('intro-pending'))play();
})();
