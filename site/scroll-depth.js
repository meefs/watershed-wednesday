// Owns transforms on two decorative elements; never pass the content wrapper.
export function createScrollDepth({shader, terrain, isPaused = () => false}) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, drift = 0, target = 0, disposed = false;
  const stop = () => { cancelAnimationFrame(frame); frame = 0; };
  function refresh() {
    if (disposed) return;
    if (reduced.matches) {
      stop(); drift = 0;
      shader.style.transform = 'none'; terrain.style.transform = 'none';
      return;
    }
    if (isPaused() || document.hidden) { stop(); return; }
    target = Math.sin(window.scrollY / 1600) * 8;
    if (!frame) frame = requestAnimationFrame(step);
  }
  function step() {
    drift += (target - drift) * .12;
    shader.style.transform = `translate3d(0,${drift.toFixed(3)}px,0)`;
    terrain.style.transform = `translate3d(0,${(drift*.35).toFixed(3)}px,0) scale(1.025)`;
    frame = Math.abs(target-drift) > .015 ? requestAnimationFrame(step) : 0;
  }
  window.addEventListener('scroll', refresh, {passive:true});
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', refresh);
  document.addEventListener('visibilitychange', refresh);
  reduced.addEventListener('change', refresh);
  refresh();
  return {refresh, dispose() {
    disposed = true; stop();
    window.removeEventListener('scroll', refresh);
    window.removeEventListener('pagehide', stop);
    window.removeEventListener('pageshow', refresh);
    document.removeEventListener('visibilitychange', refresh);
    reduced.removeEventListener('change', refresh);
    shader.style.transform = ''; terrain.style.transform = '';
  }};
}
