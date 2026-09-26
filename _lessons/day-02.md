---
layout: lesson
title: "誰同時喜歡貓和狗？集合的重疊"
day: 2
week: 1
permalink: /days/day-02/
description: "用重疊的圈圈整理兩種條件，避免把同一個人算兩次。"
---

> 今天的任務：用重疊的圈圈整理兩種條件，避免把同一個人算兩次。
>
> 準備：紙、兩種顏色的筆、八張小紙卡。

## 一個人不能變成兩個人

偵探社想選出動物日的活動主題。小安問：「喜歡貓的請舉手！」有五個人舉手。「喜歡狗的請舉手！」又有四個人舉手。

「所以一共有九個人喜歡貓或狗！」阿樂很快算出 5＋4＝9。

小米看了看名單：「等一下，有人兩次都舉手耶！」

今天調查的八位同學如下。每一列都是一個不同的人。

| 姓名 | 喜歡貓 | 喜歡狗 |
|---|---|---|
| 小安 | 是 | 否 |
| 小米 | 是 | 是 |
| 阿樂 | 否 | 是 |
| 小晴 | 是 | 否 |
| 小宇 | 是 | 是 |
| 小青 | 否 | 是 |
| 小文 | 是 | 否 |
| 小禾 | 否 | 否 |

先猜猜看：如果每個人只能放一張名字卡，小米和小宇該放在哪裡？

## 讓圈圈重疊，就有地方了


<div class="concept-figure" aria-label="圖解：文氏圖（Venn Diagram）— 小米與小宇同時屬於兩個集合，站在中間重疊的交集裡。">
<svg viewBox="0 0 540 230" width="100%" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="520" height="210" rx="16" fill="var(--surface)" stroke="var(--line)" stroke-width="2"/>
  <text x="30" y="36" font-size="13" font-weight="bold" fill="var(--muted)">調查全體 8 位同學範圍</text>
  <circle cx="210" cy="125" r="82" fill="#3b82f620" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="330" cy="125" r="82" fill="#10b98120" stroke="#10b981" stroke-width="2"/>
  <text x="170" y="65" font-size="14" font-weight="bold" fill="#3b82f6">喜歡貓 (5人)</text>
  <text x="370" y="65" font-size="14" font-weight="bold" fill="#10b981">喜歡狗 (4人)</text>
  <text x="170" y="105" font-size="12" fill="var(--ink)" text-anchor="middle">小安</text>
  <text x="170" y="128" font-size="12" fill="var(--ink)" text-anchor="middle">小晴</text>
  <text x="170" y="151" font-size="12" fill="var(--ink)" text-anchor="middle">小文</text>
  <text x="170" y="180" font-size="11" fill="var(--muted)" text-anchor="middle">(獨享 3 人)</text>
  <rect x="245" y="90" width="50" height="66" rx="8" fill="var(--surface)" stroke="var(--brand)" stroke-width="1.5"/>
  <text x="270" y="112" font-size="12" font-weight="bold" fill="var(--brand)" text-anchor="middle">小米</text>
  <text x="270" y="132" font-size="12" font-weight="bold" fill="var(--brand)" text-anchor="middle">小宇</text>
  <text x="270" y="148" font-size="10" fill="var(--muted)" text-anchor="middle">交集 2人</text>
  <text x="370" y="115" font-size="12" fill="var(--ink)" text-anchor="middle">阿樂</text>
  <text x="370" y="138" font-size="12" fill="var(--ink)" text-anchor="middle">小青</text>
  <text x="370" y="180" font-size="11" fill="var(--muted)" text-anchor="middle">(獨享 2 人)</text>
  <rect x="445" y="150" width="70" height="34" rx="6" fill="var(--surface)" stroke="var(--line)" stroke-width="1.2"/>
  <text x="480" y="172" font-size="11" fill="var(--muted)" text-anchor="middle">小禾 (1人)</text>
  <text x="270" y="210" font-size="12" font-weight="bold" fill="var(--ink)" text-anchor="middle">3 ＋ 2 ＋ 2 ＋ 1 ＝ 8 人</text>
