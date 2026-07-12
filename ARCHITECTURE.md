# AUHMC 2026 — هيكلية الموقع (Architecture)

## نظرة عامة

هذا الموقع هو **تطبيق صفحة واحدة (Single Page Application - SPA)** مبني بالكامل باستخدام HTML وCSS وJavaScript الأصلي (Vanilla JS). لا يوجد أي إطار عمل (Framework) أو مكتبات خارجية ثقيلة.

---

## 📂 هيكل الملفات ودور كل ملف

| الملف | الدور | الحجم التقريبي |
|---|---|---|
| `index.html` | الهيكل (HTML) — يحتوي على جميع الأقسام والأطر | ~200 سطر |
| `styles.css` | التصميم (CSS) — جميع التنسيقات والألوان والاستجابة | ~900 سطر |
| `app.js` | المنطق البرمجي (JS) — جميع الوظائف التفاعلية | ~260 سطر |
| `README.md` | نظرة عامة للمطورين والمستخدمين |
| `ARCHITECTURE.md` | هذا الملف — شرح الهيكلية |
| `AGENTS.md` | دليل لأنظمة الذكاء الاصطناعي |
| `DATA-MODEL.md` | نموذج البيانات والثوابت |
| `CHANGELOG.md` | سجل التغييرات |

---

## 🧱 تدفق البيانات (Data Flow)

```
[المستخدم يفتح index.html]
        │
        ▼
[تحميل styles.css ← تطبيق التصميم]
[تحميل app.js ← تنفيذ init()]
        │
        ├──→ updateCountdown() ← تحديث العد التنازلي كل ثانية
        ├──→ setupNavigation() ← ربط أزرار التنقل
        ├──→ setupDarkMode() ← تفعيل الوضع الليلي
        ├──→ renderTracks() ← بناء بطاقات المسارات
        ├──→ setupSchedule() ← بناء الجدول الزمني وعناصر التحكم
        ├──→ renderCommittees() ← بناء بطاقات اللجان
        ├──→ setupRegistration() ← بناء نموذج التسجيل والورشات
        ├──→ renderSponsors() ← بناء بطاقات الرعاة
        └──→ setupScrollTop() ← تفعيل زر العودة للأعلى
```

### ملاحظة: كل البيانات مخزنة في ملف `app.js` على شكل مصفوفات (Arrays) وكائنات (Objects). لا يوجد اتصال بقاعدة بيانات أو خادم خارجي.

---

## 🏗️ هيكل HTML

### النافبار (Navbar)
```html
<nav class="navbar">
  ├── .nav-container
  │   ├── زر القائمة (للجوال)
  │   ├── الشعار (SVG + نص)
  │   ├── روابط التنقل (ul.nav-links)
  │   └── زر الوضع الليلي
```

### الأقسام (Sections)
كل قسم له `id` فريد ويتم إظهاره/إخفاؤه عبر JavaScript:
```html
<section class="section active" id="section-home">     <!-- الرئيسية -->
<section class="section" id="section-tracks">           <!-- المسارات -->
<section class="section" id="section-schedule">         <!-- البرنامج -->
<section class="section" id="section-committees">       <!-- اللجان -->
<section class="section" id="section-posters">          <!-- البوسترات -->
<section class="section" id="section-registration">    <!-- التسجيل -->
<section class="section" id="section-sponsors">         <!-- الرعاة -->
```

### الفوتر (Footer)
```html
<footer class="footer">
  ├── معلومات عن المؤتمر
  ├── روابط سريعة
  └── معلومات التواصل
```

### عناصر إضافية
- `#scrollTop` — زر العودة للأعلى

---

## 🎨 نظام التصميم (CSS Architecture)

### المتغيرات (CSS Variables)
جميع الألوان والقيم متغيرة لتسهيل التعديل:
```css
:root {
  --primary: #002366;
  --gold: #D4AF37;
  --font-ar: 'IBM Plex Sans Arabic', sans-serif;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* ... */
}
```

### الوضع الليلي
يتم تفعيله بإضافة كلاس `dark-mode` على عنصر `<body>`:
```css
body.dark-mode {
  --primary: #1a3a7a;
  /* ... إعادة تعريف المتغيرات للوضع الليلي */
}
```

