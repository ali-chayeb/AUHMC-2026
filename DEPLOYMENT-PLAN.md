# خطة النشر الكاملة — AUHMC 2026
## من موقع ثابت (Static) إلى موقع نظامي (Full-Stack) على Plesk

> **تاريخ الإنشاء:** 2026-07-12
> **آخر تحديث:** 2026-07-13
> **الهدف:** تحويل موقع AUHMC 2026 من موقع HTML/CSS/JS ثابت إلى موقع نظامي كامل مع Backend وقاعدة بيانات، ونشره على سيرفر Plesk.
> **ملاحظة:** هذا الملف مصمم ليكون دليلاً ذاتياً لأي نظام ذكاء اصطناعي لمواصلة العمل من حيث توقف السابق.

---

## 📊 الوضع الحالي (2026-07-13)

### ما تم إنجازه:
- ✅ **الموقع منشور على GitHub Pages** — https://ali-chayeb.github.io/AUHMC-2026/
- ✅ **نسخة مستقلة (Standalone)** — تعمل بدون Backend في مجلد `github-pages/`
- ✅ **Backend كامل** — Node.js + Express + SQLite في مجلد `server/`
- ✅ **لوحة تحكم** — تعمل محلياً عبر localStorage
- ✅ **تسجيلات محلية** — تُحفظ في localStorage كاحتياطي

### البنية الحالية:
```
AUHMC-2026/
├── public/                  # للعمل المحلي مع Backend
│   ├── index.html
│   ├── app.js (معدل ليعمل standalone)
│   ├── admin.html
│   └── ...
├── server/                  # Backend كامل (Node.js + Express)
│   ├── server.js
│   ├── database.js
│   └── routes/
├── github-pages/            # نسخة GitHub Pages (بدون Backend)
│   ├── index.html
│   ├── app.js (مستقل تماماً)
│   ├── admin.html
│   └── admin.js (مستقل تماماً)
├── deploy-github-pages.sh   # سكريبت النشر
└── ...
```

---

## 📋 قائمة المحتويات

