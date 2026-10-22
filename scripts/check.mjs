import {readFile,readdir,stat} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import assert from 'node:assert/strict';
async function walk(path){let all=[];for(const entry of await readdir(path,{withFileTypes:true})){const file=join(path,entry.name);all.push(...entry.isDirectory()?await walk(file):[file]);}return all;}
const files=await walk('dist');
const preview=await readFile('dist/og-image.png');
assert.equal(preview.subarray(0,8).toString('hex'),'89504e470d0a1a0a','Preview must be a PNG');
assert.equal(preview.readUInt32BE(16),1200,'Preview width');
assert.equal(preview.readUInt32BE(20),630,'Preview height');
assert.equal(files.filter(f=>/^dist\/incidents\/.*\.html$/.test(f)).length,27);
assert(!files.some(f=>/HANDOFF|emudhra-verify|sbi-filing|\.env/.test(f)));
let links=0;
for(const file of files.filter(f=>f.endsWith('.html'))){
 const content=await readFile(file,'utf8');
 const url='https://meefs.github.io/watershed-wednesday/'+file.replace(/^dist\//,'').replace(/^index\.html$/,'');
 assert(content.includes(`<link rel="canonical" href="${url}">`),file+' canonical URL');
 assert(content.includes('<meta property="og:image" content="https://meefs.github.io/watershed-wednesday/og-image.png">'),file+' Open Graph preview');
 assert(content.includes('<meta name="twitter:card" content="summary_large_image">'),file+' large image card');
 assert(!/-----BEGIN [A-Z ]*PRIVATE KEY-----|\/Users\/[^/]+\/|rate.limit reset|Related local kit/.test(content),file+' contains local/private material');
 for(const match of content.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){
   const url=match[1].split('#')[0];
   if(/^(?:https?:|mailto:|data:)/.test(url)||url.startsWith('/watershed-wednesday/'))continue;
   const target=resolve(dirname(file),decodeURIComponent(url),url.endsWith('/')?'index.html':'');
   assert((await stat(target)).isFile(),file+' → '+url);links++;
 }
}
const home=await readFile('dist/index.html','utf8');
assert.equal((home.match(/class="incident-card"/g)||[]).length,27);
for(const id of ['directory','actions','triage','open-items'])assert(home.includes(`id="${id}"`));
console.log(`Checked 27 incident pages, 27 cards, ${links} local asset/content links and public artifact boundaries.`);