</svg>
<p class="figure-caption">圖解：文氏圖（Venn Diagram）— 小米與小宇同時屬於兩個集合，站在中間重疊的交集裡。</p>
</div>

在紙上畫一個大長方形，代表這次調查的八位同學。裡面畫兩個互相重疊的圈圈，左邊標上「喜歡貓」，右邊標上「喜歡狗」。

重疊的地方同時在兩個圈圈裡。因此，小米和小宇放在中間，就能表示他們兩種都喜歡，而不必多做一張名字卡。

四個區域應該這樣放：

- 只在貓圈裡：小安、小晴、小文，共 3 人。
- 中間重疊處：小米、小宇，共 2 人。
- 只在狗圈裡：阿樂、小青，共 2 人。
- 兩個圈圈外、長方形裡：小禾，共 1 人。

最後檢查：3＋2＋2＋1＝8，剛好是八個人。每張卡都找到位置，也沒有多出一個人。這種幫忙整理集合的圈圈圖，常叫作文氏圖。

## 交集：兩個條件都符合

中間重疊的部分叫作**交集**。在今天的故事中，就是「喜歡貓，而且喜歡狗」的人。

如果有人問「喜歡貓的有幾人」，要算左邊單獨區的 3 人，加上中間的 2 人，得到 5 人。中間的人也在貓圈裡，不能把他們漏掉。

同樣地，喜歡狗的是右邊的 2 人加上中間的 2 人，共 4 人。

## 聯集：至少符合一個條件

只要喜歡貓、喜歡狗，或兩種都喜歡，就放進這次的動物活動名單。這些人合起來是兩個集合的**聯集**。

你可以把兩個圈圈覆蓋到的所有地方都塗色。塗到的人有 3＋2＋2＝7 人。

如果從 5＋4 開始算，中間兩人各被算了兩次。每人應該只算一次，所以扣掉多算的那一次：5＋4－2＝7。

為什麼不是減 4？因為我們要保留這兩個人，只把重複的部分拿掉。如果全部刪掉，兩種都喜歡的人反而不見了。

小禾雖然在圈圈外，仍然是受調查的同學。圈圈外不是「不存在」，只是沒有符合這兩個條件。

## 換個情境：帶筆和帶橡皮擦

如果左圈改成「帶鉛筆」，右圈改成「帶橡皮擦」，中間就代表兩樣都帶的人。「只帶鉛筆」則是左圈裡、不包含重疊處的部分。

同一張圖可以處理不同故事，因為它記錄的是條件之間的關係。

## 動手玩：讓名字卡搬家

把八個名字寫在紙卡上，照表格擺到四個區域。接著假設小禾說：「我現在也喜歡狗了！」請把他的卡移到適當的位置。

移動後，喜歡狗的變成 5 人，至少喜歡一種的變成 8 人，但調查總人數仍然是 8。你移動的是同一張卡，沒有增加新同學。

## 三道小挑戰

1. 依照原本表格，同時喜歡貓和狗的是誰？
2. 原本只喜歡其中一種動物的，共有幾人？
3. 六個人喜歡蘋果、四個人喜歡香蕉，其中三個人兩種都喜歡。至少喜歡一種水果的共有幾人？

<details class="answers" markdown="1">
<summary>查看解答與想法</summary>


1. 小米和小宇，共 2 人。他們在交集裡。
2. 3＋2＝5 人。題目說「只喜歡其中一種」，所以不包含中間兩人。
3. 6＋4－3＝7 人。也可以先算只喜歡蘋果的 3 人、只喜歡香蕉的 1 人，再加上兩種都喜歡的 3 人。

</details>

## 今天帶走的一句話

**兩群合在一起時，重疊的成員只算一次。**

明天，我們不整理物品，而要整理收到的句子：哪些句子能判斷真假？
