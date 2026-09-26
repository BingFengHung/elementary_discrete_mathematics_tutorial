---
layout: lesson
title: "早餐店開張：第二週綜合任務"
day: 14
week: 2
permalink: /days/day-14/
description: "根據問題選擇加法、乘法、排列或組合，並寫出理由。"
---

> 今天的任務：根據問題選擇加法、乘法、排列或組合，並寫出理由。
>
> 準備：紙、筆、幾張商品卡與名字卡。

## 歡迎光臨偵探早餐店

今天我們真的要開一間紙上早餐店。你是店長，除了算套餐，還要排店員、選贈品，並處理臨時限制。

先看菜單：主食有蛋吐司、起司吐司、海苔飯糰三種；飲料有牛奶、豆漿兩種。除非某關另有說明，所有主食都能搭所有飲料。

作答前，請先寫一句「一個結果是什麼」。有時是一份商品，有時是一組套餐，有時是員工的工作順序。這句話能幫你避免把不一樣的問題混在一起。

## 第一關：單點或套餐


<div class="concept-figure" aria-label="圖解：第二週計數神器全景 — 分步相乘、互斥相加、去重相除與抽屜原理。">
<svg viewBox="0 0 540 200" width="100%" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="15" width="510" height="170" rx="14" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5"/>
  <g transform="translate(30, 30)">
    <rect x="0" y="0" width="105" height="120" rx="10" fill="#3b82f615" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="52" y="28" font-size="12" font-weight="bold" fill="#3b82f6" text-anchor="middle">加乘分流</text>
    <text x="52" y="65" font-size="20" font-weight="bold" fill="var(--ink)" text-anchor="middle">＋ / ×</text>
    <text x="52" y="100" font-size="11" fill="var(--muted)" text-anchor="middle">單選或搭配</text>
  </g>
  <g transform="translate(155, 30)">
    <rect x="0" y="0" width="105" height="120" rx="10" fill="#10b98115" stroke="#10b981" stroke-width="1.5"/>
    <text x="52" y="28" font-size="12" font-weight="bold" fill="#10b981" text-anchor="middle">排列排隊</text>
    <text x="52" y="65" font-size="14" font-weight="bold" fill="var(--ink)" text-anchor="middle">3 × 2 × 1</text>
    <text x="52" y="100" font-size="11" fill="var(--muted)" text-anchor="middle">順序遞減</text>
  </g>
  <g transform="translate(280, 30)">
    <rect x="0" y="0" width="105" height="120" rx="10" fill="#f59e0b15" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="52" y="28" font-size="12" font-weight="bold" fill="#f59e0b" text-anchor="middle">組隊去重</text>
    <text x="52" y="65" font-size="18" font-weight="bold" fill="var(--ink)" text-anchor="middle">÷ 2</text>
    <text x="52" y="100" font-size="11" fill="var(--muted)" text-anchor="middle">不計前後順序</text>
  </g>
  <g transform="translate(405, 30)">
    <rect x="0" y="0" width="105" height="120" rx="10" fill="#8b5cf615" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="52" y="28" font-size="12" font-weight="bold" fill="#8b5cf6" text-anchor="middle">鴿籠保證</text>
    <text x="52" y="65" font-size="13" font-weight="bold" fill="var(--ink)" text-anchor="middle">物 &gt; 巢</text>
    <text x="52" y="100" font-size="11" fill="var(--muted)" text-anchor="middle">必有重複同選</text>
  </g>
</svg>
<p class="figure-caption">圖解：第二週計數神器全景 — 分步相乘、互斥相加、去重相除與抽屜原理。</p>
</div>

如果客人只買一份主食，有三種選法。若客人可以從全部主食和飲料中只選一樣商品，則有 3＋2＝5 種。

若客人買套餐，每次必須選一份主食加一杯飲料，就有 3×2＝6 種。請畫出三列兩欄的表格，確認每一格都是一份完整套餐。

這兩個算式都用了 3 和 2，但回答的問題不同。不能只看數字，要看每次購買到底選幾步。

## 第二關：牛奶不夠了

現在店長規定：「飯糰只能搭豆漿，兩種吐司仍能搭任一飲料。」

蛋吐司有兩種搭法、起司吐司有兩種、飯糰有一種，所以 2＋2＋1＝5 種。也可以把原本六種套餐中的飯糰牛奶劃掉，得到 6－1＝5。

這裡減掉的是一種搭配，不是把牛奶這個品項從整張菜單刪除。吐司仍然能配牛奶。讀條件時，要看清楚限制只影響哪一部分。

## 第三關：三位店員排班

小安、小米、阿樂各負責一個時段，依序是早班、中班、晚班。每人只排一次，不允許同一人占兩個時段。

早班可以選三人之一，中班剩兩人，晚班剩一人，所以共有 3×2×1＝6 種分配。

如果小米只能上中班，中間的位置固定，另外兩人交換早晚班就有兩種。這與 Day 10 的排隊一樣，因為早班和晚班是不同位置，交換會改變結果。

## 第四關：贈品選兩款

店裡有星星、月亮、太陽、雲朵四款貼紙。每位客人選兩款不同貼紙，各拿一張，不計拿取順序。

先列星星和其他三款的搭配：星月、星日、星雲。再列月亮尚未出現的搭配：月日、月雲。最後是日雲。共 3＋2＋1＝6 種。

星月和月星不能算兩次，因為客人拿到的兩款貼紙完全相同。

店員排班也得到六種，貼紙組合也得到六種，但理由不同。相同的答案不代表使用的是同一種計數方法。

## 第五關：一定有人選相同主食嗎？

七位客人每人只選一種主食，一共有三種主食。一定有至少兩人選到同一種嗎？有，因為七位客人比三種類別多。

還能說得更進一步：如果每種主食最多只有兩人選，三種最多容納 2＋2＋2＝6 人。現在有七人，所以至少一種主食會被三人或更多人選中。

我們不知道是哪種，也沒有說每種都有三人。結論只保證「至少其中一種」。

## 動手玩：做一份能檢查的營業報告

把紙分成四區：套餐表格、排班清單、貼紙組合、重複選擇的理由。每區除了答案，都留一句說明。

請家人當檢查員，任意改一個條件，例如新增紅茶、讓小安固定早班，或把贈品改成只選一款。你要指出哪一區需要重算，以及哪一些原有結果仍然保留。

不要全部推倒重來。先找出變動影響了什麼，能讓你更清楚理解問題的結構。

## 三道小挑戰

1. 回到沒有搭配限制的原菜單，新增紅茶後，每種主食都能搭三種飲料，共有幾種套餐？
2. 三位店員排早中晚班，小安固定早班，共有幾種分配？
3. 四款貼紙中選兩款，小晴算 4×3＝12。這個算式把什麼重複算了？正確答案是多少？

<details class="answers" markdown="1">
<summary>查看解答與想法</summary>


1. 3×3＝9 種。也可想成原有六種，加上三種主食各配紅茶的三種。
2. 2 種，小米和阿樂可以交換中班、晚班。
3. 每一組都把拿取先後算成兩種，例如星月與月星。因此應合併重複，12÷2＝6 種。

</details>

## 第二週回顧

現在你會列清單、畫表格與選擇樹，也能判斷何時順序重要，何時同一結果被重複計數。

**先定義結果，再挑選方法，最後檢查有沒有漏掉或重複。**

明天我們把公園畫成點和線，開始探索地圖的數學。
