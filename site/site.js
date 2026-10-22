import { ShaderMount, getShaderColorFromString as rgba } from '@paper-design/shaders';
import { fractalPresets, fractalField } from './fractal-field.js';
import { createScrollDepth } from './scroll-depth.js';
const root = document.documentElement;
const canvas = document.getElementById('camo');
const ctx = canvas.getContext('2d');
const prefix = 'watershed-wednesday-2026:';
const read = (key, fallback) => { try { return localStorage.getItem(prefix + key) ?? fallback; } catch { return fallback; } };
const save = (key, value) => { try { localStorage.setItem(prefix + key, value); } catch {} };
const valid = (value, choices, fallback) => choices.includes(value) ? value : fallback;
const bounded = (value, low, high, fallback) => Number.isFinite(+value) ? Math.max(low, Math.min(high, +value)) : fallback;
const state = {
  theme: valid(read('theme', 'navy'), ['army','navy','arctic','red','pink'], 'navy'),
  mode: valid(read('mode', 'dark'), ['light','dark'], 'dark'),
  size: valid(read('size', 'm'), ['s','m','l'], 'm'),
  scale: valid(+read('scale', 16), [16,10,5], 16),
  field: valid(+read('field', 0), fractalPresets.map(p => p[2]), 0),
  brightness: bounded(read('brightness', 75), 15, 100, 75),
  paused: read('paused', 'false') === 'true',
  seed: 0x7f31ac9,
};
let mount = null, shaderFailed = false, away = false;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const layer = document.getElementById('fractal-layer');
const paused = () => state.paused || reduced.matches || document.hidden || away;
const depth = createScrollDepth({shader: document.getElementById('fractal-background'), terrain: canvas, isPaused: paused});
      const palettes = {
        dark: {
          army:['#060a03','#101706','#1a240b','#263011','#364019'],
          navy:['#040a1c','#0d1a32','#153052','#24476e','#3e6383'],
          arctic:['#0c0e10','#15191e','#20262c','#2b333b','#38424b'],
          red:['#100304','#210608','#350b0f','#4c1218','#681d24'],
          pink:['#13070d','#25101a','#3b1827','#522238','#703049'],
        },
        light: {
          army:['#c0c5a9','#cbd0b6','#d6dac2','#e0e3cf','#e8eadb'],
          navy:['#bccbd2','#c7d4da','#d2dde1','#dde6e9','#e7edef'],
          arctic:['#c3cbce','#cdd4d6','#d7dddf','#e1e6e7','#e9eded'],
          red:['#c9b5b2','#d5c1be','#dfcdca','#e8d9d6','#efe3e1'],
          pink:['#ceb5bf','#d8c1ca','#e1cdd4','#e9d9df','#f0e3e7'],
        },
      }
      function rng(seed){ let s=seed>>>0; return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296} }
      function noise(rand,w,h){
        const grid=Float32Array.from({length:w*h},rand)
        return(x,y)=>{
          const u=Math.max(0,Math.min(1,x))*(w-1),v=Math.max(0,Math.min(1,y))*(h-1)
          const ix=Math.min(Math.floor(u),w-2),iy=Math.min(Math.floor(v),h-2),fx=u-ix,fy=v-iy
          const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy)
          const a=grid[iy*w+ix],b=grid[iy*w+ix+1],c=grid[(iy+1)*w+ix],d=grid[(iy+1)*w+ix+1]
          return a*(1-sx)*(1-sy)+b*sx*(1-sy)+c*(1-sx)*sy+d*sx*sy
        }
      }
      function rgb(hex){return[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)]}
      function draw(){
        const scale=Math.min(devicePixelRatio||1,2),W=canvas.width=Math.ceil(innerWidth*scale),H=canvas.height=Math.ceil(innerHeight*scale),cell=Math.round(state.scale*scale)
        canvas.style.width=`${innerWidth}px`;canvas.style.height=`${innerHeight}px`
        const gw=Math.ceil(W/cell),gh=Math.ceil(H/cell),mw=Math.max(3,Math.round(W/(280*scale))),mh=Math.max(3,Math.round(H/(280*scale)))
        const macro=noise(rng(state.seed),mw,mh),warpX=noise(rng(state.seed^0xf0f0f0),mw,mh),warpY=noise(rng(state.seed^0x5a5a5a),mw,mh)
        const mid=noise(rng(state.seed^0xabcdef),Math.max(4,Math.round(W/(50*scale))),Math.max(4,Math.round(H/(50*scale)))),grain=rng(state.seed^0xdead)
        const colors=palettes[state.mode][state.theme].map(rgb),off=document.createElement('canvas');off.width=gw;off.height=gh
        const oc=off.getContext('2d'),image=oc.createImageData(gw,gh)
        for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){
          const nx=x/gw,ny=y/gh,wx=(warpX(nx,ny)-.5)*.42,wy=(warpY(nx,ny)-.5)*.42
          const value=macro(Math.max(0,Math.min(1,nx+wx)),Math.max(0,Math.min(1,ny+wy)))*.62+mid(nx,ny)*.26+grain()*.12
          const color=colors[Math.min(4,Math.floor(value*5))],i=(y*gw+x)*4
          image.data[i]=color[0];image.data[i+1]=color[1];image.data[i+2]=color[2];image.data[i+3]=255
        }
        oc.putImageData(image,0,0);ctx.imageSmoothingEnabled=false;ctx.drawImage(off,0,0,W,H)
      }
