import assert from 'node:assert/strict';
import vm from 'node:vm';

export async function testServiceWorker(source, base) {
  const origin = 'https://example.test';
  const canonical = value => new URL(typeof value === 'string' ? value : value.url, origin).href;
  const stores = new Map();
  let offline = false;
  let failure = '';
  let serverError = false;
  let claimed = false;
  let skipped = false;
  const bodyFor = url => 'saved:' + new URL(url).pathname;
  const makeResponse = url => new Response(bodyFor(url), {status:200});
  const cacheAPI = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const map = stores.get(name);
      return {
        async addAll(requests) {
          const staged = [];
          for (const request of requests) {
            const url = canonical(request);
            if (offline || url.endsWith(failure || '__no_failure__')) throw new Error('Network error');
            staged.push([url, makeResponse(url)]);
          }
          for (const [url, response] of staged) map.set(url, response);
        },
        async match(request) { return map.get(canonical(request))?.clone(); },
        async put(request, response) { map.set(canonical(request), response.clone()); }
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); }
  };
  const handlers = {};
  const context = vm.createContext({
    URL, Response, AbortController, setTimeout, clearTimeout, console,
    Request: class extends Request { constructor(url, options) { super(new URL(url, origin), options); } },
    caches: cacheAPI,
    fetch: async request => { if (offline) throw new Error('Offline'); return serverError ? new Response('Server unavailable', {status:503}) : makeResponse(canonical(request)); },
    self: {
      location:{origin}, registration:{scope:origin + base + '/'},
      clients:{claim:async () => {claimed = true;}},
      skipWaiting:async () => {skipped = true;},
      addEventListener:(type, callback) => {handlers[type] = callback;}
    }
  });
  new vm.Script(source, {filename:'sw.js'}).runInContext(context);
  const lifecycle = async type => { let task; handlers[type]({waitUntil:value => {task = value;}}); await task; };
  const dispatch = async (url, mode='navigate', method='GET') => {
    let task;
    handlers.fetch({request:{url:new URL(url,origin).href, mode, method}, respondWith:value => {task=value;}});
    return task ? await task : null;
  };
  const message = async type => {
    let task, reply;
    handlers.message({data:{type},ports:[{postMessage:value=>{reply=value;}}],waitUntil:value=>{task=value;}});
    await task; return reply;
  };
  const prefix = 'math21-' + encodeURIComponent(base + '/') + '-';
  await cacheAPI.open(prefix + 'old');
  await cacheAPI.open('math21-other-project-keep');
  await lifecycle('install');
  await lifecycle('activate');
  assert.equal(claimed,true);
  assert.equal(stores.has(prefix + 'old'),false);
  assert.equal(stores.has('math21-other-project-keep'),true,'Do not clear other projects');
  const status = await message('STATUS');
  assert.equal(status.complete,true);
  assert.equal(status.total,32,'21 chapters plus 11 shared resources');
  offline = true;
  for (let day=1;day<=21;day++) {
    const url = base + '/days/day-' + String(day).padStart(2,'0') + '/';
    const response = await dispatch(url);
    assert.equal(response.status,200);
    assert.equal(await response.text(),'saved:' + url,'Unread chapter works offline');
  }
  assert.equal(await (await dispatch(base + '/?from=installed')).text(),'saved:' + base + '/');
  assert.equal(await (await dispatch(base + '/index.html')).text(),'saved:' + base + '/');
  assert.equal(await (await dispatch(base + '/missing/')).text(),'saved:' + base + '/offline.html');
  assert.equal(await dispatch('https://other.test/file','cors'),null);
  assert.equal(await dispatch(base + '/','navigate','POST'),null);
  if (base) assert.equal(await dispatch('/other-project/'),null);
  offline = false; serverError = true;
  assert.equal((await dispatch(base + '/days/day-01/')).status,200,'Server errors fall back to cached chapter');
  serverError = false;
  await message('SKIP_WAITING'); assert.equal(skipped,true);
  assert.equal((await message('CACHE_ALL')).complete,true);
  failure = 'icon-192.png';
  const failed = await message('CACHE_ALL');
  assert.equal(failed.ok,false,'Partial downloads must not report complete');
  assert.equal((await message('STATUS')).complete,true,'Existing offline content survives failed repair');
  console.log('PASS offline/cache/update isolation at ' + (base || '/'));
}
