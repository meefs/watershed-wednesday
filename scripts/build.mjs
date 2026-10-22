import {readFile, writeFile, mkdir, readdir, copyFile, rm} from 'node:fs/promises';
import {join, dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';
import {build} from 'esbuild';
import {renderPage} from '../site/template.mjs';

process.chdir(new URL('..', import.meta.url).pathname);
const out = 'dist';
const imageVersion = createHash('sha256').update(await readFile('site/og-image.png')).digest('hex').slice(0,12);
await rm(out, {recursive:true, force:true});
await mkdir(join(out,'assets'), {recursive:true});
await mkdir(join(out,'incidents'), {recursive:true});
await mkdir(join(out,'source/incidents'), {recursive:true});
const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text = s => String(s).replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/<[^>]+>/g,'').replace(/[*`_✅]/g,'').trim();
const slug = s => text(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function html(markdown, base='./') {
  let rendered=marked.parse(markdown, {gfm:true});
  rendered=rendered.replace(/href="([^"]+\.md)(#[^"]*)?"/g,(_,url,hash='')=> {
    if (/^https?:/.test(url)) return `href="${url}${hash}"`;
    return `href="${base}${url.replace(/^\.\.\//,'').replace(/\.md$/,'.html')}${hash}"`;
  });
  rendered=rendered.replace(/href="incidents\/"/g,`href="${base}#directory"`);
  rendered=rendered.replace(/<h([1-6])>(.*?)<\/h\1>/gs,(_,level,body)=>`<h${level} id="${slug(body)}">${body}</h${level}>`);
  rendered=sanitizeHtml(rendered,{allowedTags:sanitizeHtml.defaults.allowedTags.concat(['input','del']),allowedAttributes:{...sanitizeHtml.defaults.allowedAttributes,'*':['id','class'],input:['type','disabled','checked']},allowedSchemes:['https','http','mailto'],transformTags:{input:()=>({tagName:'input',attribs:{type:'checkbox',disabled:''}})}});
  // Keep task checkboxes as printable reference lists rather than implying team progress.
  return rendered.replace(/<table>/g,'<div class="table-wrap" role="region" aria-label="Scrollable reference table" tabindex="0"><table>').replace(/<\/table>/g,'</table></div>');
}
async function page(path, title, description, body, kind='reference') {
  const base=path.startsWith('incidents/')?'../':'./';
  await writeFile(join(out,path),renderPage({title,description,body,base,kind,path,imageVersion}));
}
const report = await readFile('Watershed-Wednesday.md','utf8');
const tokens = marked.lexer(report);
const table = tokens.find(t=>t.type==='table' && t.header?.some(c=>c.text==='Incident'));
if (!table || table.rows.length!==27) throw new Error('Expected exactly 27 incident rows');
const files=(await readdir('incidents')).filter(f=>f.endsWith('.md')).sort();
if(files.length!==27) throw new Error('Expected exactly 27 detail files');
const cards=table.rows.map(row=>{
  const cells=row.map(c=>c.text); const id=Number(cells[0]);
  const file=files.find(f=>f.startsWith(String(id).padStart(2,'0')+'-'));
  if(!file) throw new Error('Missing incident '+id);
  const priority=text(cells[8]);
  const actions=['patch','rotate','hunt','distrust','notify','migrate','restrict'].filter(a=>priority.toLowerCase().includes(a) || (a==='notify' && priority.toLowerCase().includes('monitor'))).join(' ');
  return `<article class="incident-card" data-search="${escape(text(cells.join(' ')))}" data-actions="${escape(actions)}"><span class="incident-number">INCIDENT ${String(id).padStart(2,'0')}</span><h3><a href="./incidents/${file.replace('.md','.html')}">${escape(text(cells[1]))}</a></h3><div class="tags">${priority.split('·').map(t=>`<span class="tag">${escape(t.trim())}</span>`).join('')}</div><p class="card-summary">${marked.parseInline(cells[7])}</p><p class="card-meta"><strong>Affected:</strong> ${marked.parseInline(cells[6])}</p><p class="card-source">${marked.parseInline(cells[9])}</p><a class="card-link" href="./incidents/${file.replace('.md','.html')}">Read incident ${String(id).padStart(2,'0')} <span aria-hidden="true">↗</span></a></article>`;
}).join('\n');
const directory=`<section id="directory" class="directory"><div class="section-kicker">02 / Incident directory</div><h2>Find your exposure.</h2><p>Search the 27 incidents by product, CVE, affected version or response. Original thread numbers are preserved.</p><div class="directory-tools"><label for="incident-search">Search incidents<input id="incident-search" type="search" placeholder="Product, CVE, response…" autocomplete="off"></label><label for="action-filter">Response<select id="action-filter"><option value="all">All responses</option><option value="patch">Patch</option><option value="rotate">Rotate</option><option value="hunt">Hunt</option><option value="distrust">Distrust</option><option value="notify">Notify & monitor</option><option value="migrate">Migrate</option></select></label></div><p id="result-count" role="status" aria-live="polite">27 incidents</p><div class="incident-grid">${cards}</div><p id="no-results" hidden>No incidents match. Try a product name or clear the filters.</p></section>`;
const sections=report.split(/(?=^## \d+\.)/m);
const intro=sections[0].replace(/^# .+\n/,'');
const triage=sections.find(s=>s.startsWith('## 1.'));
const master=sections.find(s=>s.startsWith('## 2.'));
const actions=sections.find(s=>s.startsWith('## 3.'));
const open=sections.find(s=>s.startsWith('## 4.'));
const body=`<header class="hero"><p class="eyebrow">October 2026 edition · Security operations field guide</p><h1>Watershed<br>Wednesday<span class="title-dot">.</span></h1><p class="dek">27 incidents. A practical route from disclosure to response.</p><p class="hero-origin">Starting point: <a href="https://x.com/aisafetymemes/status/2113113711644737835">@aisafetymemes’ original thread ↗</a></p><div class="stats"><span>Patch</span><span>Rotate</span><span>Hunt</span><span>Distrust</span></div></header><aside class="principle"><p class="eyebrow">The operating principle</p><h2>Find your exposure.<br>Follow the source.</h2><p>A dated guide to acting on security disclosures, with authoritative references and open questions beside the guidance.</p></aside><div class="prose">${html(intro)}</div><section id="triage" class="prose">${html(triage)}</section>${directory}<section id="master-table"><details class="wide-index"><summary>Open the full source and exposure table · 27 incidents</summary><div class="prose">${html(master)}</div></details></section><section id="actions" class="prose">${html(actions)}</section><section id="open-items" class="prose">${html(open)}</section>`;
await page('index.html','Watershed Wednesday — October 2026','A dated security operations field guide to 27 incidents: patch, rotate, hunt and distrust, with source attribution.',body,'home');
for(const file of files){
  const md=await readFile(join('incidents',file),'utf8');
  const title=md.split('\n')[0].replace(/^#\s*#?/,'').trim();
  const index=files.indexOf(file);
  const nav=`<nav class="incident-nav" aria-label="Incident navigation">${index>0?`<a href="./${files[index-1].replace('.md','.html')}">← Previous</a>`:'<span></span>'}<a href="../#directory">All incidents</a>${index<files.length-1?`<a href="./${files[index+1].replace('.md','.html')}">Next →</a>`:'<span></span>'}</nav>`;
  const body=`${nav}<p class="eyebrow">October 2026 edition · Research snapshot 2026-10-22</p><article class="prose">${html(md.replace(/^# #/,'# '),'../')}</article><p class="source-link"><a href="../source/incidents/${file}">Download Markdown source</a> · <a href="https://github.com/meefs/watershed-wednesday/blob/main/incidents/${file}">View on GitHub</a></p>${nav}`;
  await page('incidents/'+file.replace('.md','.html'),title,'Incident details, operational guidance, source attribution and unresolved questions.',body,'incident');
  await copyFile(join('incidents',file),join(out,'source/incidents',file));
}
for(const file of ['link-check.md','verification.md','ATTRIBUTION.md','CONTRIBUTING.md','README.md']){
  const md=await readFile(file,'utf8');
  await page(file.replace('.md','.html'),text(md.split('\n')[0].replace(/^# /,'')),'Project methodology and reference.',`<article class="prose">${html(md)}</article>`);
  await copyFile(file,join(out,'source',file));
}
await copyFile('Watershed-Wednesday.md',join(out,'source/Watershed-Wednesday.md'));
await page('Watershed-Wednesday.html','Operations guide — October 2026','Canonical operations guide.',`<article class="prose">${html(report)}</article>`);
await build({entryPoints:['site/site.js'],bundle:true,format:'esm',minify:true,outfile:join(out,'assets/site.js'),legalComments:'eof',target:['es2022']});
await copyFile('site/site.css',join(out,'assets/site.css'));
await copyFile('site/og-image.png',join(out,'og-image.png'));
let notices='Watershed Wednesday — third-party notices\n\n@paper-design/shaders 0.0.81\n';
for(const file of ['LICENSE','NOTICE']) {
  try {notices+='\n'+await readFile(join('node_modules/@paper-design/shaders',file),'utf8')+'\n';}catch(e){if(file==='LICENSE') throw e;}
}
notices+='\nOther build dependencies are listed in package-lock.json. Generated original content has no blanket reuse license; see ATTRIBUTION.md.\n';
await writeFile(join(out,'assets/THIRD-PARTY-NOTICES.txt'),notices);
await writeFile(join(out,'.nojekyll'),'');
await writeFile(join(out,'404.html'),renderPage({title:'Page not found',description:'Return to the field guide.',body:'<article class="prose"><h1>Page not found.</h1><p><a href="/watershed-wednesday/">Return to Watershed Wednesday</a>.</p></article>',base:'/watershed-wednesday/',kind:'reference',path:'404.html',imageVersion}));
console.log('Built October 2026 edition: 27 incident pages, searchable directory and source downloads.');
