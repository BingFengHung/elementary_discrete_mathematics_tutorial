import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {testServiceWorker} from './test-sw.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = (await fs.readdir(path.join(root,'_lessons'))).filter(name=>name.endsWith('.md')).sort();
assert.equal(files.length,21);
for(let i=0;i<files.length;i++) {
  const source = await fs.readFile(path.join(root,'_lessons',files[i]),'utf8');
  assert.match(source,new RegExp('\\nday: ' + (i+1) + '\\n'));
  assert.match(source,/## 動手玩/);
  assert.match(source,/## 三道小挑戰/);
  assert.match(source,/<details class="answers" markdown="1">/);
  assert.match(source,/<summary>查看解答與想法<\/summary>/);
  assert.equal((source.match(/<details/g)||[]).length,1);
  assert.equal((source.match(/<\/details>/g)||[]).length,1);
  assert.ok(source.length > 1400,files[i] + ' should be a complete article');
  assert.ok(!/[条数说现规给画从赖换没]/.test(source),'Traditional Chinese: '+files[i]);
}
const app = await fs.readFile(path.join(root,'assets/js/app.js'),'utf8');
new vm.Script(app,{filename:'app.js'});
for(const [name,size] of [['icon-192.png',192],['icon-512.png',512],['maskable-512.png',512],['apple-touch-icon.png',180]]) {
  const png=await fs.readFile(path.join(root,'assets/icons',name));
  assert.equal(png.readUInt32BE(16),size); assert.equal(png.readUInt32BE(20),size);
}
const sw = await fs.readFile(path.join(root,'sw.js'),'utf8');
// Fixture rendering verifies worker behavior before Jekyll is available.
// check-site.mjs separately tests the actual Jekyll-generated worker.
for(const base of ['', '/elementary_discrete_mathematics_tutorial']) {
  const loop=Array.from({length:21},(_,i)=>',\n'+JSON.stringify(base+'/days/day-'+String(i+1).padStart(2,'0')+'/')).join('');
  const rendered=sw.replace(/^---[\s\S]*?---\s*/, '')
    .replace(/{% assign lessons[\s\S]*?{% endfor %}/,loop)
    .replace(/{{ site.time \| date: "%s" }}/g,'12345')
    .replace(/{{ '([^']*)' \| relative_url \| jsonify }}/g,(_,value)=>JSON.stringify(base+value));
  assert.ok(!rendered.includes('{{'));
  await testServiceWorker(rendered,base);
}
console.log('PASS 21 complete lessons, source syntax, PNG dimensions');
