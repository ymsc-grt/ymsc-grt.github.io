/*
 * SEMINAR EDITING
 * Add, remove, or reorder talks only in the list below. The homepage and
 * seminar page are generated from this single list, so they stay in sync.
 *
 * Copy one complete {...} entry to add a date. Set cancelled: true for a
 * week without a seminar. The homepage automatically shows the next four
 * dated entries, using the current date in Beijing.
 * Each id must be unique and should use only lowercase letters, numbers,
 * and hyphens, for example: "2026-11-06-speaker-surname".
 * Missing Chinese text falls back to English. Missing English titles and
 * abstracts are displayed as "Title: TBA" and "Abstract: TBA".
 */
(function () {
  "use strict";

  var seminars = [
    {
      id: "2026-09-18-henry-liu",
      year: 2026, month: 9, day: 18,
      titleEn: "A blow-up formula for Vafa–Witten theory",
      titleZh: "Vafa–Witten 理论的爆破公式",
      speakerEn: "Henry Liu · YMSC",
      speakerZh: "Henry Liu · 丘成桐数学科学中心",
      abstractEn: "I will explain how to use 3-Calabi–Yau wall-crossing techniques to obtain a relationship between the refined Vafa–Witten partition functions, in the sense of Tanaka and Thomas, of a smooth projective surface and of its blow-up at a point. This gives a powerful constraint on the structure of Vafa–Witten partition functions. Previously, such blow-up formulas were known only for the “instanton branch,” where the Higgs field is zero.",
      abstractZh: "我将介绍如何利用 3-Calabi–Yau 穿墙技术，建立光滑射影曲面及其在一点处爆破的精细 Vafa–Witten 配分函数（Tanaka–Thomas 意义下）之间的关系。这一公式对 Vafa–Witten 配分函数的结构给出了有力约束。此前，此类爆破公式仅在 Higgs 场为零的所谓“瞬子分支”上得到证明。"
    },
    {
      id: "2026-09-25-mid-autumn-festival",
      year: 2026, month: 9, day: 25,
      titleEn: "No seminar — Mid-Autumn Festival",
      titleZh: "中秋节暂停讨论班",
      cancelled: true
    },
    {
      id: "2026-10-09-number-theory-forum",
      year: 2026, month: 10, day: 9,
      titleEn: "No seminar — Zhongguancun Number Theory Forum",
      titleZh: "中关村数论论坛期间暂停讨论班",
      cancelled: true
    },
    {
      id: "2026-10-16-junzhe-lyu",
      year: 2026, month: 10, day: 16,
      titleEn: "Stable envelope 3d mirror symmetry",
      titleZh: "稳定包络的三维镜像对称",
      speakerEn: "Junzhe Lyu · University of North Carolina at Chapel Hill",
      speakerZh: "吕俊哲 · 北卡罗来纳大学教堂山分校",
      abstractEn: "In this talk, I will explain the definition of elliptic stable envelopes and try to convince the audiences why 3d mirror symmetry for elliptic stable envelopes is interesting to study. I will explain how to relate stable envelopes 3d mirror symmetry and Goresky–MacPherson duality. If time permits, I will discuss the proof of 3d mirror symmetry for stable envelopes in the case of affine A bow varieties; this is joint work with Richárd Rimányi.",
      abstractZh: "在这场报告中，我将解释椭圆稳定包络（elliptic stable envelopes）的定义，并让听众理解为什么椭圆稳定包络的3D镜对称性（3d mirror symmetry）是一个非常值得研究的有趣课题。我将阐述如何将稳定包络的3D镜对称性与 Goresky–MacPherson 对偶性联系起来。如果时间允许，我还会讨论仿射 A 型弓簇（affine A bow varieties）情形下稳定包络3D镜对称性的证明；这是与Richárd Rimányi的合作工作。"
    },
    {
      id: "2026-10-23-alyosha-latyntsev",
      year: 2026, month: 10, day: 23,
      speakerEn: "Alyosha Latyntsev · BIMSA",
      speakerZh: "Alyosha Latyntsev · BIMSA"
    },
    {
      id: "2026-10-30-yukinobu-toda",
      year: 2026, month: 10, day: 30,
      speakerEn: "Yukinobu Toda · Kavli IPMU",
      speakerZh: "Yukinobu Toda · Kavli IPMU"
    },
    {
      id: "2026-10-30-chunyu-bai",
      year: 2026, month: 11, day: 7,
      speakerEn: "Chunyu Bai · Edinburgh",
      speakerZh: "Chunyu Bai · Edinburgh"
    }
  ];

  function text(value, fallback) {
    if (value === undefined || value === null || String(value).trim() === "") {
      return fallback || "";
    }
    return String(value).trim();
  }

  function escapeHtml(value) {
    return text(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function safeId(value, index) {
    var id = text(value, "seminar-" + (index + 1))
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return id || "seminar-" + (index + 1);
  }

  function formatDate(yearValue, monthValue, dayValue) {
    var year = Number(yearValue);
    var month = Number(monthValue);
    var day = Number(dayValue);
    var date = new Date(Date.UTC(year, month - 1, day));
    var isValid = Number.isInteger(year) && Number.isInteger(month) && Number.isInteger(day) &&
      year >= 1 && month >= 1 && month <= 12 && day >= 1 &&
      date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;

    if (!isValid) {
      return {
        monthEn: "—", monthZh: "—", day: "—",
        dateEn: "Date: TBA", dateZh: "日期待定", dateKey: null
      };
    }

    var monthsEn = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    var monthsShortEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var weekdaysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekdaysZh = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var weekday = date.getUTCDay();

    return {
      monthEn: monthsShortEn[month - 1],
      monthZh: month + "月",
      day: String(day),
      dateEn: weekdaysEn[weekday] + ", " + monthsEn[month - 1] + " " + day + ", " + year,
      dateZh: year + "年" + month + "月" + day + "日，" + weekdaysZh[weekday],
      dateKey: year * 10000 + month * 100 + day
    };
  }

  function normalizeSeminar(item, index) {
    item = item && typeof item === "object" ? item : {};

    var titleEn = text(item.titleEn, "TBA");
    var abstractEn = text(item.abstractEn, "TBA");
    var formattedDate = formatDate(item.year, item.month, item.day);
    var speakerEn = text(item.speakerEn);

    return {
      id: safeId(item.id, index),
      monthEn: formattedDate.monthEn,
      monthZh: formattedDate.monthZh,
      day: formattedDate.day,
      dateEn: formattedDate.dateEn,
      dateZh: formattedDate.dateZh,
      dateKey: formattedDate.dateKey,
      originalOrder: index,
      titleEn: titleEn,
      titleZh: text(item.titleZh, titleEn),
      speakerEn: speakerEn,
      speakerZh: text(item.speakerZh, speakerEn),
      abstractEn: abstractEn,
      abstractZh: text(item.abstractZh, abstractEn),
      cancelled: item.cancelled === true
    };
  }

  function todayInBeijing() {
    var beijingNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
    return beijingNow.getUTCFullYear() * 10000 +
      (beijingNow.getUTCMonth() + 1) * 100 + beijingNow.getUTCDate();
  }

  function languagePair(tag, english, chinese, className) {
    if (!english && !chinese) return "";
    var classAttribute = className ? " class=\"" + className + "\"" : "";
    return "<" + tag + classAttribute + ">" +
      "<span data-lang-content=\"en\">" + escapeHtml(english) + "</span>" +
      "<span data-lang-content=\"zh\" lang=\"zh-CN\" hidden>" + escapeHtml(chinese || english) + "</span>" +
      "</" + tag + ">";
  }

  function seminarMarkup(item, compact) {
    var classes = "seminar-item" + (item.cancelled ? " is-cancelled" : "");
    var tag = item.cancelled ?
      " <span class=\"tag\"><span data-lang-content=\"en\">No seminar</span><span data-lang-content=\"zh\" lang=\"zh-CN\" hidden>暂停一次</span></span>" : "";
    var title = languagePair("span", item.titleEn, item.titleZh, "seminar-title-text");
    var heading = compact && !item.cancelled ?
      "<h3><a class=\"seminar-link\" href=\"seminars.html#" + item.id + "\">" + title + "</a></h3>" :
      "<h3>" + title + "</h3>";
    var abstract = !compact && !item.cancelled ?
      "<div class=\"abstract\" data-lang-content=\"en\"><h4>Abstract</h4><p>" + escapeHtml(item.abstractEn) + "</p></div>" +
      "<div class=\"abstract\" data-lang-content=\"zh\" lang=\"zh-CN\" hidden><h4>摘要</h4><p>" + escapeHtml(item.abstractZh) + "</p></div>" : "";

    return "<article class=\"" + classes + "\"" + (!compact ? " id=\"" + item.id + "\"" : "") + ">" +
      "<div class=\"date-block\"><span data-lang-content=\"en\">" + escapeHtml(item.monthEn) + "</span><span data-lang-content=\"zh\" lang=\"zh-CN\" hidden>" + escapeHtml(item.monthZh) + "</span><strong>" + escapeHtml(item.day) + "</strong></div>" +
      "<div class=\"seminar-summary\"><p class=\"eyebrow\"><span data-lang-content=\"en\">" + escapeHtml(item.dateEn) + "</span><span data-lang-content=\"zh\" lang=\"zh-CN\" hidden>" + escapeHtml(item.dateZh) + "</span>" + tag + "</p>" +
      heading + languagePair("p", item.speakerEn, item.speakerZh, "speaker") + abstract + "</div></article>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-seminar-list]").forEach(function (container) {
      var compact = container.getAttribute("data-seminar-list") === "upcoming";
      var normalized = seminars.map(normalizeSeminar);
      var selected = compact ? normalized
        .filter(function (item) { return item.dateKey !== null && item.dateKey >= todayInBeijing(); })
        .sort(function (left, right) {
          return left.dateKey - right.dateKey || left.originalOrder - right.originalOrder;
        })
        .slice(0, 4) : normalized;
      container.innerHTML = selected.length ?
        selected.map(function (item) { return seminarMarkup(item, compact); }).join("") :
        "<div class=\"noscript-notice\"><p data-lang-content=\"en\">No seminars are currently listed.</p><p data-lang-content=\"zh\" lang=\"zh-CN\" hidden>目前暂无讨论班安排。</p></div>";
      var currentLanguage = document.documentElement.lang === "zh-CN" ? "zh" : "en";
      container.querySelectorAll("[data-lang-content]").forEach(function (element) {
        element.hidden = element.getAttribute("data-lang-content") !== currentLanguage;
      });
    });
  });
})();
