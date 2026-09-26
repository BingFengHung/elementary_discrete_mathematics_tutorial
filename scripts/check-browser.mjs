import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright-core';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const site=path.join(root,'_site');
const base='/elementary_discrete_mathematics_tutorial';
const screenshots=path.join(root,'test-artifacts');
await fs.mkdir(screenshots,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(!pathname.startsWith(base+'/')){res.writeHead(404);res.end();return;}
  const suffix=pathname.slice(base.length+1);
  const filename=path.resolve(site,suffix+(pathname.endsWith('/')?'index.html':''));
  if(!filename.startsWith(site+path.sep)){res.writeHead(403);res.end();return;}
  const data=await fs.readFile(filename);res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true});
try{
 for(const viewport of [{width:1365,height:900},{width:390,height:844}]){
  const context=await browser.newContext({viewport,colorScheme:'light',serviceWorkers:'allow'});
  const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(origin+base+'/');
  assert.equal(await page.locator('.lesson-card').count(),21);
  await page.waitForFunction(()=>document.getElementById('offline-status').textContent.includes('全套 21 篇文章已可離線閱讀'),{},{timeout:45000});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Homepage must fit '+viewport.width);
  await page.screenshot({path:path.join(screenshots,'home-'+viewport.width+'.png')});
  await page.locator('[data-card-day="1"]').click();
  await page.waitForSelector('#lesson-content');
  assert.equal(await page.locator('h1').textContent(),'玩具怎麼分？認識集合');
  assert.equal(await page.locator('.prose > blockquote p').count(),2,'Task and materials should be separate paragraphs');
  assert.equal(await page.locator('.answers').getAttribute('open'),null);
  await page.locator('.answers summary').click();
  assert.equal(await page.locator('.answers ol li').count(),3);
  assert.equal(await page.locator('.answers').getAttribute('open'),'');
  await page.locator('#complete-lesson').click();
  assert.equal(await page.locator('#complete-lesson').getAttribute('aria-pressed'),'true');
  await page.locator('#font-larger').click();
  await page.reload();
  assert.equal(await page.locator('#complete-lesson').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('.prose').evaluate(el=>getComputedStyle(el).fontSize),'22px');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Article must fit '+viewport.width);
  await page.screenshot({path:path.join(screenshots,'lesson-'+viewport.width+'.png')});
  await page.locator('#theme-toggle').click();
  await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.goto(origin+base+'/');
  assert.equal(await page.locator('#course-progress').getAttribute('value'),'1');
  assert.equal(await page.locator('#continue-reading').getAttribute('href'),base+'/days/day-02/');
  await context.setOffline(true);
  await page.goto(origin+base+'/days/day-21/');
  assert.equal(await page.locator('h1').textContent(),'設計你的數學闖關遊戲');
  await page.reload();
  await page.locator('.answers summary').click();
  assert.equal(await page.locator('.answers ol li').count(),3);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Offline article must fit');
  await page.goto(origin+base+'/not-a-real-page/');
  assert.equal(await page.locator('h1').textContent(),'這個頁面還沒有儲存。');
  assert.deepEqual(errors,[],'No browser JavaScript errors');
  await context.close();console.log('PASS browser '+viewport.width+': layout, answers, progress, font, theme, offline unread chapter and fallback');
 }
 const noJS=await browser.newContext({javaScriptEnabled:false});
 const page=await noJS.newPage();await page.goto(origin+base+'/days/day-01/');
 await page.locator('.answers summary').click();assert.equal(await page.locator('.answers ol li').count(),3);
 assert.equal(await page.locator('h1').textContent(),'玩具怎麼分？認識集合');await noJS.close();
 console.log('PASS no-JavaScript reading and native answer disclosure');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
