(() => {
  'use strict';
  const base = document.body.dataset.base || '';
  const key = 'math21:' + base + ':';
  const byId = id => document.getElementById(id);
  let storageOK = true;
  const read = (name, fallback) => { try { const value = localStorage.getItem(key + name); return value === null ? fallback : JSON.parse(value); } catch (_) { storageOK = false; return fallback; } };
  const save = (name, value) => { try { localStorage.setItem(key + name, JSON.stringify(value)); return true; } catch (_) { storageOK = false; return false; } };
  const validDay = n => Number.isInteger(n) && n >= 1 && n <= 21;
  const lessonURL = n => base + '/days/day-' + String(n).padStart(2, '0') + '/';
  const rawDone = read('completed', []);
  let done = new Set(Array.isArray(rawDone) ? rawDone.filter(validDay) : []);
  const day = Number(document.body.dataset.day);
  const storageNote = '無法保存進度；本次仍可閱讀，關閉後可能不會保留記錄。';
  const refresh = () => {
    document.querySelectorAll('[data-status-day]').forEach(el => { el.textContent = done.has(Number(el.dataset.statusDay)) ? '✓ 已完成' : ''; });
    document.querySelectorAll('[data-card-day]').forEach(el => el.classList.toggle('is-complete', done.has(Number(el.dataset.cardDay))));
    document.querySelectorAll('[data-lesson-link]').forEach(el => el.classList.toggle('is-complete', done.has(Number(el.dataset.lessonLink))));
    if (byId('course-progress')) byId('course-progress').value = done.size;
    if (byId('progress-text')) byId('progress-text').textContent = '我的探險進度：' + done.size + ' / 21';
    if (byId('storage-status')) byId('storage-status').textContent = storageOK ? '' : storageNote;
    const button = byId('complete-lesson');
    if (button) { button.setAttribute('aria-pressed', String(done.has(day))); button.textContent = done.has(day) ? '✓ 已完成（點擊可取消）' : '標記本篇已完成'; }
    const resume = byId('continue-reading');
    if (resume) {
      const last = read('last', 1);
      let next = validDay(last) ? last : 1;
      if (done.has(next)) next = Array.from({length:21}, (_, i) => i + 1).find(n => !done.has(n)) || 21;
      resume.href = lessonURL(next);
      resume.textContent = done.size === 21 ? '再次閱讀 · DAY 21 →' : next === 1 ? '從第一天出發 →' : '繼續探險 · DAY ' + next + ' →';
    }
  };
  if (validDay(day)) {
    save('last', day);
    const completion = document.querySelector('.completion');
    if (completion) completion.hidden = false;
    byId('complete-lesson')?.addEventListener('click', () => {
      done.has(day) ? done.delete(day) : done.add(day);
      const saved = save('completed', [...done].sort((a, b) => a - b));
      refresh();
      byId('completion-status').textContent = saved ? (done.has(day) ? '已儲存。休息一下，明天再出發！' : '已取消完成標記。') : storageNote;
    });
    const headings = document.querySelectorAll('#lesson-content h2');
    const list = byId('toc-links');
    headings.forEach((heading, i) => {
      if (!heading.id) heading.id = 'section-' + (i + 1);
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + encodeURIComponent(heading.id);
      a.textContent = heading.textContent;
      li.append(a); list?.append(li);
    });
    if (headings.length && byId('page-toc')) byId('page-toc').hidden = false;
  }
  const progress = document.querySelector('.progress-section');
  if (progress) progress.hidden = false;
  refresh();
  window.addEventListener('storage', event => { if (event.key === key + 'completed') { const value = read('completed', []); done = new Set(Array.isArray(value) ? value.filter(validDay) : []); refresh(); } });
  let font = read('font', 20);
  if (![18, 20, 22, 24].includes(font)) font = 20;
  const setFont = () => {
    document.documentElement.style.setProperty('--article-size', font + 'px');
    if (byId('font-smaller')) byId('font-smaller').disabled = font === 18;
    if (byId('font-larger')) byId('font-larger').disabled = font === 24;
  };
  setFont();
  const readingTools = document.querySelector('.reading-tools');
  if (readingTools) readingTools.hidden = false;
  byId('font-smaller')?.addEventListener('click', () => { font = Math.max(18, font - 2); setFont(); save('font', font); });
  byId('font-larger')?.addEventListener('click', () => { font = Math.min(24, font + 2); setFont(); save('font', font); });
  let theme = read('theme', null);
  if (!['dark', 'light'].includes(theme)) theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const applyTheme = () => { document.documentElement.dataset.theme = theme; const metaTheme = document.querySelector('meta[name="theme-color"]'); if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0b1326' : '#176b5b'); const toggle = byId('theme-toggle'); if (toggle) { toggle.hidden = false; toggle.textContent = theme === 'dark' ? '淺色' : '深色'; toggle.setAttribute('aria-label', '切換' + (theme === 'dark' ? '淺色' : '深色') + '模式'); } };
  applyTheme();
  byId('theme-toggle')?.addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; applyTheme(); save('theme', theme); });
  let installPrompt;
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; if (byId('install-app')) byId('install-app').hidden = false; });
  byId('install-app')?.addEventListener('click', async () => { if (!installPrompt) return; const prompt = installPrompt; installPrompt = null; byId('install-app').hidden = true; try { await prompt.prompt(); await prompt.userChoice; } catch (_) { /* The manual installation instructions remain available. */ } });
  window.addEventListener('appinstalled', () => { installPrompt = null; if (byId('install-app')) byId('install-app').hidden = true; });
  const status = byId('offline-status');
  const retry = byId('cache-retry');
  const update = byId('update-app');
  const readyWithTimeout = () => {
    let timer;
    return Promise.race([navigator.serviceWorker.ready, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Service worker activation timed out')), 60000); })]).finally(() => clearTimeout(timer));
  };
  let registration;
  let offlineReady = false;
  const showStatus = () => { if (status) status.textContent = offlineReady ? (navigator.onLine ? '全套 21 篇文章已可離線閱讀。' : '目前離線 · 全套 21 篇文章仍可閱讀。') : (navigator.onLine ? '正在準備離線文章，請保持連線…' : '目前離線；恢復連線後可儲存完整課程。'); };
  window.addEventListener('offline', showStatus);
  const message = (worker, type) => new Promise((resolve, reject) => {
    if (!worker) return reject(new Error('Service worker is not ready'));
    const channel = new MessageChannel();
    const timer = setTimeout(() => { channel.port1.close(); reject(new Error('Timed out')); }, 60000);
    channel.port1.onmessage = event => { clearTimeout(timer); channel.port1.close(); event.data?.ok ? resolve(event.data) : reject(new Error(event.data?.error || 'Cache unavailable')); };
    worker.postMessage({type}, [channel.port2]);
  });
  const checkReady = async () => { const worker = registration?.active || navigator.serviceWorker.controller; const result = await message(worker, 'STATUS'); offlineReady = result.complete; showStatus(); if (retry) retry.hidden = offlineReady; };
  const showUpdate = () => { if (registration?.waiting && update) update.hidden = false; };
  update?.addEventListener('click', () => { if (registration?.waiting) { update.disabled = true; registration.waiting.postMessage({type:'SKIP_WAITING'}); } });
  let reloadForUpdate = false;
  update?.addEventListener('click', () => { reloadForUpdate = true; });
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloadForUpdate) location.reload(); else checkReady().catch(() => {}); });
    showStatus();
    navigator.serviceWorker.register(base + '/sw.js', {scope:base + '/', updateViaCache:'none'}).then(reg => {
      registration = reg;
      showUpdate();
      reg.addEventListener('updatefound', () => {
        const installing = reg.installing;
        installing?.addEventListener('statechange', () => {
          if (installing.state === 'installed') showUpdate();
          if (installing.state === 'redundant' && !registration.active) { if (status) status.textContent = '離線儲存未完成，請確認連線後重試。'; if (retry) retry.hidden = false; }
        });
      });
      return readyWithTimeout();
    }).then(reg => { registration = reg; return checkReady(); }).catch(() => { if (status) status.textContent = '離線儲存未完成，仍可線上閱讀。請確認連線後重試。'; if (retry) retry.hidden = false; });
    retry?.addEventListener('click', async () => {
      retry.disabled = true;
      if (status) status.textContent = '正在重新儲存全套文章…';
      try { registration = registration || await navigator.serviceWorker.register(base + '/sw.js', {scope:base + '/', updateViaCache:'none'}); if (!registration.active) { await registration.update(); registration = await readyWithTimeout(); } await message(registration.active, 'CACHE_ALL'); await checkReady(); } catch (_) { if (status) status.textContent = '儲存未完成，請檢查網路或裝置可用空間後再試。'; retry.hidden = false; } finally { retry.disabled = false; }
    });
    window.addEventListener('online', () => { showStatus(); if (registration?.active) checkReady().catch(() => {}); });
  } else if (status) status.textContent = '此瀏覽環境暫不支援離線儲存；文章仍可線上閱讀。';
})();
