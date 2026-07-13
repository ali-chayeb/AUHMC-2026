/* ====== AUHMC 2026 — Admin Panel ====== */

(function () {
  'use strict';

  // ====== CONSTANTS ======
  const STORAGE_KEY = 'auhmc_admin_data';
  const PASSWORD_KEY = 'auhmc_admin_password';
  const DEFAULT_PASSWORD = 'admin2026';
  const LOGGED_IN_KEY = 'auhmc_admin_logged_in';

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
  let editingScheduleKey = null; // {day, index}
  let scheduleFilterDay = 'all';

  // ====== DOM HELPERS ======
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // ====== STORAGE ======
  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        data = JSON.parse(stored);
        // Merge with defaults to ensure all keys exist
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
  }

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
      });
    });
  }

  // ====== HERO FORM ======
  function setupHeroForm() {
    // Load values
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
      <div class="item-row">
        <div class="item-info">
          <strong><i class="fas ${t.icon}"></i> ${t.title}</strong>
          <small>${t.desc}</small>
        </div>
        <div class="item-actions">
          <button class="btn-admin-sm edit-track" data-index="${i}"><i class="fas fa-edit"></i></button>
          <button class="btn-admin-sm btn-danger delete-track" data-index="${i}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('');

    // Edit
    list.querySelectorAll('.edit-track').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const t = data.tracks[idx];
        editingTrackIndex = idx;
        document.getElementById('trackId').value = t.id;
        document.getElementById('trackIcon').value = t.icon;
        document.getElementById('trackTitle').value = t.title;
        document.getElementById('trackDesc').value = t.desc;
        document.querySelector('#trackForm .btn-success').innerHTML = '<i class="fas fa-save"></i> تحديث';
      });
    });

    // Delete
    list.querySelectorAll('.delete-track').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من حذف هذا المسار؟')) {
          data.tracks.splice(parseInt(btn.dataset.index), 1);
          saveData();
          renderTracks();
          showToast('تم حذف المسار بنجاح', 'success');
        }
      });
    });
  }

  function setupTrackForm() {
    document.getElementById('trackForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const item = {
        id: document.getElementById('trackId').value,
        icon: document.getElementById('trackIcon').value,
        title: document.getElementById('trackTitle').value,
        desc: document.getElementById('trackDesc').value
      };

      if (editingTrackIndex >= 0) {
        data.tracks[editingTrackIndex] = item;
        editingTrackIndex = -1;
        document.querySelector('#trackForm .btn-success').innerHTML = '<i class="fas fa-plus"></i> إضافة';
        showToast('تم تحديث المسار بنجاح!', 'success');
      } else {
        data.tracks.push(item);
        showToast('تم إضافة المسار بنجاح!', 'success');
      }

      saveData();
      renderTracks();
      document.getElementById('trackForm').reset();
    });
  }

  // ====== SCHEDULE ======
  function renderSchedule() {
    const list = document.getElementById('scheduleList');
    let items = [];
    const days = scheduleFilterDay === 'all'
      ? Object.keys(data.schedule)
      : [scheduleFilterDay];

    days.forEach(day => {
      (data.schedule[day] || []).forEach((item, idx) => {
        items.push({ day: parseInt(day), index: idx, ...item });
      });
    });

    if (items.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--admin-text-light);">لا توجد فعاليات</div>';
      return;
    }

    list.innerHTML = items.map(item => `
      <div class="item-row">
        <div class="item-info">
          <strong>${item.title}</strong>
          <small>اليوم ${item.day} — ${item.time} — ${item.track} ${item.speaker ? '— ' + item.speaker : ''}</small>
        </div>
        <div class="item-actions">
          <button class="btn-admin-sm edit-sched" data-day="${item.day}" data-index="${item.index}"><i class="fas fa-edit"></i></button>
          <button class="btn-admin-sm btn-danger delete-sched" data-day="${item.day}" data-index="${item.index}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('');

    // Edit
    list.querySelectorAll('.edit-sched').forEach(btn => {
      btn.addEventListener('click', () => {
        const day = parseInt(btn.dataset.day);
        const idx = parseInt(btn.dataset.index);
        const item = data.schedule[day][idx];
        document.getElementById('schedDay').value = day;
        document.getElementById('schedTime').value = item.time;
        document.getElementById('schedTitle').value = item.title;
        document.getElementById('schedSpeaker').value = item.speaker;
        document.getElementById('schedTrack').value = item.track;
        editingScheduleKey = { day, index: idx };
        document.querySelector('#scheduleForm .btn-success').innerHTML = '<i class="fas fa-save"></i> تحديث';
      });
    });

    // Delete
    list.querySelectorAll('.delete-sched').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
          const day = parseInt(btn.dataset.day);
          const idx = parseInt(btn.dataset.index);
          data.schedule[day].splice(idx, 1);
          if (data.schedule[day].length === 0) delete data.schedule[day];
          saveData();
          renderSchedule();
          showToast('تم حذف الفعالية بنجاح', 'success');
        }
      });
    });
  }

  function setupScheduleForm() {
    document.getElementById('scheduleForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const day = parseInt(document.getElementById('schedDay').value);
      const item = {
        time: document.getElementById('schedTime').value,
        title: document.getElementById('schedTitle').value,
        speaker: document.getElementById('schedSpeaker').value,
        track: document.getElementById('schedTrack').value
      };

      if (!data.schedule[day]) data.schedule[day] = [];

      if (editingScheduleKey) {
        data.schedule[editingScheduleKey.day][editingScheduleKey.index] = item;
        editingScheduleKey = null;
        document.querySelector('#scheduleForm .btn-success').innerHTML = '<i class="fas fa-plus"></i> إضافة';
        showToast('تم تحديث الفعالية بنجاح!', 'success');
      } else {
        data.schedule[day].push(item);
        showToast('تم إضافة الفعالية بنجاح!', 'success');
      }

      saveData();
      renderSchedule();
      document.getElementById('scheduleForm').reset();
    });

    // Day filters
    $$('.sched-day-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.sched-day-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        scheduleFilterDay = btn.dataset.day;
        renderSchedule();
      });
    });
  }

  // ====== COMMITTEES ======
  function renderCommittees() {
    const list = document.getElementById('committeesList');
    list.innerHTML = data.committees.map((c, i) => `
      <div class="item-row">
        <div class="item-info">
          <strong><i class="fas ${c.icon}"></i> ${c.title}</strong>
          <small>${c.desc}</small>
        </div>
        <div class="item-actions">
          <button class="btn-admin-sm edit-comm" data-index="${i}"><i class="fas fa-edit"></i></button>
          <button class="btn-admin-sm btn-danger delete-comm" data-index="${i}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.edit-comm').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const c = data.committees[idx];
        editingCommitteeIndex = idx;
        document.getElementById('commIcon').value = c.icon;
        document.getElementById('commTitle').value = c.title;
        document.getElementById('commDesc').value = c.desc;
        document.querySelector('#committeeForm .btn-success').innerHTML = '<i class="fas fa-save"></i> تحديث';
      });
    });

    list.querySelectorAll('.delete-comm').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من حذف هذه اللجنة؟')) {
          data.committees.splice(parseInt(btn.dataset.index), 1);
          saveData();
          renderCommittees();
          showToast('تم حذف اللجنة بنجاح', 'success');
        }
      });
    });
  }

  function setupCommitteeForm() {
    document.getElementById('committeeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const item = {
        icon: document.getElementById('commIcon').value,
        title: document.getElementById('commTitle').value,
        desc: document.getElementById('commDesc').value
      };

      if (editingCommitteeIndex >= 0) {
        data.committees[editingCommitteeIndex] = item;
        editingCommitteeIndex = -1;
        document.querySelector('#committeeForm .btn-success').innerHTML = '<i class="fas fa-plus"></i> إضافة';
        showToast('تم تحديث اللجنة بنجاح!', 'success');
      } else {
        data.committees.push(item);
        showToast('تم إضافة اللجنة بنجاح!', 'success');
      }

      saveData();
      renderCommittees();
      document.getElementById('committeeForm').reset();
    });
  }

  // ====== WORKSHOPS ======
  function renderWorkshops() {
    const list = document.getElementById('workshopsList');
    list.innerHTML = data.workshops.map((w, i) => `
      <div class="item-row">
        <div class="item-info">
          <strong>${w.name}</strong>
          <small>الطاقة الاستيعابية: ${w.capacity} مقعد</small>
        </div>
        <div class="item-actions">
          <button class="btn-admin-sm edit-ws" data-index="${i}"><i class="fas fa-edit"></i></button>
          <button class="btn-admin-sm btn-danger delete-ws" data-index="${i}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.edit-ws').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const w = data.workshops[idx];
        editingWorkshopIndex = idx;
        document.getElementById('wsName').value = w.name;
        document.getElementById('wsCapacity').value = w.capacity;
        document.querySelector('#workshopForm .btn-success').innerHTML = '<i class="fas fa-save"></i> تحديث';
      });
    });

    list.querySelectorAll('.delete-ws').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من حذف هذه الورشة؟')) {
          data.workshops.splice(parseInt(btn.dataset.index), 1);
          saveData();
          renderWorkshops();
          showToast('تم حذف الورشة بنجاح', 'success');
        }
      });
    });
  }

  function setupWorkshopForm() {
    document.getElementById('workshopForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const item = {
        name: document.getElementById('wsName').value,
        capacity: parseInt(document.getElementById('wsCapacity').value)
      };

      if (editingWorkshopIndex >= 0) {
        data.workshops[editingWorkshopIndex] = item;
        editingWorkshopIndex = -1;
        document.querySelector('#workshopForm .btn-success').innerHTML = '<i class="fas fa-plus"></i> إضافة';
        showToast('تم تحديث الورشة بنجاح!', 'success');
      } else {
        data.workshops.push(item);
        showToast('تم إضافة الورشة بنجاح!', 'success');
      }

      saveData();
      renderWorkshops();
      document.getElementById('workshopForm').reset();
    });
  }

  // ====== SPONSORS ======
  function renderSponsors() {
    const list = document.getElementById('sponsorsList');
    list.innerHTML = data.sponsors.map((s, i) => `
      <div class="item-row">
        <div class="item-info">
          <strong>${s.name}</strong>
          <small>${s.tier} — ${s.desc}</small>
        </div>
        <div class="item-actions">
          <button class="btn-admin-sm edit-sp" data-index="${i}"><i class="fas fa-edit"></i></button>
          <button class="btn-admin-sm btn-danger delete-sp" data-index="${i}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.edit-sp').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const s = data.sponsors[idx];
        editingSponsorIndex = idx;
        document.getElementById('spName').value = s.name;
        document.getElementById('spTier').value = s.tier;
        document.getElementById('spDesc').value = s.desc;
        document.querySelector('#sponsorForm .btn-success').innerHTML = '<i class="fas fa-save"></i> تحديث';
      });
    });

    list.querySelectorAll('.delete-sp').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من حذف هذا الراعي؟')) {
          data.sponsors.splice(parseInt(btn.dataset.index), 1);
          saveData();
          renderSponsors();
          showToast('تم حذف الراعي بنجاح', 'success');
        }
      });
    });
  }

  function setupSponsorForm() {
    document.getElementById('sponsorForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const item = {
        name: document.getElementById('spName').value,
        tier: document.getElementById('spTier').value,
        desc: document.getElementById('spDesc').value
      };

      if (editingSponsorIndex >= 0) {
        data.sponsors[editingSponsorIndex] = item;
        editingSponsorIndex = -1;
        document.querySelector('#sponsorForm .btn-success').innerHTML = '<i class="fas fa-plus"></i> إضافة';
        showToast('تم تحديث الراعي بنجاح!', 'success');
      } else {
        data.sponsors.push(item);
        showToast('تم إضافة الراعي بنجاح!', 'success');
      }

      saveData();
      renderSponsors();
      document.getElementById('sponsorForm').reset();
    });
  }

  // ====== MEDIA ======
  function setupMedia() {
    // Logo
    if (data.logo) {
      const preview = document.getElementById('logoPreview');
      preview.innerHTML = `<img src="${data.logo}" alt="Logo">`;
    }

    document.getElementById('logoUpload').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        data.logo = ev.target.result;
        saveData();
        document.getElementById('logoPreview').innerHTML = `<img src="${data.logo}" alt="Logo">`;
        showToast('تم حفظ الشعار بنجاح!', 'success');
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('removeLogoBtn').addEventListener('click', () => {
      data.logo = null;
      saveData();
      document.getElementById('logoPreview').innerHTML = '<i class="fas fa-image"></i>';
      showToast('تم إزالة الشعار', 'success');
    });

    // Background
    if (data.bgImage) {
      const preview = document.getElementById('bgPreview');
      preview.style.backgroundImage = `url(${data.bgImage})`;
      preview.classList.add('has-bg');
    }

    document.getElementById('bgUpload').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        data.bgImage = ev.target.result;
        saveData();
        const preview = document.getElementById('bgPreview');
        preview.style.backgroundImage = `url(${data.bgImage})`;
        preview.classList.add('has-bg');
        showToast('تم حفظ صورة الخلفية بنجاح!', 'success');
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('removeBgBtn').addEventListener('click', () => {
      data.bgImage = null;
      saveData();
      const preview = document.getElementById('bgPreview');
      preview.style.backgroundImage = '';
      preview.classList.remove('has-bg');
      showToast('تم إزالة الخلفية', 'success');
    });

    // Hero BG Color
    document.getElementById('heroBgColor').value = data.hero.bgColor || '#002366';
    document.getElementById('heroBgColorText').value = data.hero.bgColor || '#002366';

    document.getElementById('heroBgColor').addEventListener('input', (e) => {
      document.getElementById('heroBgColorText').value = e.target.value;
    });
    document.getElementById('heroBgColorText').addEventListener('input', (e) => {
      document.getElementById('heroBgColor').value = e.target.value;
    });

    document.getElementById('saveHeroBgColor').addEventListener('click', () => {
      data.hero.bgColor = document.getElementById('heroBgColor').value;
      saveData();
      showToast('تم حفظ لون الخلفية بنجاح!', 'success');
    });
  }

  // ====== THEME ======
  function setupTheme() {
    document.getElementById('colorPrimary').value = data.theme.primary;
    document.getElementById('colorPrimaryText').value = data.theme.primary;
    document.getElementById('colorGold').value = data.theme.gold;
    document.getElementById('colorGoldText').value = data.theme.gold;

    // Sync color inputs
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

    document.getElementById('resetColorsBtn').addEventListener('click', () => {
      data.theme.primary = DEFAULTS.theme.primary;
      data.theme.gold = DEFAULTS.theme.gold;
      document.getElementById('colorPrimary').value = data.theme.primary;
      document.getElementById('colorPrimaryText').value = data.theme.primary;
      document.getElementById('colorGold').value = data.theme.gold;
      document.getElementById('colorGoldText').value = data.theme.gold;
      saveData();
      showToast('تم إعادة الألوان الافتراضية', 'success');
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
      showToast('تم حفظ تخصيصات الفوتر بنجاح!', 'success');
    });
  }

  // ====== SETTINGS ======
  function setupSettings() {
    // Password
    document.getElementById('passwordForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const current = document.getElementById('currentPassword').value;
      const newPwd = document.getElementById('newPassword').value;
      if (current !== getPassword()) {
        showToast('كلمة المرور الحالية خاطئة!', 'error');
        return;
      }
      if (newPwd.length < 4) {
        showToast('كلمة المرور الجديدة يجب أن تكون 4 أحرف على الأقل', 'error');
        return;
      }
      setPassword(newPwd);
      document.getElementById('passwordForm').reset();
      showToast('تم تغيير كلمة المرور بنجاح!', 'success');
    });

    // Export
    document.getElementById('exportBtn').addEventListener('click', () => {
      const exportData = clone(data);
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'auhmc2026-settings.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('تم تصدير الإعدادات بنجاح!', 'success');
    });

    // Import
    document.getElementById('importFile').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          data = deepMerge(clone(DEFAULTS), imported);
          saveData();
          showToast('تم استيراد الإعدادات بنجاح! سيتم إعادة تحميل الصفحة.', 'success');
          setTimeout(() => location.reload(), 1500);
        } catch (err) {
          showToast('خطأ في قراءة الملف. تأكد من أنه ملف JSON صحيح.', 'error');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });

    // Reset all
    document.getElementById('resetAllBtn').addEventListener('click', () => {
      if (confirm('هل أنت متأكد؟ سيتم حذف جميع التخصيصات واستعادة الإعدادات الافتراضية.')) {
        if (confirm('تأكيد نهائي: لا يمكن التراجع عن هذا الإجراء!')) {
          data = clone(DEFAULTS);
          saveData();
          showToast('تم إعادة تعيين كل شيء! سيتم إعادة تحميل الصفحة.', 'success');
          setTimeout(() => location.reload(), 1500);
        }
      }
    });
  }

  // ====== LOGIN ======
  function setupLogin() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const pwd = document.getElementById('loginPassword').value;
      if (pwd === getPassword()) {
        localStorage.setItem(LOGGED_IN_KEY, 'true');
        showAdmin();
        initAdmin();
      } else {
        document.getElementById('loginError').style.display = 'block';
      }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      showLogin();
    });
  }

  // ====== INIT ADMIN ======
  function initAdmin() {
    loadData();
    setupHeroForm();
    renderTracks();
    setupTrackForm();
    renderSchedule();
    setupScheduleForm();
    renderCommittees();
    setupCommitteeForm();
    renderWorkshops();
    setupWorkshopForm();
    renderSponsors();
    setupSponsorForm();
    setupMedia();
    setupTheme();
    setupSettings();
  }

  // ====== BOOT ======
  function boot() {
    setupAdminNav();
    setupLogin();

    if (checkAuth()) {
      showAdmin();
      initAdmin();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();