function colors() {
  const css = getComputedStyle(root);
  return {u_ink: rgba(css.getPropertyValue('--accent').trim()), u_ground: rgba(css.getPropertyValue('--bg').trim()), u_cellSize: state.scale, u_variant: state.field};
}
function motion() {
  if (mount) mount.setSpeed(paused() ? 0 : .45);
  const label = shaderFailed || !mount ? 'Static terrain' : reduced.matches ? 'Reduced motion' : document.hidden || away ? 'Suspended' : state.paused ? 'Paused' : 'Motion on';
  const control = document.getElementById('motion-control');
  control.disabled = !mount || reduced.matches;
  control.textContent = state.paused ? 'Resume motion' : 'Pause motion';
  if (!mount) control.textContent = 'Static terrain';
  if (reduced.matches && mount) control.textContent = 'Reduced motion';
  control.setAttribute('aria-pressed', String(state.paused));
  document.getElementById('motion-state').textContent = label + (reduced.matches ? ' · system preference' : ' · settings saved on this device');
  document.getElementById('motion-summary').textContent = '· ' + label;
  depth.refresh();
}
function apply() {
  root.dataset.theme = state.theme; root.dataset.mode = state.mode; root.dataset.size = state.size;
  root.style.setProperty('--field-opacity', String(state.brightness / 100 * (state.mode === 'light' ? .72 : 1)));
  root.style.setProperty('--terrain-opacity', String(.35 + state.brightness / 100 * .6));
  document.querySelector('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue('--bg').trim();
  document.querySelectorAll('[data-theme-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === state.theme)));
  document.querySelectorAll('[data-size-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.sizeChoice === state.size)));
  document.querySelectorAll('[data-scale-choice]').forEach(button => button.setAttribute('aria-pressed', String(+button.dataset.scaleChoice === state.scale)));
  const mode = document.getElementById('mode-control');
  mode.textContent = state.mode === 'dark' ? 'Light mode' : 'Dark mode';
  mode.setAttribute('aria-label', `Switch to ${state.mode === 'dark' ? 'light' : 'dark'} mode`);
  mode.setAttribute('aria-pressed', String(state.mode === 'light'));
  document.getElementById('fractal-choice').value = String(state.field);
  document.getElementById('field-brightness').value = String(state.brightness);
  document.getElementById('brightness-value').value = state.brightness + '%';
  if (ctx) draw();
  if (mount) mount.setUniforms(colors());
  motion();
}
function change(key, value) { state[key] = value; save(key, value); apply(); }
document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => change('theme', button.dataset.themeChoice)));
document.querySelectorAll('[data-size-choice]').forEach(button => button.addEventListener('click', () => change('size', button.dataset.sizeChoice)));
document.querySelectorAll('[data-scale-choice]').forEach(button => button.addEventListener('click', () => change('scale', +button.dataset.scaleChoice)));
document.getElementById('mode-control').addEventListener('click', () => change('mode', state.mode === 'dark' ? 'light' : 'dark'));
document.getElementById('motion-control').addEventListener('click', () => change('paused', !state.paused));
document.getElementById('fractal-choice').addEventListener('change', event => change('field', +event.target.value));
document.getElementById('field-brightness').addEventListener('input', event => change('brightness', +event.target.value));
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (ctx) draw(); }, 160); });
document.addEventListener('visibilitychange', motion);
reduced.addEventListener('change', motion);
window.addEventListener('pagehide', () => { away = true; motion(); });
window.addEventListener('pageshow', () => { away = false; motion(); });
apply();
try {
  // Speed starts at zero so saved Pause and reduced-motion state apply before animation.
  mount = new ShaderMount(layer, fractalField, {
    u_fit:2, u_scale:1, u_rotation:0, u_offsetX:0, u_offsetY:0,
    u_originX:.5, u_originY:.5, u_worldWidth:0, u_worldHeight:0, ...colors(),
  }, {alpha:true, antialias:false}, 0, 18000, 1, 300000);
  const shaderCanvas = layer.querySelector('canvas');
  if (shaderCanvas) shaderCanvas.addEventListener('webglcontextlost', () => {
    shaderFailed = true; mount?.setSpeed(0); mount?.dispose(); mount = null; layer.replaceChildren(); motion();
  });
} catch {
  shaderFailed = true; mount?.dispose(); mount = null; layer.replaceChildren();
}
motion();
const search = document.getElementById('incident-search');
const filter = document.getElementById('action-filter');
const cards = [...document.querySelectorAll('.incident-card')];
if (search && filter) {
  function updateDirectory() {
    const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const action = filter.value.toLowerCase();
    let visible = 0;
    for (const card of cards) {
      const haystack = (card.dataset.search || card.textContent).toLowerCase();
      const actions = (card.dataset.actions || '').toLowerCase();
      const matches = terms.every(term => haystack.includes(term)) && (!action || action === 'all' || actions.includes(action));
      card.hidden = !matches; if (matches) visible++;
    }
    document.getElementById('result-count').textContent = visible === cards.length ? `All ${cards.length} incidents · original thread numbering` : `${visible} of ${cards.length} incidents${visible === 0 ? ' · try another search or action' : ''}`;
  }
  search.addEventListener('input', updateDirectory); filter.addEventListener('change', updateDirectory); updateDirectory();
}
// Long source tables remain independently scrollable at narrow viewports.
document.querySelectorAll('.prose table').forEach(table => {
  if (table.parentElement.classList.contains('table-wrap')) return;
  const wrapper = document.createElement('div'); wrapper.className = 'table-wrap';
  wrapper.tabIndex = 0; wrapper.setAttribute('role', 'region'); wrapper.setAttribute('aria-label', 'Scrollable reference table');
  table.before(wrapper); wrapper.append(table);
});
// Escape dismisses the display panel and returns focus to its summary.
const display = document.querySelector('.display-controls');
display.addEventListener('keydown', event => { if (event.key === 'Escape') { display.open = false; display.querySelector('summary').focus(); } });
