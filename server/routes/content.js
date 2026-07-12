const express = require('express');
const { getDatabase } = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/content - Get all content (public)
router.get('/', (req, res) => {
  const db = getDatabase();
  const content = db.prepare('SELECT * FROM content').all();
  const tracks = db.prepare('SELECT * FROM tracks ORDER BY sort_order').all();
  const schedule = db.prepare('SELECT * FROM schedule ORDER BY day, sort_order').all();
  const committees = db.prepare('SELECT * FROM committees ORDER BY sort_order').all();
  const workshops = db.prepare('SELECT * FROM workshops ORDER BY sort_order').all();
  const sponsors = db.prepare('SELECT * FROM sponsors ORDER BY sort_order').all();

  // Group schedule by day
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

  // Convert content to object
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
      description: contentObj.hero_description || 'ينطلق المؤتمر العلمي الأول لمشفى حلب الجامعي (AUHMC 2026) ليجمع الأطباء الاختصاصيين، المقيمين، والكوادر التمريضية من مختلف المشافي التعليمية والصحية في سورية، في محفل أكاديمي رائد يهدف إلى تبادل الخبرات، عرض أحدث المستجدات الطبية، وتطوير المهارات السريرية عبر محاضرات وورش عمل تفاعلية.'
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

// PUT /api/content - Update content (requires auth)
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

// ====== TRACKS ======
router.get('/tracks', (req, res) => {
  const db = getDatabase();
  const tracks = db.prepare('SELECT * FROM tracks ORDER BY sort_order').all();
  res.json(tracks);
});

router.post('/tracks', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { track_id, icon, title, desc } = req.body;
  if (!track_id || !icon || !title || !desc) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }
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

// ====== SCHEDULE ======
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
  if (!day || !time || !title || !track) {
    return res.status(400).json({ error: 'اليوم والوقت والعنوان والمسار حقول مطلوبة' });
  }
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

// ====== COMMITTEES ======
router.get('/committees', (req, res) => {
  const db = getDatabase();
  res.json(db.prepare('SELECT * FROM committees ORDER BY sort_order').all());
});

router.post('/committees', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { icon, title, desc } = req.body;
  if (!icon || !title || !desc) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }
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

// ====== WORKSHOPS ======
router.get('/workshops', (req, res) => {
  const db = getDatabase();
  res.json(db.prepare('SELECT * FROM workshops ORDER BY sort_order').all());
});

router.post('/workshops', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { name, capacity } = req.body;
  if (!name || !capacity) {
    return res.status(400).json({ error: 'الاسم والطاقة الاستيعابية مطلوبان' });
  }
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

// ====== SPONSORS ======
router.get('/sponsors', (req, res) => {
  const db = getDatabase();
  res.json(db.prepare('SELECT * FROM sponsors ORDER BY sort_order').all());
});

router.post('/sponsors', authenticateToken, (req, res) => {
  const db = getDatabase();
  const { name, tier, desc } = req.body;
  if (!name || !tier) {
    return res.status(400).json({ error: 'الاسم والتصنيف مطلوبان' });
  }
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