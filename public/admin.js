/* ====== AUHMC 2026 — Admin Panel ====== */

(function () {
  'use strict';

  // ====== API CONFIG ======
  const API_BASE = window.location.origin + '/api';

  // ====== CONSTANTS ======
  const STORAGE_KEY = 'auhmc_admin_data';
  const PASSWORD_KEY = 'auhmc_admin_password';
  const DEFAULT_PASSWORD = 'admin2026';
  const LOGGED_IN_KEY = 'auhmc_admin_logged_in';
  const AUTH_TOKEN_KEY = 'auhmc_admin_token';
  const AUTH_USER_KEY = 'auhmc_admin_user';

  // ====== DEFAULT DATA ======
  const DEFAULTS = {
    hero: {
      badge: 'المؤتمر العلمي الأول',
      title: 'مشفى حلب الجامعي',
      subtitle: 'AUH Medical Conference 2026',
      quote: 'معًا نحو نظام صحي متكامل.. رؤى طبية متجددة لغدٍ صحي أفضل',
      date: '2026-10-15T09:00',
      bgColor: '#002366'
    },
    stats: {
      days: '5',
      tracks: '8',
      lectures: '40+',
      participants: '300+',
      description: 'ينطلق المؤتمر العلمي الأول لمشفى حلب الجامعي (AUHMC 2026) ليجمع الأطباء الاختصاصيين، المقيمين، والكوادر التمريضية من مختلف المشافي التعليمية والصحية في سورية، في محفل أكاديمي رائد يهدف إلى تبادل الخبرات، عرض أحدث المستجدات الطبية، وتطوير المهارات السريرية عبر محاضرات ورش عمل تفاعلية.'
    },
    tracks: [
      { id: 'pediatrics', icon: 'fa-baby', title: 'طب الأطفال وحديثي الولادة', desc: 'المقاربات الحديثة للإنتانات، تدبير الحالات الحرجة، وعناية الخدج.' },
      { id: 'surgery', icon: 'fa-scalpel', title: 'الجراحة العامة والتخصصية', desc: 'الطفرات في الجراحة التنظيرية، جراحة الأورام، وتدبير الرضوض المتعددة.' },
      { id: 'internal', icon: 'fa-heartbeat', title: 'الأمراض الباطنية', desc: 'مستجدات الاحتشاء القلبي الحاد، الأمراض التنفسية المزمنة، وعلاجات الغدد والصم.' },
      { id: 'diagnostic', icon: 'fa-microscope', title: 'الطب التشخيصي المتقدم', desc: 'الرؤى الحديثة في الطب المخبري والتصوير الشعاعي (الأشعة).' },
      { id: 'subspecialties', icon: 'fa-eye', title: 'الاختصاصات الدقيقة', desc: 'مستجدات أمراض الجلدية، العينية، وأمراض الأذن والأنف والحنجرة.' },
      { id: 'education', icon: 'fa-chalkboard-teacher', title: 'التعليم الطبي المستمر', desc: 'الأساليب الحديثة في التدريب وتقييم المحاضرات السريرية للمقيمين.' },
      { id: 'ai', icon: 'fa-robot', title: 'الذكاء الاصطناعي الطبي', desc: 'تطبيقات الـ AI في التشخيص والممارسة الطبية والسريرية.' },
      { id: 'quality', icon: 'fa-shield-alt', title: 'الجودة وسلامة المرضى', desc: 'بروتوكولات ضبط العدوى في العنايات المشددة ومعايير سلامة المنشآت.' }
    ],
    schedule: {
      1: [
        { time: '12:00 – 13:30', title: 'الافتتاح الرسمي وكلمات الإدارة + محاضرة آفاق البحث السريري', speaker: 'رئيس المؤتمر', track: 'عام' },
        { time: '13:30 – 14:00', title: 'افتتاح معرض البوسترات العلمي', speaker: '', track: 'عام' },
        { time: '14:00 – 15:30', title: 'تطبيقات الذكاء الاصطناعي وضبط العدوى + محاضرة برعاية شركة دوائية', speaker: '', track: 'الذكاء الاصطناعي الطبي' },
        { time: '15:30 – 17:00', title: 'ورشة: كتابة وقراءة الأبحاث الطبية والطب المسند بالدليل (EBM)', speaker: '', track: 'التعليم الطبي المستمر' }
      ],
      2: [
        { time: '12:00 – 13:30', title: 'الأمراض الإنتانية والمناعية + محاضرة برعاية شركة دوائية', speaker: '', track: 'طب الأطفال وحديثي الولادة' },
        { time: '14:00 – 15:30', title: 'عناية الخدج، القصور التنفسي (Surfactant)، والنزف داخل البطينات (IVH)', speaker: '', track: 'طب الأطفال وحديثي الولادة' },
        { time: '15:30 – 17:00', title: 'ورشة: أساسيات وتطبيقات تخطيط صدى القلب السريري (Echocardiography)', speaker: '', track: 'التعليم الطبي المستمر' }
      ],
      3: [
        { time: '12:00 – 13:30', title: 'احتشاء عضلة القلب والأمراض التنفسية المزمنة + محاضرة برعاية شركة أدوية', speaker: '', track: 'الأمراض الباطنية' },
        { time: '14:00 – 15:30', title: 'تدبير الحالات الإسعافية المعقدة (هضم، كلية، غدد صم)', speaker: '', track: 'الأمراض الباطنية' },
        { time: '15:30 – 17:00', title: 'ورشة: تدبير الطريق الهوائي والإنعاش القلبي الرئوي المتقدم (ACLS)', speaker: '', track: 'التعليم الطبي المستمر' }
      ],
      4: [
        { time: '12:00 – 13:30', title: 'الجراحة التنظيرية، الرضوض المتعددة (Poly-trauma)، وجراحة الأورام', speaker: '', track: 'الجراحة العامة والتخصصية' },
        { time: '14:00 – 15:30', title: 'مستجدات العيادات (جلدية، عينية، أذنية) والطب التشخيصي (مخبر وأشعة)', speaker: '', track: 'الاختصاصات الدقيقة' },
        { time: '15:30 – 17:00', title: 'الختام: إعلان التوصيات وتكريم الأبحاث الفائزة', speaker: '', track: 'عام' }
      ],
      5: [
        { time: '12:00 – 14:00', title: 'الجلسة الختامية: إصدار البيان الختامي الرسمي للمؤتمر', speaker: '', track: 'عام' },
        { time: '14:00 – 15:30', title: 'إدارة المشاريع: تحويل التوصيات العلمية إلى مشاريع تنفيذية وبروتوكولات سريرية معتمدة', speaker: '', track: 'الجودة وسلامة المرضى' }
      ]
    },
    committees: [
      { icon: 'fa-crown', title: 'اللجنة العليا', desc: 'الإشراف العام على المؤتمر والتوجيه الاستراتيجي.' },
      { icon: 'fa-flask', title: 'اللجنة العلمية', desc: 'تقييم الأبحاث والبوسترات واختيار المحاضرات العلمية.' },
      { icon: 'fa-tasks', title: 'اللجنة التنظيمية', desc: 'التنسيق اللوجستي وإدارة الفعاليات والجداول الزمنية.' },
      { icon: 'fa-truck', title: 'اللجنة اللوجستية', desc: 'تجهيز القاعات، المعرض، والمعدات الطبية.' },
      { icon: 'fa-bullhorn', title: 'اللجنة الإعلامية', desc: 'التغطية الإعلامية والتسويق والتواصل مع المشاركين.' },
      { icon: 'fa-hand-holding-heart', title: 'لجنة الرعاية', desc: 'التواصل مع الرعاة والشركاء وتنسيق المعرض الدوائي.' }
    ],
    workshops: [
      { name: 'كتابة وقراءة الأبحاث الطبية (EBM)', capacity: 30 },
      { name: 'تخطيط صدى القلب السريري (Echocardiography)', capacity: 20 },
      { name: 'الإنعاش القلبي الرئوي المتقدم (ACLS)', capacity: 25 }
    ],
    sponsors: [
      { name: 'الراعي الرسمي', tier: 'الراعي الماسي', desc: 'شركة رائدة في المجال الدوائي' },
      { name: 'الراعي الثاني', tier: 'الراعي الذهبي', desc: 'شركة معدات طبية' },
      { name: 'الراعي الثالث', tier: 'الراعي الذهبي', desc: 'مختبرات طبية' },
      { name: 'الراعي الرابع', tier: 'الراعي الفضي', desc: 'شركة تقنية معلومات صحية' }
    ],
    theme: {
      primary: '#002366',
      gold: '#D4AF37'
    },
    footer: {
      text: '© 2026 AUHMC — جميع الحقوق محفوظة',
      email: 'info@auhmc2026.sy',
      phone: '+963 21 2XXXXXX'
    },
    logo: null,
    bgImage: null
  };

  // ====== STATE ======
  let data = {};
  let editingTrackIndex = -1;
  let editingCommitteeIndex = -1;
  let editingWorkshopIndex = -1;
  let editingSponsorIndex = -1;
  let scheduleFilterDay = 'all';
  let authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  let useAPI = false;

  // ====== DOM HELPERS ======
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // ====== API HELPERS ======
  function getAuthHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    return headers;
  }

  async function apiPost(endpoint, body) {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (e) {
      return { error: 'لا يمكن الاتصال بالخادم' };
    }
  }

  async function apiPut(endpoint, body) {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (e) {
      return { error: 'لا يمكن الاتصال بالخادم' };
    }
  }

  // ====== STORAGE ======
  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        data = JSON.parse(stored);
        data = deepMerge(clone(DEFAULTS), data);
      } else {
        data = clone(DEFAULTS);
      }
    } catch (e) {
      data = clone(DEFAULTS);
    }
    return data;
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (useAPI && authToken) {
      syncContentToAPI();
    }
  }

  // ====== API SYNC ======
  async function syncContentToAPI() {
    const updates = {};
    updates['hero_badge'] = data.hero.badge;
    updates['hero_title'] = data.hero.title;
    updates['hero_subtitle'] = data.hero.subtitle;
    updates['hero_quote'] = data.hero.quote;
    updates['hero_date'] = data.hero.date;
    updates['hero_bgColor'] = data.hero.bgColor;
    updates['hero_description'] = data.stats.description;
    updates['stat_days'] = data.stats.days;
    updates['stat_tracks'] = data.stats.tracks;
    updates['stat_lectures'] = data.stats.lectures;
    updates['stat_participants'] = data.stats.participants;
    updates['theme_primary'] = data.theme.primary;
    updates['theme_gold'] = data.theme.gold;
    updates['footer_text'] = data.footer.text;
    updates['footer_email'] = data.footer.email;
    updates['footer_phone'] = data.footer.phone;

    const result = await apiPut('/content', updates);
    if (result.error) {
      console.warn('⚠️ API sync failed:', result.error);
    }
  }

  // ====== CLONE & MERGE ======
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function deepMerge(target, source) {
    const result = clone(target);
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  // ====== TOAST ======
  function showToast(msg, type) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast ' + (type || '');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ====== AUTH ======
  function checkAuth() {
    return localStorage.getItem(LOGGED_IN_KEY) === 'true';
  }

  async function apiLogin(email, password) {
    const result = await apiPost('/auth/login', { email, password });
    if (result.token) {
      authToken = result.token;
      localStorage.setItem(AUTH_TOKEN_KEY, authToken);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user));
      localStorage.setItem(LOGGED_IN_KEY, 'true');
      useAPI = true;
      return true;
    }
    return false;
  }

  function localLogin(password) {
    const storedPwd = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === storedPwd) {
      localStorage.setItem(LOGGED_IN_KEY, 'true');
      return true;
    }
    return false;
  }

  function getPassword() {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
  }

  function setPassword(pwd) {
    localStorage.setItem(PASSWORD_KEY, pwd);
  }

  function showAdmin() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminWrapper').classList.add('active');
  }

  function showLogin() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('adminWrapper').classList.remove('active');
    localStorage.removeItem(LOGGED_IN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    useAPI = false;
    authToken = null;
  }

  // ====== LOGIN HANDLER ======
  function setupLogin() {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = document.getElementById('loginPassword').value;
      const email = 'admin@auhmc2026.sy';

      const apiSuccess = await apiLogin(email, password);
      if (apiSuccess) {
        showToast('تم تسجيل الدخول عبر الخادم!', 'success');
        showAdmin();
        return;
      }

      if (localLogin(password)) {
        showToast('تم تسجيل الدخول محلياً!', 'success');
        showAdmin();
      } else {
        showToast('كلمة المرور خاطئة!', 'error');
      }
    });
  }

  // ====== NAVIGATION ======
  function setupAdminNav() {
    const links = $$('.sidebar-nav a');
    const pages = $$('.admin-page');
    const pageTitles = {
      hero: 'الرئيسية',
      tracks: 'المسارات العلمية',
      schedule: 'البرنامج العلمي',
      committees: 'اللجان',
      workshops: 'ورشات العمل',
      sponsors: 'الرعاة',
      registrations: 'التسجيلات',
      media: 'الوسائط',
      theme: 'المظهر',
      settings: 'الإعدادات'
    };

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.adminPage;
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        pages.forEach(p => p.classList.remove('active'));
        const target = document.getElementById('admin-' + page);
        if (target) target.classList.add('active');
        document.getElementById('pageTitle').textContent = pageTitles[page] || page;

        // Load registrations when navigating to that page
        if (page === 'registrations') loadRegistrations();
      });
    });
  }

  // ====== HERO FORM ======
  function setupHeroForm() {
    document.getElementById('heroBadge').value = data.hero.badge;
    document.getElementById('heroTitle').value = data.hero.title;
    document.getElementById('heroSubtitle').value = data.hero.subtitle;
    document.getElementById('heroQuote').value = data.hero.quote;
    document.getElementById('heroDate').value = data.hero.date;
    document.getElementById('statDays').value = data.stats.days;
    document.getElementById('statTracks').value = data.stats.tracks;
    document.getElementById('statLectures').value = data.stats.lectures;
    document.getElementById('statParticipants').value = data.stats.participants;
    document.getElementById('heroDescription').value = data.stats.description;

    document.getElementById('heroForm').addEventListener('submit', (e) => {
      e.preventDefault();
      data.hero.badge = document.getElementById('heroBadge').value;
      data.hero.title = document.getElementById('heroTitle').value;
      data.hero.subtitle = document.getElementById('heroSubtitle').value;
      data.hero.quote = document.getElementById('heroQuote').value;
      data.hero.date = document.getElementById('heroDate').value;
      saveData();
      showToast('تم حفظ النصوص الرئيسية بنجاح!', 'success');
    });

    document.getElementById('statsForm').addEventListener('submit', (e) => {
      e.preventDefault();
      data.stats.days = document.getElementById('statDays').value;
      data.stats.tracks = document.getElementById('statTracks').value;
      data.stats.lectures = document.getElementById('statLectures').value;
      data.stats.participants = document.getElementById('statParticipants').value;
      data.stats.description = document.getElementById('heroDescription').value;
      saveData();
      showToast('تم حفظ الإحصائيات بنجاح!', 'success');
    });
  }

  // ====== TRACKS ======
  function renderTracks() {
    const list = document.getElementById('tracksList');
    list.innerHTML = data.tracks.map((t, i) => `
      <div class="cm-item">
        <div class="cm-icon"><i class="fas ${t.icon}"></i></div>
        <div class="cm-info">
          <strong>${t.title}</strong>
          <small>${t.desc}</small>
        </div>
        <div class="cm-actions">
          <button class="btn-sm btn-primary" onclick="window._editTrack(${i})">تعديل</button>
          <button class="btn-sm btn-danger" onclick="window._deleteTrack(${i})">حذف</button>
        </div>
      </div>
    `).join('');
  }

  window._editTrack = function (i) {
    editingTrackIndex = i;
    const t = data.tracks[i];
    document.getElementById('trackId').value = t.id || '';
    document.getElementById('trackIcon').value = t.icon;
    document.getElementById('trackTitle').value = t.title;
    document.getElementById('trackDesc').value = t.desc;
    document.getElementById('trackForm').querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> تحديث';
  };

  window._deleteTrack = function (i) {
    if (!confirm('هل تريد حذف هذا المسار؟')) return;
    data.tracks.splice(i, 1);
    saveData();
    renderTracks();
    showToast('تم حذف المسار بنجاح', 'success');
  };

  function setupTracks() {
    renderTracks();
    const form = document.getElementById('trackForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const icon = document.getElementById('trackIcon').value;
      const title = document.getElementById('trackTitle').value;
      const desc = document.getElementById('trackDesc').value;
      const track = { icon, title, desc };

      if (editingTrackIndex >= 0) {
        data.tracks[editingTrackIndex] = { ...data.tracks[editingTrackIndex], ...track };
        editingTrackIndex = -1;
        form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-plus"></i> إضافة';
      } else {
        const id = title.replace(/\s+/g, '-').toLowerCase();
        track.id = id;
        data.tracks.push(track);
      }

      saveData();
      renderTracks();
      form.reset();
      showToast('تم حفظ المسار بنجاح!', 'success');
    });
  }

  // ====== SCHEDULE ======
  function renderSchedule() {
    const list = document.getElementById('scheduleList');
    const days = { 1: 'اليوم الأول', 2: 'اليوم الثاني', 3: 'اليوم الثالث', 4: 'اليوم الرابع', 5: 'اليوم الخامس' };

    let html = '';
    for (const [dayNum, dayName] of Object.entries(days)) {
      if (scheduleFilterDay !== 'all' && scheduleFilterDay !== dayNum) continue;
      const items = data.schedule[dayNum] || [];
      html += `<div class="schedule-day-group"><h4 style="color:var(--gold);margin:1rem 0 0.5rem;">${dayName}</h4>`;
      items.forEach((item, idx) => {
        html += `
          <div class="cm-item">
            <div class="cm-info">
              <strong>${item.time}</strong>
              <div>${item.title}</div>
              <small>${item.track}${item.speaker ? ' — ' + item.speaker : ''}</small>
            </div>
            <div class="cm-actions">
              <button class="btn-sm btn-danger" onclick="window._deleteSchedule(${dayNum}, ${idx})">حذف</button>
            </div>
          </div>
        `;
      });
      html += '</div>';
    }
    list.innerHTML = html || '<p style="color:var(--gray-500);text-align:center;">لا توجد فعاليات</p>';
  }

  window._deleteSchedule = function (day, idx) {
    if (!confirm('هل تريد حذف هذه الفعالية؟')) return;
    data.schedule[day].splice(idx, 1);
    saveData();
    renderSchedule();
    showToast('تم حذف الفعالية بنجاح', 'success');
  };

  function setupSchedule() {
    renderSchedule();

    // Day filter buttons
    $$('.sched-day-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.sched-day-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        scheduleFilterDay = btn.dataset.day;
        renderSchedule();
      });
    });

    const form = document.getElementById('scheduleForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const day = parseInt(document.getElementById('schedDay').value);
      const time = document.getElementById('schedTime').value;
      const title = document.getElementById('schedTitle').value;
      const speaker = document.getElementById('schedSpeaker').value;
      const track = document.getElementById('schedTrack').value;

      if (!data.schedule[day]) data.schedule[day] = [];
      data.schedule[day].push({ time, title, speaker, track });
      saveData();
      renderSchedule();
      form.reset();
      showToast('تم إضافة الفعالية بنجاح!', 'success');
    });
  }

  // ====== COMMITTEES ======
  function renderCommittees() {
    const list = document.getElementById('committeesList');
    list.innerHTML = data.committees.map((c, i) => `
      <div class="cm-item">
        <div class="cm-icon"><i class="fas ${c.icon}"></i></div>
        <div class="cm-info">
          <strong>${c.title}</strong>
          <small>${c.desc}</small>
        </div>
        <div class="cm-actions">
          <button class="btn-sm btn-primary" onclick="window._editCommittee(${i})">تعديل</button>
          <button class="btn-sm btn-danger" onclick="window._deleteCommittee(${i})">حذف</button>
        </div>
      </div>
    `).join('');
  }

  window._editCommittee = function (i) {
    editingCommitteeIndex = i;
    const c = data.committees[i];
    document.getElementById('commIcon').value = c.icon;
    document.getElementById('commTitle').value = c.title;
    document.getElementById('commDesc').value = c.desc;
    document.getElementById('committeeForm').querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> تحديث';
  };

  window._deleteCommittee = function (i) {
    if (!confirm('هل تريد حذف هذه اللجنة؟')) return;
    data.committees.splice(i, 1);
    saveData();
    renderCommittees();
    showToast('تم حذف اللجنة بنجاح', 'success');
  };

  function setupCommittees() {
    renderCommittees();
    const form = document.getElementById('committeeForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const icon = document.getElementById('commIcon').value;
      const title = document.getElementById('commTitle').value;
      const desc = document.getElementById('commDesc').value;

      if (editingCommitteeIndex >= 0) {
        data.committees[editingCommitteeIndex] = { icon, title, desc };
        editingCommitteeIndex = -1;
        form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-plus"></i> إضافة';
      } else {
        data.committees.push({ icon, title, desc });
      }

      saveData();
      renderCommittees();
      form.reset();
      showToast('تم حفظ اللجنة بنجاح!', 'success');
    });
  }

  // ====== WORKSHOPS ======
  function renderWorkshops() {
    const list = document.getElementById('workshopsList');
    list.innerHTML = data.workshops.map((w, i) => `
      <div class="cm-item">
        <div class="cm-info">
          <strong>${w.name}</strong>
          <small>الطاقة الاستيعابية: ${w.capacity} مقعد</small>
        </div>
        <div class="cm-actions">
          <button class="btn-sm btn-primary" onclick="window._editWorkshop(${i})">تعديل</button>
          <button class="btn-sm btn-danger" onclick="window._deleteWorkshop(${i})">حذف</button>
        </div>
      </div>
    `).join('');
  }

  window._editWorkshop = function (i) {
    editingWorkshopIndex = i;
    const w = data.workshops[i];
    document.getElementById('wsName').value = w.name;
    document.getElementById('wsCapacity').value = w.capacity;
    document.getElementById('workshopForm').querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> تحديث';
  };

  window._deleteWorkshop = function (i) {
    if (!confirm('هل تريد حذف هذه الورشة؟')) return;
    data.workshops.splice(i, 1);
    saveData();
    renderWorkshops();
    showToast('تم حذف الورشة بنجاح', 'success');
  };

  function setupWorkshops() {
    renderWorkshops();
    const form = document.getElementById('workshopForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('wsName').value;
      const capacity = parseInt(document.getElementById('wsCapacity').value);

      if (editingWorkshopIndex >= 0) {
        data.workshops[editingWorkshopIndex] = { name, capacity };
        editingWorkshopIndex = -1;
        form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-plus"></i> إضافة';
      } else {
        data.workshops.push({ name, capacity });
      }

      saveData();
      renderWorkshops();
      form.reset();
      showToast('تم حفظ الورشة بنجاح!', 'success');
    });
  }

  // ====== SPONSORS ======
  function renderSponsors() {
    const list = document.getElementById('sponsorsList');
    list.innerHTML = data.sponsors.map((s, i) => `
      <div class="cm-item">
        <div class="cm-info">
          <strong>${s.name}</strong>
          <small>${s.tier} — ${s.desc}</small>
        </div>
        <div class="cm-actions">
          <button class="btn-sm btn-primary" onclick="window._editSponsor(${i})">تعديل</button>
          <button class="btn-sm btn-danger" onclick="window._deleteSponsor(${i})">حذف</button>
        </div>
      </div>
    `).join('');
  }

  window._editSponsor = function (i) {
    editingSponsorIndex = i;
    const s = data.sponsors[i];
    document.getElementById('spName').value = s.name;
    document.getElementById('spTier').value = s.tier;
    document.getElementById('spDesc').value = s.desc;
    document.getElementById('sponsorForm').querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> تحديث';
  };

  window._deleteSponsor = function (i) {
    if (!confirm('هل تريد حذف هذا الراعي؟')) return;
    data.sponsors.splice(i, 1);
    saveData();
    renderSponsors();
    showToast('تم حذف الراعي بنجاح', 'success');
  };

  function setupSponsors() {
    renderSponsors();
    const form = document.getElementById('sponsorForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('spName').value;
      const tier = document.getElementById('spTier').value;
      const desc = document.getElementById('spDesc').value;

      if (editingSponsorIndex >= 0) {
        data.sponsors[editingSponsorIndex] = { name, tier, desc };
        editingSponsorIndex = -1;
        form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-plus"></i> إضافة';
      } else {
        data.sponsors.push({ name, tier, desc });
      }

      saveData();
      renderSponsors();
      form.reset();
      showToast('تم حفظ الراعي بنجاح!', 'success');
    });
  }

  // ====== MEDIA ======
  function setupMedia() {
    // Logo upload
    document.getElementById('logoInput').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        data.logo = ev.target.result;
        document.getElementById('logoPreview').innerHTML = `<img src="${ev.target.result}" alt="Logo" style="max-height:80px;">`;
        saveData();
        showToast('تم رفع الشعار بنجاح!', 'success');
      };
      reader.readAsDataURL(file);
    });

    // Background image upload
    document.getElementById('bgUpload').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        data.bgImage = ev.target.result;
        document.getElementById('bgPreview').style.backgroundImage = `url('${ev.target.result}')`;
        saveData();
        showToast('تم رفع صورة الخلفية بنجاح!', 'success');
      };
      reader.readAsDataURL(file);
    });

    // Background color
    document.getElementById('heroBgColor').addEventListener('input', (e) => {
      data.hero.bgColor = e.target.value;
      document.getElementById('heroBgColorText').value = e.target.value;
      document.getElementById('bgPreview').style.backgroundColor = e.target.value;
      saveData();
    });
    document.getElementById('heroBgColorText').addEventListener('input', (e) => {
      data.hero.bgColor = e.target.value;
      document.getElementById('heroBgColor').value = e.target.value;
      document.getElementById('bgPreview').style.backgroundColor = e.target.value;
      saveData();
    });

    // Save hero bg color button
    document.getElementById('saveHeroBgColor').addEventListener('click', () => {
      showToast('تم حفظ لون الخلفية!', 'success');
    });

    // Remove background image
    document.getElementById('removeBgBtn').addEventListener('click', () => {
      data.bgImage = null;
      document.getElementById('bgPreview').style.backgroundImage = 'none';
      document.getElementById('bgUpload').value = '';
      saveData();
      showToast('تم إزالة صورة الخلفية', 'info');
    });

    // Remove logo
    document.getElementById('removeLogoBtn').addEventListener('click', () => {
      data.logo = null;
      document.getElementById('logoPreview').innerHTML = '<i class="fas fa-image"></i>';
      document.getElementById('logoInput').value = '';
      saveData();
      showToast('تم إزالة الشعار', 'info');
    });
  }

  // ====== THEME ======
  function setupTheme() {
    document.getElementById('colorPrimary').value = data.theme.primary;
    document.getElementById('colorPrimaryText').value = data.theme.primary;
    document.getElementById('colorGold').value = data.theme.gold;
    document.getElementById('colorGoldText').value = data.theme.gold;

    // Sync color picker with text input
    document.getElementById('colorPrimary').addEventListener('input', (e) => {
      document.getElementById('colorPrimaryText').value = e.target.value;
    });
    document.getElementById('colorPrimaryText').addEventListener('input', (e) => {
      document.getElementById('colorPrimary').value = e.target.value;
    });
    document.getElementById('colorGold').addEventListener('input', (e) => {
      document.getElementById('colorGoldText').value = e.target.value;
    });
    document.getElementById('colorGoldText').addEventListener('input', (e) => {
      document.getElementById('colorGold').value = e.target.value;
    });

    document.getElementById('themeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      data.theme.primary = document.getElementById('colorPrimary').value;
      data.theme.gold = document.getElementById('colorGold').value;
      saveData();
      showToast('تم حفظ الألوان بنجاح!', 'success');
    });

    // Reset colors
    document.getElementById('resetColorsBtn').addEventListener('click', () => {
      data.theme.primary = DEFAULTS.theme.primary;
      data.theme.gold = DEFAULTS.theme.gold;
      document.getElementById('colorPrimary').value = DEFAULTS.theme.primary;
      document.getElementById('colorPrimaryText').value = DEFAULTS.theme.primary;
      document.getElementById('colorGold').value = DEFAULTS.theme.gold;
      document.getElementById('colorGoldText').value = DEFAULTS.theme.gold;
      saveData();
      showToast('تم إعادة الألوان الافتراضية', 'info');
    });

    // Footer
    document.getElementById('footerText').value = data.footer.text;
    document.getElementById('footerEmail').value = data.footer.email;
    document.getElementById('footerPhone').value = data.footer.phone;

    document.getElementById('footerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      data.footer.text = document.getElementById('footerText').value;
      data.footer.email = document.getElementById('footerEmail').value;
      data.footer.phone = document.getElementById('footerPhone').value;
      saveData();
      showToast('تم حفظ الفوتر بنجاح!', 'success');
    });
  }

  // ====== SETTINGS ======
  function setupSettings() {
    // Change password
    document.getElementById('passwordForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const current = document.getElementById('currentPassword').value;
      const newPwd = document.getElementById('newPassword').value;

      if (current !== getPassword()) {
        showToast('كلمة المرور الحالية خاطئة!', 'error');
        return;
      }
      if (newPwd.length < 6) {
        showToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل!', 'error');
        return;
      }

      setPassword(newPwd);
      showToast('تم تغيير كلمة المرور بنجاح!', 'success');
      document.getElementById('passwordForm').reset();
    });

    // Export data
    document.getElementById('exportBtn').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'auhmc2026-backup.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('تم تصدير البيانات بنجاح!', 'success');
    });

    // Import data
    document.getElementById('importBtn').addEventListener('click', () => {
      document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          data = deepMerge(clone(DEFAULTS), imported);
          saveData();
          showToast('تم استيراد البيانات بنجاح!', 'success');
          setTimeout(() => location.reload(), 1500);
        } catch (err) {
          showToast('الملف غير صالح!', 'error');
        }
      };
      reader.readAsText(file);
    });

    // Reset all data
    document.getElementById('resetAllBtn').addEventListener('click', () => {
      if (!confirm('هل أنت متأكد؟ سيتم حذف جميع التعديلات وإعادة تعيين الموقع إلى الإعدادات الافتراضية!')) return;
      localStorage.removeItem(STORAGE_KEY);
      data = clone(DEFAULTS);
      saveData();
      showToast('تم إعادة تعيين الموقع بنجاح!', 'info');
      setTimeout(() => location.reload(), 1500);
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      showLogin();
      showToast('تم تسجيل الخروج', 'info');
    });
  }

  // ====== REGISTRATIONS VIEWER ======
  async function loadRegistrations() {
    const container = document.getElementById('registrationsContainer');
    if (!container) return;

    if (!authToken) {
      container.innerHTML = '<p style="color:var(--gray-500);text-align:center;padding:2rem;">⚠️ يجب تسجيل الدخول عبر الخادم لعرض التسجيلات</p>';
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/registrations`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.ok) {
        const registrations = await response.json();
        if (registrations.length === 0) {
          container.innerHTML = '<p style="color:var(--gray-500);text-align:center;padding:2rem;">لا توجد تسجيلات بعد</p>';
          return;
        }
        container.innerHTML = `
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
              <thead>
                <tr style="background:var(--primary);color:white;">
                  <th style="padding:0.75rem;">#</th>
                  <th style="padding:0.75rem;">الاسم</th>
                  <th style="padding:0.75rem;">الهاتف</th>
                  <th style="padding:0.75rem;">البريد</th>
                  <th style="padding:0.75rem;">الاختصاص</th>
                  <th style="padding:0.75rem;">جهة العمل</th>
                  <th style="padding:0.75rem;">الورشات</th>
                  <th style="padding:0.75rem;">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                ${registrations.map((r, i) => `
                  <tr style="border-bottom:1px solid var(--border);">
                    <td style="padding:0.75rem;">${i + 1}</td>
                    <td style="padding:0.75rem;">${r.name}</td>
                    <td style="padding:0.75rem;">${r.phone}</td>
                    <td style="padding:0.75rem;">${r.email || '-'}</td>
                    <td style="padding:0.75rem;">${r.specialty || '-'}</td>
                    <td style="padding:0.75rem;">${r.workplace || '-'}</td>
                    <td style="padding:0.75rem;">${(r.workshops ? JSON.parse(r.workshops) : []).length}</td>
                    <td style="padding:0.75rem;">${new Date(r.created_at).toLocaleDateString('ar-SY')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <p style="margin-top:1rem;color:var(--gray-500);font-size:0.85rem;">إجمالي المسجلين: ${registrations.length}</p>
        `;
      } else {
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:2rem;">⚠️ فشل تحميل التسجيلات</p>';
      }
    } catch (e) {
      container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:2rem;">⚠️ لا يمكن الاتصال بالخادم</p>';
    }
  }

  // ====== INIT ======
  function init() {
    loadData();

    if (checkAuth()) {
      showAdmin();
      if (localStorage.getItem(AUTH_TOKEN_KEY)) {
        useAPI = true;
        authToken = localStorage.getItem(AUTH_TOKEN_KEY);
      }
    }

    setupLogin();
    setupAdminNav();
    setupHeroForm();
    setupTracks();
    setupSchedule();
    setupCommittees();
    setupWorkshops();
    setupSponsors();
    setupMedia();
    setupTheme();
    setupSettings();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();