1. [الوضع الحالي](#الوضع-الحالي)
2. [الهدف النهائي](#الهدف-النهائي)
3. [الهيكل النهائي للمشروع](#الهيكل-النهائي-للمشروع)
4. [المرحلة 1: تجهيز السيرفر (Plesk)](#المرحلة-1-تجهيز-السيرفر-plesk)
5. [المرحلة 2: بناء Backend (Node.js + Express)](#المرحلة-2-بناء-backend-nodejs--express)
6. [المرحلة 3: تحديث Frontend للاتصال بالـ API](#المرحلة-3-تحديث-frontend-للاتصال-بالـ-api)
7. [المرحلة 4: رفع الملفات إلى Plesk](#المرحلة-4-رفع-الملفات-إلى-plesk)
8. [المرحلة 5: الاختبار والتشغيل](#المرحلة-5-الاختبار-والتشغيل)
9. [الملحق: أوامر سريعة](#الملحق-أوامر-سريعة)
10. [الملحق: استكشاف الأخطاء](#الملحق-استكشاف-الأخطاء)

---

## الوضع الحالي

### ما هو موجود الآن:
- موقع ثابت (Static Site) — HTML + CSS + JavaScript
- البيانات مخزنة في ملف `app.js` كمصفوفات وكائنات
- Admin panel يحفظ التعديلات في `localStorage` (محلياً في المتصفح)
- التسجيلات تخزن في `localStorage` فقط (تضيع عند تغيير الجهاز)
- لا يوجد خادم خلفي (Backend)
- لا يوجد قاعدة بيانات

### هيكل الملفات الحالي:
```
AUHMC-2026/
├── index.html              # الموقع الرئيسي
├── styles.css              # التصميم
├── app.js                  # المنطق البرمجي (يقرأ من localStorage)
├── admin.html              # لوحة التحكم
├── admin-styles.css        # تصميم لوحة التحكم
├── admin.js                # منطق لوحة التحكم (يحفظ في localStorage)
├── README.md               # توثيق
├── ARCHITECTURE.md         # هيكلية الكود
├── AGENTS.md               # دليل AI
├── DATA-MODEL.md           # نموذج البيانات
├── CHANGELOG.md            # سجل التغييرات
└── DEPLOYMENT-PLAN.md      # هذا الملف — خطة النشر
```

### المشاكل:
- ❌ التسجيلات تبقى في متصفح المستخدم فقط
- ❌ تعديلات admin لا تظهر للزوار الآخرين
- ❌ لا يمكن تصدير بيانات المسجلين
- ❌ لا يوجد نظام دخول حقيقي

---

## الهدف النهائي

### بعد التطبيق:
```
[المستخدم] ← يفتح الموقع (index.html)
                  │
                  ▼
        [السيرفر (Node.js + Express)]
                  │
                  ▼
        [قاعدة البيانات (SQLite)]
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
   [محتوى     [تسجيلات   [صور ووسائط
   الموقع]    الأطباء]    مرفوعة]
```

### الميزات الجديدة:
- ✅ **تسجيلات محفوظة مركزياً** — كل طبيب يسجل، يظهر فوراً في قاعدة البيانات
- ✅ **Admin panel يعمل للجميع** — تعديل واحد يظهر لكل الزوار
- ✅ **نظام دخول حقيقي** — بريد إلكتروني + كلمة مرور مشفرة
- ✅ **تصدير البيانات** — تصدير Excel/CSV للمسجلين
- ✅ **رفع الصور** — رفع شعار وخلفية عبر admin panel وتخزينها على السيرفر
- ✅ **إشعارات** — تنبيه عند تسجيل طبيب جديد (اختياري)

---

## الهيكل النهائي للمشروع

```
AUHMC-2026/
│
├── 📁 public/                    # الملفات العامة (Frontend)
│   ├── index.html                # الموقع الرئيسي
│   ├── styles.css                # التصميم
│   ├── app.js                    # المنطق البرمجي (مُحدّث)
│   ├── admin.html                # لوحة التحكم
│   ├── admin-styles.css          # تصميم لوحة التحكم
│   ├── admin.js                  # منطق لوحة التحكم (مُحدّث)
│   └── uploads/                  # الصور المرفوعة (ينشئ تلقائياً)
│
├── 📁 server/                    # ملفات Backend
│   ├── server.js                 # الخادم الرئيسي (Express)
│   ├── database.js               # إعداد قاعدة البيانات
│   ├── routes/
│   │   ├── auth.js               # API تسجيل الدخول
│   │   ├── content.js            # API إدارة المحتوى
│   │   └── registrations.js      # API إدارة التسجيلات
│   └── middleware/
│       └── auth.js               # التحقق من صلاحية الدخول
│
├── package.json                  # تبعيات Node.js
├── .env                          # المتغيرات السرية (لا ترفع على GitHub)
├── .gitignore                    # تجاهل الملفات غير الضرورية
│
├── README.md                     # توثيق
├── ARCHITECTURE.md               # هيكلية الكود
├── AGENTS.md                     # دليل AI
├── DATA-MODEL.md                 # نموذج البيانات
├── CHANGELOG.md                  # سجل التغييرات
└── DEPLOYMENT-PLAN.md            # هذا الملف
```

---

## المرحلة 1: تجهيز السيرفر (Plesk)

### ما تحتاجه من المستخدم:
```
1. رابط Plesk (مثل: https://your-server-ip:8443)
2. اسم المستخدم وكلمة المرور
3. اسم الدومين (حتى لو مؤقت)
4. تأكيد أن Plesk يدعم Node.js
```

### خطوات التحضير في Plesk:

#### 1.1 الدخول إلى Plesk
```
1. افتح المتصفح واذهب إلى: https://your-server-ip:8443
2. أدخل اسم المستخدم وكلمة المرور
3. ستظهر لوحة التحكم الرئيسية
```

#### 1.2 إنشاء موقع (Domain) في Plesk
```
1. اضغط على "Add Domain" أو "إضافة نطاق"
2. أدخل اسم الدومين (مثال: auhmc2026.com)
3. اختر:
   - ✅ "Website" (موقع ويب)
   - ✅ "Node.js support" (دعم Node.js)
   - ✅ "SSL/TLS certificate" (شهادة HTTPS — Let's Encrypt مجاناً)
4. اضغط "OK" أو "موافق"
```

#### 1.3 تفعيل Node.js في Plesk
```
1. اذهب إلى: Website & Domains > اختر الدومين
2. ابحث عن "Node.js" أو اذهب إلى:
   Website & Domains > Node.js
3. اضغط "Enable Node.js" أو "تفعيل Node.js"
4. اختر إصدار Node.js (اختر أحدث إصدار متاح: 18.x أو 20.x)
5. حدد مجلد المشروع (Document Root) — عادةً httpdocs
6. اضغط "Apply" أو "تطبيق"
```

#### 1.4 إنشاء قاعدة بيانات (اختياري — SQLite لا يحتاج)
> **ملاحظة:** سنستخدم SQLite وهي قاعدة بيانات ملفية لا تحتاج إلى إعداد. فقط تأكد من أن Plesk يسمح بكتابة الملفات.

```
إذا أردت استخدام MySQL بدلاً من SQLite:
1. اذهب إلى: Websites & Domains > Databases
2. اضغط "Add Database"
3. أدخل اسم قاعدة البيانات (مثال: auhmc2026_db)
4. أنشئ مستخدماً وكلمة مرور
5. احتفظ بالمعلومات (سنحتاجها لاحقاً)
```

#### 1.5 الحصول على معلومات الاتصال
```
بعد إعداد الموقع، ستحتاج إلى:
1. FTP/SFTP username and password (لرفع الملفات)
2. Server IP address
3. Domain name
4. Database credentials (إذا استخدمت MySQL)
```

---

## المرحلة 2: بناء Backend (Node.js + Express)

### 2.1 إنشاء ملف `package.json`

```json
{
  "name": "auhmc-2026-server",
  "version": "1.0.0",
  "description": "Backend for AUHMC 2026 Conference Website",
  "main": "server/server.js",
  "scripts": {
    "start": "node server/server.js",
    "dev": "node server/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "better-sqlite3": "^9.4.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^7.1.4"
  }
}
```

### 2.2 إنشاء ملف `.env`

```
PORT=3000
JWT_SECRET=auhmc2026_super_secret_key_change_this
ADMIN_EMAIL=admin@auhmc2026.sy
ADMIN_PASSWORD=admin2026
UPLOAD_DIR=./public/uploads
```

### 2.3 إنشاء ملف `server/database.js`

```javascript
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '..', 'data', 'auhmc.db');

let db;

function getDatabase() {
  if (!db) {
    const fs = require('fs');
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    initializeDatabase();
  }
  return db;
}

function initializeDatabase() {
  // جدول المستخدمين (Admin)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // جدول التسجيلات
  db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      specialty TEXT,
      workplace TEXT,
      workshops TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // جدول المحتوى (Content Management)
  db.exec(`
    CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // جدول المسارات
  db.exec(`
    CREATE TABLE IF NOT EXISTS tracks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      track_id TEXT UNIQUE NOT NULL,
      icon TEXT NOT NULL,
      title TEXT NOT NULL,
      desc TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // جدول الجدول الزمني
  db.exec(`
    CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day INTEGER NOT NULL,
      time TEXT NOT NULL,
      title TEXT NOT NULL,
      speaker TEXT DEFAULT '',
      track TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // جدول اللجان
  db.exec(`
    CREATE TABLE IF NOT EXISTS committees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT NOT NULL,
      title TEXT NOT NULL,
      desc TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // جدول الورشات
  db.exec(`
    CREATE TABLE IF NOT EXISTS workshops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // جدول الرعاة
  db.exec(`
    CREATE TABLE IF NOT EXISTS sponsors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      tier TEXT NOT NULL,
      desc TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    )
  `);

  // إنشاء مستخدم admin افتراضي إذا لم يكن موجوداً
  const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get(process.env.ADMIN_EMAIL || 'admin@auhmc2026.sy');
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin2026', 10);
    db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)').run(
      process.env.ADMIN_EMAIL || 'admin@auhmc2026.sy',
      hashedPassword,
      'مدير الموقع'
    );
  }
}

module.exports = { getDatabase };
```

### 2.4 إنشاء ملف `server/middleware/auth.js`

```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'غير مصرح بالدخول' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'انتهت صلاحية الجلسة' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
```

### 2.5 إنشاء ملف `server/routes/auth.js`

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDatabase } = require('../database');

const router = express.Router();

// تسجيل الدخول
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'البريد الإلكتروني وكلمة المرور مطلوبان' });
  }

  const db = getDatabase();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور خاطئة' });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور خاطئة' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// التحقق من صحة التوكن
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ valid: false });
    }
    res.json({ valid: true, user });
  });
});

// تغيير كلمة المرور
router.post('/change-password', require('../middleware/auth').authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const db = getDatabase();
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

  if (!bcrypt.compareSync(currentPassword, user.password)) {
    return res.status(400).json({ error: 'كلمة المرور الحالية خاطئة' });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, req.user.id);

  res.json({ message: 'تم تغيير كلمة المرور بنجاح' });
});

module.exports = router;
```

### 2.6 إنشاء ملف `server/routes/content.js`

```javascript
const express = require('express');
const { getDatabase } = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// الحصول على جميع المحتوى (عام — لا يحتاج توثيق)
router.get('/', (req, res) => {
  const db = getDatabase();
  const content = db.prepare('SELECT * FROM content').all();
  const tracks = db.prepare('SELECT * FROM tracks ORDER BY sort_order').all();
  const schedule = db.prepare('SELECT * FROM schedule ORDER BY day, sort_order').all();
  const committees = db.prepare('SELECT * FROM committees ORDER BY sort_order').all();
  const workshops = db.prepare('SELECT * FROM workshops ORDER BY sort_order').all();
  const sponsors = db.prepare('SELECT * FROM sponsors ORDER BY sort_order').all();

  // تجميع الجدول حسب اليوم
  const scheduleByDay = {};
  schedule.forEach(item => {
    if (!scheduleByDay[item.day]) scheduleByDay[item.day] = [];
    scheduleByDay[item.day].push({
      time: item.time,
      title: item.title,
      speaker: item.speaker,
      track: item.track
    });
  });

  // تحويل المحتوى إلى كائن
  const contentObj = {};
  content.forEach(c => { contentObj[c.key] = c.value; });

  res.json({
    hero: {
      badge: contentObj.hero_badge || 'المؤتمر العلمي الأول',
      title: contentObj.hero_title || 'مشفى حلب الجامعي',
      subtitle: contentObj.hero_subtitle || 'AUH Medical Conference 2026',
      quote: contentObj.hero_quote || 'معًا نحو نظام صحي متكامل.. رؤى طبية متجددة لغدٍ صحي أفضل',
      date: contentObj.hero_date || '2026-10-15T09:00',
      bgColor: contentObj.hero_bgColor || '#002366'
    },
    stats: {
      days: contentObj.stat_days || '5',
      tracks: contentObj.stat_tracks || '8',
      lectures: contentObj.stat_lectures || '40+',
      participants: contentObj.stat_participants || '300+',
      description: contentObj.hero_description || 'ينطلق المؤتمر العلمي الأول...'
    },
    tracks,
    schedule: scheduleByDay,
    committees,
    workshops,
    sponsors,
    theme: {
      primary: contentObj.theme_primary || '#002366',
      gold: contentObj.theme_gold || '#D4AF37'
    },
    footer: {
      text: contentObj.footer_text || '© 2026 AUHMC — جميع الحقوق محفوظة',
      email: contentObj.footer_email || 'info@auhmc2026.sy',
      phone: contentObj.footer_phone || '+963 21 2XXXXXX'
    }
  });
});

// تحديث المحتوى (يتطلب توثيق)
router.put('/', authenticateToken, (req, res) => {
  const db = getDatabase();
  const updates = req.body;

  const upsert = db.prepare(
    'INSERT INTO content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP'
  );

  const transaction = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      upsert.run(key, String(value));
    }
  });

  transaction();
  res.json({ message: 'تم حفظ المحتوى بنجاح' });
});

// ====== إدارة المسارات ======
router.get('/tracks', (req, res) => {
  const db = getDatabase();
  const tracks = db.prepare('SELECT * FROM tracks ORDER BY sort_order').all();
  res.json(tracks);
});

router.post('/tracks', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { track_id, icon, title, desc } = req.body;
  const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM tracks').get();
  db.prepare('INSERT INTO tracks (track_id, icon, title, desc, sort_order) VALUES (?, ?, ?, ?, ?)').run(
    track_id, icon, title, desc, (maxOrder.max || 0) + 1
  );
  res.json({ message: 'تم إضافة المسار بنجاح' });
});

router.put('/tracks/:id', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { icon, title, desc } = req.body;
  db.prepare('UPDATE tracks SET icon = ?, title = ?, desc = ? WHERE id = ?').run(icon, title, desc, req.params.id);
  res.json({ message: 'تم تحديث المسار بنجاح' });
});

router.delete('/tracks/:id', authenticateToken, (req, res) => {
  const db = getDatabase();
  db.prepare('DELETE FROM tracks WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف المسار بنجاح' });
});

// ====== إدارة الجدول ======
router.get('/schedule', (req, res) => {
  const db = getDatabase();
  const schedule = db.prepare('SELECT * FROM schedule ORDER BY day, sort_order').all();
  const byDay = {};
  schedule.forEach(item => {
    if (!byDay[item.day]) byDay[item.day] = [];
    byDay[item.day].push({
      time: item.time,
      title: item.title,
      speaker: item.speaker,
      track: item.track
    });
  });
  res.json(byDay);
});

router.post('/schedule', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { day, time, title, speaker, track } = req.body;
  const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM schedule WHERE day = ?').get(day);
  db.prepare('INSERT INTO schedule (day, time, title, speaker, track, sort_order) VALUES (?, ?, ?, ?, ?, ?)').run(
    day, time, title, speaker || '', track, (maxOrder.max || 0) + 1
  );
  res.json({ message: 'تم إضافة الفعالية بنجاح' });
});

router.delete('/schedule/:id', authenticateToken, (req, res) => {
  const db = getDatabase();
  db.prepare('DELETE FROM schedule WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف الفعالية بنجاح' });
});

// ====== إدارة اللجان ======
router.get('/committees', (req, res) => {
  const db = getDatabase();
  res.json(db.prepare('SELECT * FROM committees ORDER BY sort_order').all());
});

router.post('/committees', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { icon, title, desc } = req.body;
  const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM committees').get();
  db.prepare('INSERT INTO committees (icon, title, desc, sort_order) VALUES (?, ?, ?, ?)').run(
    icon, title, desc, (maxOrder.max || 0) + 1
  );
  res.json({ message: 'تم إضافة اللجنة بنجاح' });
});

router.delete('/committees/:id', authenticateToken, (req, res) => {
  const db = getDatabase();
  db.prepare('DELETE FROM committees WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف اللجنة بنجاح' });
});

// ====== إدارة الورشات ======
router.get('/workshops', (req, res) => {
  const db = getDatabase();
  res.json(db.prepare('SELECT * FROM workshops ORDER BY sort_order').all());
});

router.post('/workshops', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { name, capacity } = req.body;
  const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM workshops').get();
  db.prepare('INSERT INTO workshops (name, capacity, sort_order) VALUES (?, ?, ?)').run(
    name, capacity, (maxOrder.max || 0) + 1
  );
  res.json({ message: 'تم إضافة الورشة بنجاح' });
});

router.delete('/workshops/:id', authenticateToken, (req, res) => {
  const db = getDatabase();
  db.prepare('DELETE FROM workshops WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف الورشة بنجاح' });
});

// ====== إدارة الرعاة ======
router.get('/sponsors', (req, res) => {
  const db = getDatabase();
  res.json(db.prepare('SELECT * FROM sponsors ORDER BY sort_order').all());
});

router.post('/sponsors', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { name, tier, desc } = req.body;
  const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM sponsors').get();
  db.prepare('INSERT INTO sponsors (name, tier, desc, sort_order) VALUES (?, ?, ?, ?)').run(
    name, tier, desc || '', (maxOrder.max || 0) + 1
  );
  res.json({ message: 'تم إضافة الراعي بنجاح' });
});

router.delete('/sponsors/:id', authenticateToken, (req, res) => {
  const db = getDatabase();
  db.prepare('DELETE FROM sponsors WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف الراعي بنجاح' });
});

module.exports = router;
```

### 2.7 إنشاء ملف `server/routes/registrations.js`

```javascript
const express = require('express');
const { getDatabase } = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// تسجيل جديد (عام — لا يحتاج توثيق)
router.post('/', (req, res) => {
  const { name, phone, email, specialty, workplace, workshops } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'الاسم ورقم الهاتف مطلوبان' });
  }

  const db = getDatabase();
  db.prepare(
    'INSERT INTO registrations (name, phone, email, specialty, workplace, workshops) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(name, phone, email || '', specialty || '', workplace || '', JSON.stringify(workshops || []));

  res.json({ message: 'تم تسجيلك بنجاح! سيتم التواصل معك قريباً.' });
});

// الحصول على جميع التسجيلات (يتطلب توثيق)
router.get('/', authenticateToken, (req, res) => {
  const db = getDatabase();
  const registrations = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all();
  res.json(registrations);
});

// الحصول على إحصائيات التسجيلات
router.get('/stats', authenticateToken, (req, res) => {
  const db = getDatabase();
  const total = db.prepare('SELECT COUNT(*) as count FROM registrations').get();
  const today = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE date(created_at) = date('now')").get();
  res.json({ total: total.count, today: today.count });
});

// حذف تسجيل
router.delete('/:id', authenticateToken, (req, res) => {
  const db = getDatabase();
  db.prepare('DELETE FROM registrations WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف التسجيل بنجاح' });
});

module.exports = router;
```

### 2.8 إنشاء ملف `server/server.js` (الخادم الرئيسي)

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting (حماية من الهجمات)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // حد أقصى 100 طلب لكل IP
  message: { error: 'طلبات كثيرة جداً، حاول لاحقاً' }
});
app.use('/api/', limiter);

// Serve static files (الملفات العامة)
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));
app.use('/api/registrations', require('./routes/registrations'));

// Upload endpoint (رفع الصور)
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // حد أقصى 5MB

app.post('/api/upload', require('./middleware/auth').authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
  }
  res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

// Serve admin.html at /admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

// Fallback: serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'حدث خطأ في الخادم' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AUHMC 2026 Server running on port ${PORT}`);
  console.log(`📁 http://localhost:${PORT}`);
});
```

### 2.9 إنشاء ملف `.gitignore`

```
node_modules/
.env
data/
public/uploads/*
!public/uploads/.gitkeep
*.db
```

### 2.10 تثبيت التبعيات

```bash
# في مجلد المشروع
npm install
```

---

## المرحلة 3: تحديث Frontend للاتصال بالـ API

### 3.1 تحديث `app.js`

**التغييرات المطلوبة:**
1. إزالة البيانات الثابتة (TRACKS, SCHEDULE, إلخ)
2. إضافة دالة `fetchData()` لجلب البيانات من API
3. تعديل `init()` لانتظار تحميل البيانات من API

```javascript
// أضف في بداية الملف (بعد 'use strict')
const API_BASE = window.location.origin + '/api';

// ====== FETCH DATA FROM API ======
let siteData = null;

async function fetchData() {
  try {
    const response = await fetch(`${API_BASE}/content`);
    if (response.ok) {
      siteData = await response.json();
      return siteData;
    }
  } catch (e) {
    console.warn('Could not fetch from API, using defaults');
  }
  return null;
}

// عدّل الدوال التالية لاستخدام siteData بدلاً من الثوابت
// TRACKS → siteData.tracks
// SCHEDULE → siteData.schedule
// COMMITTEES → siteData.committees
// WORKSHOPS → siteData.workshops
// SPONSORS → siteData.sponsors
// THEME → siteData.theme
// HERO → siteData.hero
// STATS → siteData.stats
// FOOTER → siteData.footer
```

**التعديل على دالة `init()`:**
```javascript
async function init() {
  await fetchData();
  
  if (siteData) {
    // استخدم siteData
    applyTheme();
    applyHero();
    applyFooter();
    renderTracks();
    renderCommittees();
    renderSponsors();
    setupRegistration();
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  setupNavigation();
  setupDarkMode();
  setupSchedule();
  setupScrollTop();
  setupAdminLink();
}
```

### 3.2 تحديث `admin.js`

**التغييرات المطلوبة:**
1. إضافة API calls بدلاً من localStorage
2. إضافة تسجيل الدخول عبر API
3. تعديل جميع دوال الحفظ لترسل البيانات إلى API

```javascript
// أضف في بداية الملف
const API_BASE = window.location.origin + '/api';
let authToken = localStorage.getItem('auhmc_admin_token');

// ====== API HELPERS ======
async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  return response.json();
}

async function apiPost(endpoint, data, requiresAuth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (requiresAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return response.json();
}

async function apiPut(endpoint, data) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

async function apiDelete(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  return response.json();
}

// ====== LOGIN ======
async function login(email, password) {
  const result = await apiPost('/auth/login', { email, password }, false);
  if (result.token) {
    authToken = result.token;
    localStorage.setItem('auhmc_admin_token', authToken);
    localStorage.setItem('auhmc_admin_user', JSON.stringify(result.user));
    return true;
  }
  return false;
}

// ====== LOAD DATA FROM API ======
async function loadData() {
  const data = await apiGet('/content');
  // ... استخدم البيانات
}
```

### 3.3 تحديث نموذج التسجيل في `app.js`

```javascript
// استبدال معالج submit الحالي
document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('regName').value,
    phone: document.getElementById('regPhone').value,
    email: document.getElementById('regEmail').value,
    specialty: document.getElementById('regSpecialty').value,
    workplace: document.getElementById('regWorkplace').value,
    workshops: Array.from(document.querySelectorAll('#wsCheckboxes input:checked')).map(cb => cb.value)
  };

  try {
    const response = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      document.getElementById('regForm').style.display = 'none';
      document.getElementById('regSuccess').style.display = 'block';
    } else {
      alert('حدث خطأ في التسجيل. حاول مرة أخرى.');
    }
  } catch (e) {
    alert('حدث خطأ في الاتصال بالخادم');
  }
});
```

---

## المرحلة 4: رفع الملفات إلى Plesk

### 4.1 تحضير الملفات للرفع

```bash
# 1. تأكد من أنك في مجلد المشروع
cd /Users/chayeb/AUHMC-2026-1

# 2. أنشئ مجلد public/uploads
mkdir -p public/uploads
touch public/uploads/.gitkeep

# 3. أنشئ مجلد data
mkdir -p data
touch data/.gitkeep

# 4. تأكد من وجود ملف .env
# (تأكد من أنه غير موجود في GitHub)
```

### 4.2 رفع الملفات عبر FTP/SFTP

#### الطريقة 1: عبر Plesk File Manager
```
1. ادخل إلى Plesk
2. اذهب إلى: Websites & Domains > File Manager
3. ارفع جميع الملفات والمجلدات إلى المجلد الصحيح (عادةً httpdocs)
```

#### الطريقة 2: عبر FTP Client (FileZilla)
```
1. افتح FileZilla (أو أي FTP client)
2. أدخل بيانات الاتصال:
   - Host: عنوان السيرفر IP
   - Username: اسم المستخدم FTP
   - Password: كلمة المرور
   - Port: 21 (FTP) أو 22 (SFTP)
3. اتصل
4. ارفع جميع الملفات من مجلد AUHMC-2026-1 إلى المجلد البعيد
```

### 4.3 تشغيل السيرفر عبر Plesk

```
1. اذهب إلى: Websites & Domains > اختر الدومين
2. اذهب إلى: Node.js
3. تأكد من أن:
   - Node.js مفعل ✅
   - Document Root يشير إلى المجلد الصحيح
   - Application Mode: production
4. اضغط "Apply" أو "تطبيق"
5. اضغط "Restart App" أو "إعادة تشغيل"
```

### 4.4 تثبيت التبعيات على السيرفر

```
في Plesk Node.js:
1. اذهب إلى: Websites & Domains > Node.js
2. اضغط "NPM Install" أو "تثبيت NPM"
3. انتظر حتى يكتمل التثبيت
4. تأكد من عدم وجود أخطاء
```

### 4.5 تفعيل HTTPS (SSL/TLS)

```
1. اذهب إلى: Websites & Domains > SSL/TLS Certificates
2. اضغط "Let's Encrypt" (مجاني)
3. أدخل البريد الإلكتروني
4. اختر الدومين
5. اضغط "Install" أو "تثبيت"
6. انتظر دقيقة وسيتم تفعيل HTTPS
```

---

## المرحلة 5: الاختبار والتشغيل

### 5.1 اختبار الموقع

```
1. افتح المتصفح واذهب إلى: https://yourdomain.com
2. تأكد من أن الموقع يظهر بشكل صحيح
3. اختبر الأقسام: الرئيسية، المسارات، البرنامج، اللجان، التسجيل، الرعاة
4. اختبر الوضع الليلي
5. اختبر العد التنازلي
```

### 5.2 اختبار API

```
1. افتح: https://yourdomain.com/api/content
2. تأكد من أنك ترى بيانات JSON
3. اختبر: https://yourdomain.com/api/registrations/stats
4. يجب أن ترى: {"total": 0, "today": 0}
```

### 5.3 اختبار لوحة التحكم

```
1. افتح: https://yourdomain.com/admin
2. سجل الدخول:
   - البريد: admin@auhmc2026.sy
   - كلمة المرور: admin2026
3. اختبر تعديل المحتوى
4. اختبر إضافة مسار جديد
5. اختبر رفع صورة
```

### 5.4 اختبار التسجيل

```
1. اذهب إلى الصفحة الرئيسية
2. املأ نموذج التسجيل
3. أرسل
4. تأكد من ظهور رسالة النجاح
5. اذهب إلى admin > تحقق من ظهور التسجيل
```

---

## الملحق: أوامر سريعة

### للتطوير المحلي (على جهازك):

```bash
# تشغيل السيرفر محلياً
cd /Users/chayeb/AUHMC-2026-1
npm start

# السيرفر سيعمل على: http://localhost:3000
```

### للرفع إلى GitHub:

```bash
git add .
git commit -m "تحديث: إضافة Backend كامل"
git push origin main
```

### للرفع إلى Plesk:

```bash
# عبر rsync (إذا كان متاحاً)
rsync -avz --exclude 'node_modules' --exclude '.env' --exclude 'data' ./ user@server:/path/to/httpdocs/
```

---

## الملحق: استكشاف الأخطاء

### المشكلة: الموقع لا يعمل (404)
```
السبب: الملفات في مجلد خاطئ
الحل: تأكد من أن index.html في جذر المجلد العام (public/)
```

### المشكلة: API لا يستجيب
```
السبب: Node.js غير مفعل أو لم يعيد التشغيل
الحل: اذهب إلى Plesk > Node.js > Restart App
```

### المشكلة: خطأ في قاعدة البيانات
```
السبب: مجلد data/ غير قابل للكتابة
الحل: اذهب إلى Plesk > File Manager > غير صلاحيات مجلد data إلى 755
```

### المشكلة: رفع الصور لا يعمل
```
السبب: مجلد uploads/ غير قابل للكتابة
الحل: اذهب إلى Plesk > File Manager > غير صلاحيات public/uploads إلى 755
```

### المشكلة: تسجيل الدخول لا يعمل
```
السبب: كلمة المرور الافتراضية تغيرت أو المستخدم غير موجود
الحل: احذف ملف data/auhmc.db وأعد تشغيل السيرفر (سينشئ مستخدم جديد)
```

### المشكلة: الموقع بطيء
```
السبب: وضع التطوير (development mode)
الحل: في Plesk > Node.js > غير Application Mode إلى production
```

---

## ✅ قائمة التحقق النهائية

- [ ] **المرحلة 1:** تم تجهيز Plesk ودعم Node.js
- [ ] **المرحلة 2:** تم إنشاء جميع ملفات Backend
- [ ] **المرحلة 2:** تم تثبيت التبعيات (npm install)
- [ ] **المرحلة 3:** تم تحديث app.js للاتصال بالـ API
- [ ] **المرحلة 3:** تم تحديث admin.js للاتصال بالـ API
- [ ] **المرحلة 3:** تم تحديث نموذج التسجيل
- [ ] **المرحلة 4:** تم رفع الملفات إلى Plesk
- [ ] **المرحلة 4:** تم تثبيت التبعيات على السيرفر
- [ ] **المرحلة 4:** تم تفعيل HTTPS
- [ ] **المرحلة 5:** الموقع يعمل على HTTPS
- [ ] **المرحلة 5:** API يعمل ويعيد بيانات JSON
- [ ] **المرحلة 5:** لوحة التحكم تعمل
- [ ] **المرحلة 5:** التسجيل يعمل ويحفظ في قاعدة البيانات
- [ ] **التوثيق:** تم تحديث CHANGELOG.md
- [ ] **التوثيق:** تم تحديث README.md

---

> **آخر تحديث:** 2026-07-12
> **تم الإنشاء بواسطة:** Cline (AI Assistant)
> **للاستخدام من قبل:** أي نظام ذكاء اصطناعي مستقبلي