### الاستجابة (Responsive Design)
- **Mobile-First**: التصميم الأساسي للجوال، ثم تحسين للشاشات الأكبر
- نقاط القطع (Breakpoints):
  - `@media (max-width: 992px)` — للأجهزة اللوحية
  - `@media (max-width: 768px)` — للجوال
  - `@media (max-width: 480px)` — للشاشات الصغيرة

### نظام Grid
- `tracks-grid` — شبكة المسارات (auto-fit, minmax 280px)
- `schedule-grid` — قائمة عمودية للجدول
- `committees-grid` — شبكة اللجان (auto-fit, minmax 260px)
- `sponsors-grid` — شبكة الرعاة (auto-fit, minmax 200px)
- `about-grid` — شبكة الإحصائيات (auto-fit, minmax 180px)
- `reg-grid` — شبكة التسجيل (عمودين)

---

## 🧠 المنطق البرمجي (JavaScript Architecture)

### نمط التصميم
الملف `app.js` يستخدم **IIFE (Immediately Invoked Function Expression)** لعزل المتغيرات عن النطاق العام:
```javascript
(function () {
  'use strict';
  // ... كل المنطق هنا
})();
```

### المكونات الرئيسية

| الدالة | الوظيفة |
|---|---|
| `updateCountdown()` | حساب الوقت المتبقي للمؤتمر وتحديثه كل ثانية |
| `setupNavigation()` | ربط روابط التنقل وإظهار/إخفاء الأقسام |
| `setupDarkMode()` | تفعيل/تعطيل الوضع الليلي وحفظه في localStorage |
| `renderTracks()` | إنشاء بطاقات المسارات العلمية |
| `renderSchedule(day)` | إنشاء جدول الفعاليات لليوم المحدد |
| `setupSchedule()` | إعداد عناصر التحكم في الجدول (الأيام، الفلتر) |
| `renderCommittees()` | إنشاء بطاقات اللجان |
| `setupRegistration()` | إعداد نموذج التسجيل وقائمة الورشات |
| `renderSponsors()` | إنشاء بطاقات الرعاة |
| `setupScrollTop()` | التحكم في ظهور زر العودة للأعلى |
| `init()` | الدالة الرئيسية التي تشغل كل شيء |

### تدفق التنقل
```
[النقر على رابط التنقل]
        │
        ▼
[data-nav = "tracks"]
        │
        ├── تحديث الكلاس active على الروابط
        ├── إخفاء جميع الأقسام (section.active)
        ├── إظهار القسم المستهدف (#section-tracks)
        ├── التمرير للأعلى
        └── إغلاق القائمة في الجوال
```

---

## 🔗 كيفية إضافة صفحة جديدة

1. **في `index.html`**: أضف `<section class="section" id="section-NEW">` مع المحتوى
2. **في `index.html`**: أضف رابطاً في النافبار: `<a href="#" data-nav="NEW"> ... </a>`
3. **في `app.js`**: أضف دالة `renderNew()` لبناء المحتوى
4. **في `app.js`**: أضف `renderNew()` داخل `init()`
5. **في `styles.css`**: أضف التنسيقات اللازمة

---

## 🔗 كيفية تعديل البيانات

جميع البيانات موجودة في **أعلى ملف `app.js`** ضمن الثوابت التالية:
- `CONFERENCE_DATE` — تاريخ المؤتمر
- `TRACKS` — المسارات العلمية
- `SCHEDULE` — الجدول الزمني
- `COMMITTEES` — اللجان
- `WORKSHOPS` — ورشات العمل
- `SPONSORS` — الرعاة

لتعديل أي بيانات،只需 تعديل المصفوفة/الكائن المناسب في `app.js`.

---

## 🔗 المكتبات الخارجية (CDN)

يتم تحميلها من CDN ولا توجد ملفات محلية:
- **Font Awesome 6.5.1** — الأيقونات
- **IBM Plex Sans Arabic** — الخط العربي من Google Fonts
- **Inter** — الخط الإنجليزي من Google Fonts

لإضافة مكتبة جديدة:
1. أضف `<link>` في `<head>` في `index.html`
2. استخدمها في الكود

---

## 🌐 النشر

الموقع هو **Static Site** يمكن نشره على أي خدمة استضافة ملفات ثابتة:
- GitHub Pages
- Netlify
- Cloudflare Pages
- أي خادم ويب عادي (Apache, Nginx)