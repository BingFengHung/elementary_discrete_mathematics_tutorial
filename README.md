# 21 天離散數學探險

給國小四到六年級閱讀的完整 21 篇文章；低年級可由大人陪讀。每篇約 1,500～1,900 字，包含故事、逐步解說、動手活動、三題練習與解答。以建立入門概念為目標。

預定網址：https://bingfenghung.github.io/elementary_discrete_mathematics_tutorial/

## 功能

- Jekyll 靜態網站、三週課程目錄、前後篇導覽、篇內目錄。
- 手機版排版、18～24 px 閱讀字級、淺色／深色模式。
- 手動標記完成、首頁接續閱讀；資料保存在當前瀏覽器，不跨裝置同步。
- 解答預設收合，點擊後展開；不依賴 JavaScript 也能讀文章與答案。
- PWA 主畫面安裝，Service Worker 首次連線快取全 21 篇與必要資源。
- 顯示離線準備狀態、失敗重試、新版更新按鈕。
- 無第三方字型、CDN、追蹤程式或後端資料庫。

## 發布到 GitHub Pages

1. 將本專案根目錄的所有檔案（包含 .github）推送到本儲存庫的 main 分支。
2. 開啟儲存庫 Settings → Pages，在 Build and deployment 的 Source 選擇 **GitHub Actions**。
3. 到 Actions 查看 **Build and deploy Jekyll Pages**；如需重新執行，可按 Run workflow。
4. 建置、檢查與部署成功後，開啟上方網址。Pages 必須透過 HTTPS 存取，PWA 才能正常工作。

工作流程會先檢查文章與離線行為，再用官方 Jekyll action 建置、檢查生成檔案，最後部署。PR 只建置檢查，不部署。

設定已針對 BingFengHung/elementary_discrete_mathematics_tutorial 填好。若改名或改網域，請同步修改 _config.yml 的 url 與 baseurl。個人根站或自訂網域根目錄通常使用空的 baseurl；所有內部連結與 PWA 路徑都透過 relative_url 產生。

## 本機預覽

先安裝 Ruby、Bundler；在專案根目錄執行：

    bundle install
    bundle exec jekyll serve

開啟 http://localhost:4000/elementary_discrete_mathematics_tutorial/ 。localhost 可以使用 Service Worker；直接雙擊 HTML 或使用一般區網 HTTP 位址不能完整測試 PWA。

建置與檢查：

    node scripts/check-source.mjs
    bundle exec jekyll build
    node scripts/check-site.mjs

開發時若看到舊版內容，可在瀏覽器開發者工具 Application → Service Workers 取消註冊，再清除本站 Cache Storage；只清除本站，不必清除其他網站。這會影響離線內容；若同時清除 Local Storage，閱讀進度也會消失。

## 手機安裝與離線

- iPhone / iPad：Safari 開啟 → 分享 → 加入主畫面；依系統版本確認以網頁 App 開啟。
- Android：Chrome 開啟 → 網站安裝按鈕，或瀏覽器選單的安裝／加入主畫面。
- 首次使用時保持連線，直到頁尾顯示「全套 21 篇文章已可離線閱讀」。安裝主畫面捷徑和離線快取是兩回事，仍要等快取完成。
- 在飛航模式下，重新開啟首頁與尚未讀過的章節，確認文字、樣式和答案正常。
- 更新時會先備妥新版快取，再顯示更新按鈕；點擊後切換版本。
- 瀏覽器可能因儲存空間或清除資料而移除快取與進度；PWA 不保證永久保存。

## 編輯文章

文章在 _lessons/day-01.md 至 day-21.md。檔案上方 front matter 包含 title、day、week、permalink、description。保留 day 的 1～21 連續編號。

答案以 details 元素搭配 markdown="1" 包住，交由 Jekyll 的 Kramdown 轉換。請保留前後空行；不需要額外外掛。

版型：_layouts/；樣式：assets/css/style.css；閱讀功能：assets/js/app.js；離線邏輯：sw.js；PWA 設定：manifest.webmanifest。

## 課程目錄

- [Day 1｜玩具怎麼分？認識集合](_lessons/day-01.md)
- [Day 2｜誰同時喜歡貓和狗？集合的重疊](_lessons/day-02.md)
- [Day 3｜這句話能判斷真假嗎？認識命題](_lessons/day-03.md)
- [Day 4｜而且和或者差在哪裡？](_lessons/day-04.md)
- [Day 5｜帶傘就一定下雨嗎？如果與推論](_lessons/day-05.md)
- [Day 6｜接下來是什麼？規律與規則](_lessons/day-06.md)
- [Day 7｜偵探社招募日：第一週綜合任務](_lessons/day-07.md)
- [Day 8｜三件上衣、兩件褲子，可以怎麼穿？](_lessons/day-08.md)
- [Day 9｜點心怎麼選？什麼時候用加法？](_lessons/day-09.md)
- [Day 10｜三個人排隊，到底有幾種排法？](_lessons/day-10.md)
- [Day 11｜三個人選兩個，為什麼不是六組？](_lessons/day-11.md)
- [Day 12｜畫一棵選擇樹，把可能性找齊](_lessons/day-12.md)
- [Day 13｜四隻鴿子、三個鳥巢：一定會擠在一起嗎？](_lessons/day-13.md)
- [Day 14｜早餐店開張：第二週綜合任務](_lessons/day-14.md)
- [Day 15｜把公園變成點和線：認識圖](_lessons/day-15.md)
- [Day 16｜哪條路最省力？尋找最短路線](_lessons/day-16.md)
- [Day 17｜一筆畫挑戰：哪些圖畫得出來？](_lessons/day-17.md)
- [Day 18｜教機器人找寶箱：認識演算法](_lessons/day-18.md)
- [Day 19｜猜 1 到 32：每次刪掉一半的可能](_lessons/day-19.md)
- [Day 20｜試了三次都成功，就代表永遠成功嗎？](_lessons/day-20.md)
- [Day 21｜設計你的數學闖關遊戲](_lessons/day-21.md)

## 參考文件

- [GitHub Pages 官方 Jekyll 說明](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
- [GitHub Pages 自訂工作流程](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [PWA manifest](https://web.dev/learn/pwa/web-app-manifest)
- [PWA 安裝](https://web.dev/learn/pwa/installation)

## 瀏覽器驗證

GitHub Actions 會啟動真正的 Chromium，以 1365 px 桌面與 390 px 手機寬度檢查版面、解答展開、進度保存、字級與主題保存，並在離線狀態開啟尚未讀過的第 21 篇。另檢查停用 JavaScript 時仍可閱讀與展開解答。截圖保存在每次 Actions 執行的 browser-verification artifact。手機原生安裝介面仍需在實際 iPhone／Android 上確認。
