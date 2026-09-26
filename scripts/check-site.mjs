import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {testServiceWorker} from './test-sw.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const site=path.join(root,'_site');
const config=await fs.readFile(path.join(root,'_config.yml'),'utf8');
const base=JSON.parse(config.match(/^baseurl:\s*(.+)$/m)[1]);
const origin='https://bingfenghung.github.io';
const localFile=url=>{const pathname=decodeURIComponent(new URL(url,origin).pathname);assert.ok(pathname.startsWith(base+'/'),'URL must include project base: '+url);const relative=pathname.slice(base.length+1);return path.join(site,relative+(pathname.endsWith('/')?'index.html':''));};
const pages=['/', '/offline.html','/404.html',...Array.from({length:21},(_,i)=>'/days/day-'+String(i+1).padStart(2,'0')+'/')];
for(const route of pages) {
  const html=await fs.readFile(localFile(base+route),'utf8');
  assert.ok(!/{{|{%/.test(html),'No unresolved Liquid in '+route);
  assert.match(html,/<html lang="zh-Hant">/);
  assert.match(html,/rel="manifest"/);
  if(route.startsWith('/days/')) {
    assert.match(html,/<h1>/);
    assert.match(html,/<details class="answers"/);
    assert.match(html,/<summary>查看解答與想法<\/summary>/);
    const answer=html.split('<summary>查看解答與想法</summary>')[1].split('</details>')[0];
    assert.match(answer,/<ol>/,'Kramdown must render answers inside details');
    assert.ok(!/markdown="1"/.test(answer));
    assert.ok((html.match(/<h2/g)||[]).length>=6);
  }
  for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const url=match[1];if(/^(https?:|mailto:|data:)/.test(url))continue;
    const resolved=new URL(url,origin+base+route);
    await fs.access(localFile(resolved.href));
  }
}
const manifest=JSON.parse(await fs.readFile(path.join(site,'manifest.webmanifest'),'utf8'));
assert.equal(manifest.start_url,base+'/');assert.equal(manifest.scope,base+'/');assert.equal(manifest.id,base+'/');assert.equal(manifest.display,'standalone');
for(const icon of manifest.icons)await fs.access(localFile(icon.src));
await testServiceWorker(await fs.readFile(path.join(site,'sw.js'),'utf8'),base);
const home=await fs.readFile(path.join(site,'index.html'),'utf8');
assert.equal((home.match(/data-card-day=/g)||[]).length,21);
console.log('PASS generated pages, links, answer rendering, manifest and offline worker');
