/* ====== AUHMC 2026 — Main Application (Standalone) ====== */

(function () {
  'use strict';

  // ====== ADMIN DATA BRIDGE (localStorage only) ======
  const ADMIN_KEY = 'auhmc_admin_data';

  function loadAdminData() {
    try {
      const stored = localStorage.getItem(ADMIN_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return null;
  }

  // ====== HARDCODED DEFAULT DATA (no API needed) ======
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
      description: 'ينطلق المؤتمر العلمي الأول لمشفى حلب الجامعي (AUHMC 2026) ليجمع الأطباء الاختصاصيين، المقيمين، والكوادر التрمريضية من مختلف المشافي التعليمية والصحية في سورية، في محفل أكاديمي رائد يهدف إلى تبادل الخبرات، عرض أحدث المستجدات الطبية، وتطوير المهارات السريرية عبر محاضرات وورش عمل تفاعلية.'
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
    theme: { primary: '#002366', gold: '#D4AF37' },
    footer: {
      text: '© 2026 AUHMC — جميع الحقوق محفوظة',
      email: 'info@auhmc2026.sy',
      phone: '+963 21 2XXXXXX'
    }
  };

  // ====== STATE ======
  let CONFERENCE_DATE = new Date('2026-10-15T09:00:00+03:00');
  let TRACKS = DEFAULTS.tracks;
  let SCHEDULE = DEFAULTS.schedule;
  let COMMITTEES = DEFAULTS.committees;
  let WORKSHOPS = DEFAULTS.workshops;
  let SPONSORS = DEFAULTS.sponsors;
  let THEME = DEFAULTS.theme;
  let HERO = DEFAULTS.hero;
  let STATS = DEFAULTS.stats;
  let FOOTER = DEFAULTS.footer;
  let bgImage = null;
  let logo = null;

  // ====== LOAD DATA FROM localStorage (admin customizations) ======
  function loadData() {
    const adminData = loadAdminData();
    if (!adminData) return; // Use hardcoded defaults

    if (adminData.hero) {
      HERO = { ...HERO, ...adminData.hero };
      if (adminData.hero.date) {
        CONFERENCE_DATE = new Date(adminData.hero.date + ':00+03:00');
      }
    }
    if (adminData.stats) STATS = { ...STATS, ...adminData.stats };
    if (adminData.tracks && adminData.tracks.length) TRACKS = adminData.tracks;
    if (adminData.schedule && Object.keys(adminData.schedule).length) SCHEDULE = adminData.schedule;
    if (adminData.committees && adminData.committees.length) COMMITTEES = adminData.committees;
    if (adminData.workshops && adminData.workshops.length) WORKSHOPS = adminData.workshops;
    if (adminData.sponsors && adminData.sponsors.length) SPONSORS = adminData.sponsors;
    if (adminData.theme) THEME = { ...THEME, ...adminData.theme };
    if (adminData.footer) FOOTER = { ...FOOTER, ...adminData.footer };
    if (adminData.bgImage) bgImage = adminData.bgImage;
    if (adminData.logo) logo = adminData.logo;
  }

  // ====== DOM REFS ======
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // ====== APPLY THEME ======
  function applyTheme() {
    if (THEME.primary) {
      document.documentElement.style.setProperty('--primary', THEME.primary);
      document.documentElement.style.setProperty('--primary-light', lightenColor(THEME.primary, 20));
      document.documentElement.style.setProperty('--primary-dark', darkenColor(THEME.primary, 20));
    }
    if (THEME.gold) {
      document.documentElement.style.setProperty('--gold', THEME.gold);
      document.documentElement.style.setProperty('--gold-light', lightenColor(THEME.gold, 15));
      document.documentElement.style.setProperty('--gold-dark', darkenColor(THEME.gold, 15));
    }
  }

  function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
  }

  function darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
  }

  // ====== APPLY HERO ======
  function applyHero() {
    const badgeEl = document.querySelector('.hero-badge');
    if (badgeEl && HERO.badge) badgeEl.textContent = HERO.badge;

    const titleEl = document.querySelector('.hero-title');
    if (titleEl && HERO.title) titleEl.textContent = HERO.title;

    const subtitleEl = document.querySelector('.hero-subtitle');
    if (subtitleEl && HERO.subtitle) subtitleEl.textContent = HERO.subtitle;

    const quoteEl = document.querySelector('.hero-quote');
    if (quoteEl && HERO.quote) quoteEl.textContent = `"${HERO.quote}"`;

    if (HERO.bgColor) {
      const heroEl = document.querySelector('.hero');
      if (heroEl) {
        heroEl.style.background = `linear-gradient(135deg, ${darkenColor(HERO.bgColor, 30)} 0%, ${HERO.bgColor} 50%, ${lightenColor(HERO.bgColor, 15)} 100%)`;
      }
    }

    if (bgImage) {
      const heroEl = document.querySelector('.hero');
      if (heroEl) {
        heroEl.style.background = `linear-gradient(135deg, rgba(0,17,51,0.85) 0%, rgba(0,35,102,0.75) 100%), url('${bgImage}') center/cover no-repeat`;
      }
    }

    if (logo) {
      const logoIcon = document.querySelector('.logo-icon');
      if (logoIcon) {
        logoIcon.innerHTML = `<img src="${logo}" alt="Logo" style="height:36px;width:auto;">`;
      }
    }

    const statCards = $$('.about-card');
    if (statCards.length >= 4) {
      const statValues = [
        STATS.days || '5',
        STATS.tracks || '8',
        STATS.lectures || '40+',
        STATS.participants || '300+'
      ];
      statCards.forEach((card, i) => {
        const numEl = card.querySelector('.about-num');
        if (numEl && statValues[i]) numEl.textContent = statValues[i];
      });
    }

    const descEl = document.querySelector('.about-desc');
    if (descEl && STATS.description) descEl.textContent = STATS.description;
  }

  // ====== APPLY FOOTER ======
  function applyFooter() {
    if (FOOTER.text) {
      const fb = document.querySelector('.footer-bottom p');
      if (fb) fb.textContent = FOOTER.text;
    }
    if (FOOTER.email) {
      const emailEl = document.querySelector('.footer-contact p:first-child');
      if (emailEl) emailEl.innerHTML = `<i class="fas fa-envelope"></i> ${FOOTER.email}`;
    }
    if (FOOTER.phone) {
      const phoneEl = document.querySelector('.footer-contact p:nth-child(2)');
      if (phoneEl) phoneEl.innerHTML = `<i class="fas fa-phone"></i> ${FOOTER.phone}`;
    }
  }

  // ====== COUNTDOWN ======
  function updateCountdown() {
    const now = new Date();
    const diff = Math.max(0, CONFERENCE_DATE - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
  }

  // ====== NAVIGATION ======
  function setupNavigation() {
    const navLinks = $$('.nav-links a, [data-nav]');
    const sections = $$('.section');

    function navigateTo(sectionId) {
      navLinks.forEach(link => {
        if (link.dataset.nav === sectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      sections.forEach(s => s.classList.remove('active'));
      const target = document.getElementById('section-' + sectionId);
      if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const navLinksEl = document.getElementById('navLinks');
      if (navLinksEl) navLinksEl.classList.remove('open');
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.nav;
        if (sectionId) navigateTo(sectionId);
      });
    });

    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('open');
      });
    }
  }

  // ====== DARK MODE ======
  function setupDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const saved = localStorage.getItem('auhmc-dark-mode');
    if (saved === 'true') document.body.classList.add('dark-mode');

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('auhmc-dark-mode', document.body.classList.contains('dark-mode'));
    });
  }

  // ====== TRACKS ======
  function renderTracks() {
    const grid = document.getElementById('tracksGrid');
    if (!grid || !TRACKS.length) return;
    grid.innerHTML = TRACKS.map(t => `
      <div class="track-card">
        <div class="track-icon"><i class="fas ${t.icon}"></i></div>
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
      </div>
    `).join('');
  }

  // ====== SCHEDULE ======
  function renderSchedule(day) {
    const grid = document.getElementById('scheduleGrid');
    const filter = document.getElementById('trackFilter');
    const filterVal = filter ? filter.value : 'all';
    const items = SCHEDULE[day] || [];

    const filtered = filterVal === 'all' ? items : items.filter(i => i.track === filterVal);

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="schedule-item" style="justify-content:center;color:var(--gray-400);">لا توجد فعاليات لهذا المسار في هذا اليوم</div>';
      return;
    }

    grid.innerHTML = filtered.map(i => `
      <div class="schedule-item">
        <div class="schedule-time">${i.time}</div>
        <div class="schedule-details">
          <h4>${i.title}</h4>
          ${i.speaker ? `<div class="schedule-speaker"><i class="fas fa-user"></i> ${i.speaker}</div>` : ''}
          <span class="schedule-track">${i.track}</span>
        </div>
      </div>
    `).join('');
  }

  function setupSchedule() {
    const dayTabs = $$('.day-tab');
    const filter = document.getElementById('trackFilter');
    if (!dayTabs.length) return;

    // Populate filter options from schedule data
    if (filter) {
      const allItems = Object.values(SCHEDULE).flat();
      const tracks = [...new Set(allItems.map(i => i.track))];
      tracks.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        filter.appendChild(opt);
      });
    }

    let currentDay = 1;

    function switchDay(day) {
      currentDay = day;
      dayTabs.forEach(tab => {
        tab.classList.toggle('active', parseInt(tab.dataset.day) === day);
      });
      renderSchedule(day);
    }

    dayTabs.forEach(tab => {
      tab.addEventListener('click', () => switchDay(parseInt(tab.dataset.day)));
    });

    if (filter) {
      filter.addEventListener('change', () => renderSchedule(currentDay));
    }

    switchDay(1);
  }

  // ====== COMMITTEES ======
  function renderCommittees() {
    const grid = document.getElementById('committeesGrid');
    if (!grid || !COMMITTEES.length) return;
    grid.innerHTML = COMMITTEES.map(c => `
      <div class="committee-card">
        <div class="committee-icon"><i class="fas ${c.icon}"></i></div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
      </div>
    `).join('');
  }

  // ====== REGISTRATION ======
  function setupRegistration() {
    const wsContainer = document.getElementById('wsCheckboxes');
    if (wsContainer && WORKSHOPS.length) {
      wsContainer.innerHTML = WORKSHOPS.map((w, i) => `
        <label>
          <input type="checkbox" value="${i}">
          ${w.name} (الطاقة الاستيعابية: ${w.capacity})
        </label>
      `).join('');
    }

    const wsList = document.getElementById('workshopsList');
    if (wsList && WORKSHOPS.length) {
      wsList.innerHTML = WORKSHOPS.map(w => `
        <div class="workshop-item">
          <h4>${w.name}</h4>
          <p>ورشة تفاعلية مع تطبيق عملي</p>
          <span class="ws-capacity"><i class="fas fa-users"></i> ${w.capacity} مقعد</span>
        </div>
      `).join('');
    }

    const regForm = document.getElementById('regForm');
    if (!regForm) return;

    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('regName')?.value || '',
        phone: document.getElementById('regPhone')?.value || '',
        email: document.getElementById('regEmail')?.value || '',
        specialty: document.getElementById('regSpecialty')?.value || '',
        workplace: document.getElementById('regWorkplace')?.value || '',
        workshops: Array.from(document.querySelectorAll('#wsCheckboxes input:checked')).map(cb => cb.value)
      };

      // Try to submit to API if server is available
      try {
        const API_BASE = window.location.origin + '/api';
        const response = await fetch(`${API_BASE}/registrations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          regForm.style.display = 'none';
          const successEl = document.getElementById('regSuccess');
          if (successEl) successEl.style.display = 'block';
          return;
        }
      } catch (e) {
        // Server not available - that's OK, show success anyway
        console.log('Server not available, registration saved locally only');
      }

      // Fallback: save to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('auhmc_registrations') || '[]');
        stored.push({ ...formData, created_at: new Date().toISOString() });
        localStorage.setItem('auhmc_registrations', JSON.stringify(stored));
      } catch (e) { /* ignore */ }

      regForm.style.display = 'none';
      const successEl = document.getElementById('regSuccess');
      if (successEl) successEl.style.display = 'block';
    });
  }

  // ====== SPONSORS ======
  function renderSponsors() {
    const grid = document.getElementById('sponsorsGrid');
    if (!grid || !SPONSORS.length) return;
    grid.innerHTML = SPONSORS.map(s => `
      <div class="sponsor-card">
        <div class="sponsor-placeholder"><i class="fas fa-building"></i></div>
        <h4>${s.name}</h4>
        <p>${s.desc}</p>
        <span class="sponsor-tier">${s.tier}</span>
      </div>
    `).join('');
  }

  // ====== SCROLL TO TOP ======
  function setupScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== ADMIN LINK (hidden in footer) ======
  function setupAdminLink() {
    const fb = document.querySelector('.footer-bottom');
    if (fb) {
      const link = document.createElement('a');
      link.href = 'admin.html';
      link.style.cssText = 'display:inline-block;margin-top:8px;font-size:0.75rem;color:rgba(255,255,255,0.3);text-decoration:none;transition:color 0.3s;';
      link.textContent = '⚙️';
      link.title = 'لوحة التحكم';
      link.addEventListener('mouseenter', () => { link.style.color = 'rgba(255,255,255,0.7)'; });
      link.addEventListener('mouseleave', () => { link.style.color = 'rgba(255,255,255,0.3)'; });
      fb.appendChild(document.createElement('br'));
      fb.appendChild(link);
    }
  }

  // ====== INIT ======
  function init() {
    // Load data from localStorage (admin customizations)
    loadData();

    // Apply all data
    applyTheme();
    applyHero();
    applyFooter();

    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Setup UI
    setupNavigation();
    setupDarkMode();
    renderTracks();
    setupSchedule();
    renderCommittees();
    setupRegistration();
    renderSponsors();
    setupScrollTop();
    setupAdminLink();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();