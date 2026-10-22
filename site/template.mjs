const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const themes = [['army','Army'],['navy','Navy'],['arctic','Arctic'],['red','Red'],['pink','Baker-Miller Pink']];
const fields = ['Fractal coastlines','Julia lace','Julia islands','Julia vines','Julia snow','Burning ship','Tricorn deltas','Cubic estuary','Seahorse valley'];
export function renderPage({title,description,body,base='./',kind='home',path='index.html'}) {
const siteUrl = 'https://meefs.github.io/watershed-wednesday/';
const pageUrl = new URL(path === 'index.html' ? '' : path, siteUrl).href;
const imageUrl = `${siteUrl}og-image.png`;
const imageAlt = 'Watershed Wednesday — October 2026 security operations field guide. 27 incidents: patch, rotate, hunt and distrust.';
return `<!doctype html>
<html lang="en" data-theme="navy" data-mode="dark" data-size="m"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2379c6f2'/%3E%3Ctext x='10' y='46' font-size='43' font-family='Georgia' font-weight='bold' fill='%23060d1f'%3EW%3C/text%3E%3C/svg%3E">
<meta name="theme-color" content="#060d1f"><link rel="canonical" href="${escape(pageUrl)}">
<meta property="og:site_name" content="Watershed Wednesday"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="${kind === 'home' ? 'website' : 'article'}"><meta property="og:url" content="${escape(pageUrl)}">
<meta property="og:image" content="${imageUrl}"><meta property="og:image:secure_url" content="${imageUrl}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${imageAlt}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${imageUrl}"><meta name="twitter:image:alt" content="${imageAlt}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800;9..144,900&family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/site.css"><script type="module" src="${base}assets/site.js"></script>
</head><body class="page-${escape(kind)}">
<a class="skip-link" href="#main-content">Skip to content</a>
<canvas id="camo" aria-hidden="true"></canvas><div id="fractal-background" aria-hidden="true"><div id="fractal-layer"></div></div><div class="scrim" aria-hidden="true"></div>
<header class="masthead"><a class="brand" href="${base}" aria-label="Watershed Wednesday home"><span class="brand-mark" aria-hidden="true">W<span>W</span></span><span>Watershed<br>Wednesday</span></a><nav aria-label="Main navigation"><a href="${base}">Overview</a><a href="${base}#directory">Directory</a><a href="${base}#actions">Actions</a><a href="https://github.com/meefs/watershed-wednesday">Source ↗</a></nav></header>
<details class="display-controls"><summary><span aria-hidden="true">◈</span> Display <span id="motion-summary">· Static terrain</span></summary><div class="display-panel">
<p class="control-title">Make room for reading</p>
<fieldset><legend>Color theme</legend><div class="theme-options">${themes.map(([id,label])=>`<button type="button" class="theme" data-theme-choice="${id}" aria-label="${label} theme" title="${label}" aria-pressed="${id==='navy'}"><span style="--swatch:${({army:'#c8ff4d',navy:'#79c6f2',arctic:'#d0d8e0',red:'#ff5c63',pink:'#ff91af'})[id]}"></span>${label}</button>`).join('')}</div></fieldset>
<div class="control-row"><button type="button" id="mode-control" aria-label="Switch to light mode" aria-pressed="false">Light mode</button><button type="button" id="motion-control" aria-pressed="false" disabled>Static terrain</button></div>
<fieldset><legend>Text size</legend><div class="segmented">${[['s','Compact'],['m','Standard'],['l','Large']].map(([id,label])=>`<button type="button" data-size-choice="${id}" aria-pressed="${id==='m'}">${label}</button>`).join('')}</div></fieldset>
<fieldset><legend>Terrain scale</legend><div class="segmented">${[[16,'Macro · 16'],[10,'Standard · 10'],[5,'Micro · 5']].map(([id,label])=>`<button type="button" data-scale-choice="${id}" aria-pressed="${id===16}">${label}</button>`).join('')}</div></fieldset>
<label class="control-label" for="fractal-choice">Fractal field</label><select id="fractal-choice">${fields.map((label,i)=>`<option value="${i}">${label}</option>`).join('')}</select>
<label class="control-label" for="field-brightness">Background brightness <output id="brightness-value">75%</output></label><input id="field-brightness" type="range" min="15" max="100" step="5" value="75">
<p class="control-note" id="motion-state" role="status">Static terrain · loading display</p>
</div></details>
<main class="wrap" id="main-content">${kind==='home'?'':`<div class="breadcrumb"><a href="${base}#directory">← All 27 incidents</a><span>October 2026 edition</span></div>`}${body}
<footer class="site-footer"><div><a class="footer-title" href="${base}">Watershed Wednesday</a><p>A security operations field guide.<br>Compiled 22 October 2026.</p></div><div><a href="https://x.com/aisafetymemes/status/2113113711644737835">Original thread ↗</a><a href="https://github.com/meefs/watershed-wednesday">Read the source ↗</a><a href="${base}assets/THIRD-PARTY-NOTICES.txt">Third-party notices</a></div><p class="footer-note">A dated research snapshot.<br>Confirm current guidance with primary sources.</p></footer>
</main><noscript><p class="noscript-note">All incident details and source links are available without JavaScript. Search and display controls require JavaScript.</p></noscript>
</body></html>`;
}
