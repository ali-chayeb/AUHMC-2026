const express = require('express');
const { getDatabase } = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/registrations - New registration (public)
router.post('/', (req, res) => {
  const { name, phone, email, specialty, workplace, workshops } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'الاسم ورقم الهاتف مطلوبان' });
  }

  try {
    const db = getDatabase();
    db.prepare(
      'INSERT INTO registrations (name, phone, email, specialty, workplace, workshops) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(name, phone, email || '', specialty || '', workplace || '', JSON.stringify(workshops || []));

    res.json({ message: 'تم تسجيلك بنجاح! سيتم التواصل معك قريباً.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'حدث خطأ في التسجيل. حاول مرة أخرى.' });
  }
});

// GET /api/registrations - Get all registrations (requires auth)
router.get('/', authenticateToken, (req, res) => {
  const db = getDatabase();
  const registrations = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all();
  res.json(registrations);
});

// GET /api/registrations/stats - Get registration statistics (requires auth)
router.get('/stats', authenticateToken, (req, res) => {
  const db = getDatabase();
  const total = db.prepare('SELECT COUNT(*) as count FROM registrations').get();
  const today = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE date(created_at) = date('now')").get();
  res.json({ total: total.count, today: today.count });
});

// DELETE /api/registrations/:id - Delete a registration (requires auth)
router.delete('/:id', authenticateToken, (req, res) => {
  const db = getDatabase();
  db.prepare('DELETE FROM registrations WHERE id = ?').run(req.params.id);
  res.json({ message: 'تم حذف التسجيل بنجاح' });
});

module.exports = router;