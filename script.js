/* ==========================================================================
   script.js - Architect Ataur Rahman Akash Portfolio
   Loads nav.html and footer.html into the site shell, manages Light/Dark theme,
   Continuous Background Audio (audio.mp3 + WebAudio Synth Fallback),
   6-Card Interactive Selected Works Accordion, Subpage Routing
   (pretty URL routes for 3D visualization, walkthroughs, experience, studio, and models), and Modals.
   ========================================================================== */

(function () {
  'use strict';

  // Software Tools & Logos from asset.txt
  const SOFTWARE_LOGOS = [
    { name: 'AutoCAD (2D & Working)', url: 'https://licono.com/wp-content/uploads/2026/06/alle-apps-autodesk-4_ff3520c5-01e0-46b1-8c82-dcb3e8aabd0d.jpg' },
    { name: 'SketchUp (3D Modeling)', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5eDMwgoearm4p1ETfbqMNJmr5tLSFi7BThh2P03-IS4uJ9FtBjJgdUsWV&s=10' },
    { name: 'Lumion (Rendering)', url: 'https://www.nicepng.com/png/detail/326-3268698_lumion-beautiful-renders-within-reach-south-africa-lumion.png' },
    { name: 'Adobe Photoshop', url: 'https://www.trustedreviews.com/wp-content/uploads/sites/7/2022/06/photoshop-logo.png' },
    { name: 'MS Office Suite', url: 'https://static.vecteezy.com/system/resources/previews/014/018/577/non_2x/ms-office-logo-on-transparent-background-free-vector.jpg' },
    { name: 'Camtasia Video Editing', url: 'https://w7.pngwing.com/pngs/770/895/png-transparent-camtasia-macos-bigsur-icon.png' },
    { name: 'AI Architectural Tools', url: 'https://png.pngtree.com/png-vector/20220606/ourmid/pngtree-adobe-illustrator-ai-icon-png-image_4899504.png' }
  ];

  // Subpage Routing Data from portfolio.gemini.new.zip (pretty URL routes for 3D visualization, walkthroughs, experience, studio, and models)
  const SUBPAGES_DATA = {
    '3Dvis': {
      filename: '3Dvisualization',
      title: '3D Visualization',
      subtitle: 'Photorealistic Exterior & Interior 3D architectural renders created with SketchUp, Lumion & Adobe Photoshop.',
      filters: [
        { key: 'all', label: 'All Renders' },
        { key: 'exterior', label: 'Exterior >' },
        { key: 'interior', label: 'Interior >' }
      ],
      projects: [
        {
          category: 'exterior',
          tag: 'Exterior • RAJUK Residential',
          title: 'Hillside Duplex Residence',
          desc: 'Two-storey luxury family residence featuring warm timber soffits, floor-to-ceiling glazing, and twilight landscape lighting.',
          imageCardIdx: 0
        },
        {
          category: 'exterior',
          tag: 'Exterior • Jalshiri Abashon',
          title: 'Contemporary G+8 Apartment Complex',
          desc: 'Modern urban residential facade in Jalshiri with green terraces, brick screen louvers, and rooftop pavilion.',
          imageCardIdx: 3
        },
        {
          category: 'interior',
          tag: 'Interior • New DOHS Mohakhali',
          title: 'Minimalist Penthouse Living Lounge',
          desc: 'Bespoke interior design with travertine feature wall, recessed cove lighting, and custom walnut joinery.',
          imageCardIdx: 2
        },
        {
          category: 'interior',
          tag: 'Interior • Master Suite',
          title: 'Warm Contemporary Bedroom & Study',
          desc: 'Soft neutral palette with acoustic slatted paneling, warm pendant lighting, and ergonomic workspace.',
          imageCardIdx: 4
        }
      ]
    },
    'AW': {
      filename: 'Animation_Walkthrough',
      title: 'Animation Walkthrough',
      subtitle: 'Cinematic Exterior & Interior architectural walkthrough animations rendered in Lumion and edited in Camtasia.',
      filters: [
        { key: 'all', label: 'All Walkthroughs' },
        { key: 'exterior', label: 'Exterior >' },
        { key: 'interior', label: 'Interior >' }
      ],
      projects: [
        {
          category: 'exterior',
          tag: 'Exterior Walkthrough • 4K 60fps',
          title: 'Cantonment Luxury Villa Flythrough',
          desc: 'Complete daylight-to-twilight exterior camera path showcasing driveway arrival, infinity pool, and garden pergola.',
          imageCardIdx: 1
        },
        {
          category: 'interior',
          tag: 'Interior Walkthrough • Lumion',
          title: 'Duplex Foyer, Dining & Kitchen Tour',
          desc: 'Smooth steadicam interior walkthrough highlighting spatial flow, natural sunbeam dynamics, and material reflections.',
          imageCardIdx: 2
        }
      ]
    },
    'exp': {
      filename: 'experience',
      title: 'Professional Experiences',
      subtitle: '6+ Years of National (HORIZON - RAJUK, Cantonment, Jalshiri) and International (Fiverr & Upwork) architectural projects.',
      filters: [
        { key: 'all', label: 'All Experiences' },
        { key: 'national', label: 'National >' },
        { key: 'international', label: 'International >' }
      ],
      projects: [
        {
          category: 'national',
          tag: 'National • HORIZON (15 Sep 2020 – Present)',
          title: '23+ RAJUK, Cantonment & Jalshiri Projects',
          desc: 'Assistant Architect at HORIZON (House # 229, Lane # 16, New DOHS, Mohakhali, Dhaka). Prepared AutoCAD working drawings, RAJUK approval sheets, and 3D models.',
          imageCardIdx: 3
        },
        {
          category: 'international',
          tag: 'International • Fiverr & Upwork',
          title: 'Global Residential & Commercial Visualization',
          desc: 'Delivered 2D floor plans, SketchUp 3D models, and Lumion walkthrough videos for clients across the USA, UK, UAE, and Australia.',
          imageCardIdx: 0
        }
      ]
    },
    'studio': {
      filename: 'studio',
      title: 'Architectural Studio',
      subtitle: 'Technical 2D AutoCAD working drawings, structural detailing, presentation plans, and B.Sc. Architecture studio works.',
      filters: [{ key: 'all', label: 'All Studio Works' }],
      projects: [
        {
          category: 'all',
          tag: 'AutoCAD Working Drawings',
          title: 'Detailed Floor Plans, Sections & Elevations',
          desc: 'Complete construction documentation packages with column grids, electrical/plumbing layouts, and municipal compliance.',
          imageCardIdx: 4
        },
        {
          category: 'all',
          tag: 'Sonargaon University • B.Sc. Studio',
          title: 'Cultural Complex & Urban Civic Center',
          desc: 'Academic thesis & studio design exploring climate-responsive Bangladeshi brick architecture and public courtyards.',
          imageCardIdx: 1
        }
      ]
    },
    'model': {
      filename: 'miniature_models',
      title: 'Miniature Model Making',
      subtitle: 'Handcrafted physical architectural scale models, contour site topography, and illuminated presentation maquettes.',
      filters: [{ key: 'all', label: 'All Physical Models' }],
      projects: [
        {
          category: 'all',
          tag: 'Scale 1:100 • Balsa & Acrylic',
          title: 'High-Rise Residential Tower Maquette',
          desc: 'Precision laser-cut and hand-assembled architectural scale model with warm LED interior illumination and landscaping.',
          imageCardIdx: 5
        },
        {
          category: 'all',
          tag: 'Scale 1:200 • Topographic Site',
          title: 'Eco-Resort Masterplan Contour Model',
          desc: 'Layered cork and basswood site model illustrating natural terrain slopes, water bodies, and pavilion placement.',
          imageCardIdx: 1
        }
      ]
    }
  };

  // Card index to pageKey mapping
  const CARD_TO_PAGE = ['3Dvis', 'AW', 'exp', 'exp', 'studio', 'model'];
  const CARD_TO_FILTER = ['all', 'all', 'national', 'international', 'all', 'all'];

  // Resolve the repository root from this script URL. This works both for a
  // custom domain (/) and for GitHub project pages (/repository-name/).
  const SCRIPT_NODE = document.currentScript || document.querySelector('script[src$="script.js"]');
  const SITE_BASE_URL = SCRIPT_NODE
    ? new URL('.', SCRIPT_NODE.src)
    : new URL('.', window.location.href);
  const ROUTE_SEGMENTS = {
    '3Dvis': '3Dvisualization',
    'AW': 'Animation_Walkthrough',
    'exp': 'experience',
    'model': 'miniature_models',
    'studio': 'studio'
  };

  function routeUrl(pageKey, filterKey) {
    const segment = ROUTE_SEGMENTS[pageKey];
    if (!segment) return new URL('#home', SITE_BASE_URL);
    const route = new URL(segment, SITE_BASE_URL);
    if (filterKey && filterKey !== 'all') {
      route.pathname = route.pathname.replace(/\/$/, '') + '/' + encodeURIComponent(filterKey);
    }
    return route;
  }

  function setBrowserUrl(url, replace) {
    const method = replace ? 'replaceState' : 'pushState';
    window.history[method]({ portfolioNavigation: true }, '', url.href || String(url));
  }

  function setRootHash(hash, replace) {
    const url = new URL(SITE_BASE_URL.href);
    url.hash = hash ? '#' + hash : '';
    setBrowserUrl(url, replace);
  }

  function relativeRouteSegments() {
    let pathname = window.location.pathname;
    const rootPath = SITE_BASE_URL.pathname;
    if (pathname.indexOf(rootPath) === 0) pathname = pathname.slice(rootPath.length);
    return pathname.split('/').filter(Boolean).map(function (part) {
      try { return decodeURIComponent(part); } catch (e) { return part; }
    });
  }

  // 1. Dynamically load nav.html and footer.html into all pages
  async function loadModularPartials() {
    const navSlot = document.getElementById('nav-placeholder');
    const footerSlot = document.getElementById('footer-placeholder');

    // Resolve partials beside this script, not relative to the current URL/hash.
    // This keeps the shared components working from every portfolio page.
    const scriptElement = document.currentScript ||
      document.querySelector('script[src$="script.js"]');
    const componentBase = scriptElement
      ? new URL('.', scriptElement.src)
      : new URL('.', window.location.href);

    const loadPartial = async (slot, filename, label) => {
      if (!slot) {
        console.warn(label + ' placeholder was not found on this page.');
        return false;
      }
      try {
        const response = await fetch(new URL(filename, componentBase).href, {
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        const markup = await response.text();
        if (!markup.trim()) throw new Error('The file is empty.');
        slot.innerHTML = markup;
        slot.dataset.loaded = 'true';
        return true;
      } catch (error) {
        console.error('Could not load ' + filename + ':', error);
        slot.innerHTML = '<div class="component-load-warning" role="status">' +
          label + ' could not load. Run this portfolio through a local web server ' +
          '(for example, VS Code Live Server), then refresh the page.</div>';
        return false;
      }
    };

    // Load both components before initializing their controls and event handlers.
    await Promise.all([
      loadPartial(navSlot, 'nav.html', 'Navigation bar'),
      loadPartial(footerSlot, 'footer.html', 'Footer')
    ]);

    initNavigationAndTheme();
    initSelectedWorksAccordion();
    initModals();
    restoreRouteFromLocation();
  }

  // 2. Continuous Background Audio (audio.mp3 + WebAudio Synth Fallback)
  let audioCtx = null;
  let isAudioPlaying = false;
  let chordTimer = null;

  function startAmbientSynthFallback() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const chords = [
        [220.0, 277.18, 329.63, 440.0], // A Major 7
        [196.0, 246.94, 293.66, 392.0], // G Major
        [174.61, 220.0, 261.63, 349.23], // F Major 7
        [164.81, 207.65, 246.94, 329.63] // E Major
      ];
      let chordIdx = 0;

      const playChord = function () {
        if (!isAudioPlaying || !audioCtx) return;
        const now = audioCtx.currentTime;
        const notes = chords[chordIdx % chords.length];
        chordIdx++;

        notes.forEach(function (f) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.025, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 4.3);
        });
      };

      playChord();
      if (chordTimer) clearInterval(chordTimer);
      chordTimer = setInterval(playChord, 4000);
    } catch (e) {}
  }

  function stopAmbientSynthFallback() {
    if (chordTimer) {
      clearInterval(chordTimer);
      chordTimer = null;
    }
  }

  window.toggleBackgroundAudio = function () {
    const bgAudio = document.getElementById('bg-audio');
    const musicBtn = document.getElementById('musicToggleBtn');

    if (isAudioPlaying) {
      isAudioPlaying = false;
      if (bgAudio) bgAudio.pause();
      stopAmbientSynthFallback();
      if (musicBtn) musicBtn.classList.remove('playing');
      try { localStorage.setItem('akash_audio_playing', 'false'); } catch (e) {}
      return;
    }

    isAudioPlaying = true;
    if (musicBtn) musicBtn.classList.add('playing');
    try { localStorage.setItem('akash_audio_playing', 'true'); } catch (e) {}

    if (bgAudio && bgAudio.getAttribute('src')) {
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          startAmbientSynthFallback();
        });
      } else {
        startAmbientSynthFallback();
      }
    } else {
      startAmbientSynthFallback();
    }
  };

  function setMenuDrawerOpen(open, restoreFocus) {
    const drawer = document.getElementById('navDropdownDrawer');
    const menuBtn = document.getElementById('menuToggleBtn');
    if (!drawer || !menuBtn) return;

    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    drawer.toggleAttribute('inert', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute(
      'aria-label',
      open ? 'Close navigation menu' : 'Open navigation menu'
    );
    document.body.classList.toggle(
      'menu-drawer-open',
      open && window.matchMedia('(max-width: 900px)').matches
    );

    if (open) {
      const closeBtn = document.getElementById('drawerCloseBtn');
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    } else if (restoreFocus) {
      menuBtn.focus({ preventScroll: true });
    }
  }

  window.closeMenuDrawer = function () {
    setMenuDrawerOpen(false, false);
  };

  // 3. Theme Toggle & Navbar Scroll
  function initNavigationAndTheme() {
    try {
      const savedTheme = localStorage.getItem('akash_portfolio_theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
      } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
      }
    } catch (e) {}

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        try {
          localStorage.setItem('akash_portfolio_theme', isDark ? 'dark' : 'light');
        } catch (e) {}
      });
    }

    const navbar = document.getElementById('siteNavbar');
    window.addEventListener('scroll', function () {
      if (!navbar) return;
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    const menuBtn = document.getElementById('menuToggleBtn');
    const drawer = document.getElementById('navDropdownDrawer');
    if (menuBtn && drawer) {
      menuBtn.addEventListener('click', function () {
        setMenuDrawerOpen(!drawer.classList.contains('open'), true);
      });

      const closeBtn = document.getElementById('drawerCloseBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          setMenuDrawerOpen(false, true);
        });
      }

      drawer.querySelectorAll('.drawer-category-toggle').forEach(function (button) {
        button.addEventListener('click', function () {
          const item = button.closest('.drawer-category-item');
          const categoryLink = item && item.querySelector('.drawer-category-head a');
          if (!item || !categoryLink) return;

          const expanded = item.classList.toggle('expanded');
          button.setAttribute('aria-expanded', String(expanded));
          button.setAttribute(
            'aria-label',
            (expanded ? 'Hide ' : 'Show ') + categoryLink.textContent.trim() + ' options'
          );
        });
      });

      document.addEventListener('pointerdown', function (event) {
        if (
          drawer.classList.contains('open') &&
          !drawer.contains(event.target) &&
          !menuBtn.contains(event.target)
        ) {
          setMenuDrawerOpen(false, false);
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && drawer.classList.contains('open')) {
          setMenuDrawerOpen(false, true);
        }
      });
    }
  }

  // 4. Multi-Page Subpage Navigation (pretty URL routes for 3D visualization, walkthroughs, experience, studio, and models)
  let currentSubPageKey = '3Dvis';
  let currentSubFilter = 'all';

  function getCardImgSrc(cardIdx) {
    const cards = document.querySelectorAll('.work-card .work-card-bg');
    if (cards[cardIdx]) return cards[cardIdx].getAttribute('src');
    return 'assets/card1.jpg';
  }

  window.navigateToSection = function (sectionId) {
    const homeView = document.getElementById('view-home');
    const subView = document.getElementById('view-subpage');
    if (homeView && subView) {
      subView.classList.add('hidden-view');
      homeView.classList.remove('hidden-view');
    }
    // Keep section navigation shareable while using the root homepage URL.
    setRootHash(sectionId, false);
    const target = document.getElementById(sectionId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  window.navigateToPage = function (pageKey, filterKey, options) {
    const settings = options || {};
    const filter = filterKey || 'all';
    const homeView = document.getElementById('view-home');
    const subView = document.getElementById('view-subpage');
    if (!homeView || !subView) return;

    if (settings.updateAddress !== false) {
      setBrowserUrl(pageKey === 'home' ? new URL('#home', SITE_BASE_URL) : routeUrl(pageKey, filter), !!settings.replaceHistory);
    }

    if (pageKey === 'home') {
      subView.classList.add('hidden-view');
      homeView.classList.remove('hidden-view');
      if (settings.closeModal !== false && window.closePortfolioModal) window.closePortfolioModal();
      if (settings.scroll !== false) window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const data = SUBPAGES_DATA[pageKey];
    if (!data) return;

    currentSubPageKey = pageKey;
    currentSubFilter = filter;
    homeView.classList.add('hidden-view');
    subView.classList.remove('hidden-view');

    const fileEl = document.getElementById('subpage-filename');
    const titleEl = document.getElementById('subpage-title');
    const subEl = document.getElementById('subpage-subtitle');
    if (fileEl) fileEl.textContent = data.filename;
    if (titleEl) titleEl.textContent = data.title;
    if (subEl) subEl.textContent = data.subtitle;

    renderSubpageFilters(data);
    renderSubpageProjects(data, filter);
    if (settings.scroll !== false) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Rebuild the visible page from the address bar on first load and browser back/forward.
  function restoreRouteFromLocation() {
    const parts = relativeRouteSegments();
    const hash = (window.location.hash || '').replace(/^#/, '').toLowerCase();
    const keyBySegment = Object.keys(ROUTE_SEGMENTS).reduce(function (map, key) {
      map[ROUTE_SEGMENTS[key].toLowerCase()] = key;
      return map;
    }, {});

    if (parts.length) {
      const pageKey = keyBySegment[(parts[0] || '').toLowerCase()];
      if (pageKey) {
        const filter = parts[1] || 'all';
        window.navigateToPage(pageKey, filter, { updateAddress: false, scroll: false, closeModal: true });
        return;
      }
    }

    window.navigateToPage('home', null, { updateAddress: false, scroll: false, closeModal: true });
    if (hash === 'resume') {
      window.openResumeModal(null, { updateAddress: false, restore: true });
    } else if (hash === 'contact') {
      window.openContactModal({ updateAddress: false, restore: true });
    } else if (hash && document.getElementById(hash)) {
      document.getElementById(hash).scrollIntoView({ behavior: 'auto' });
    }
  }

  function renderSubpageFilters(data) {
    const bar = document.getElementById('subpage-filter-bar');
    if (!bar) return;
    bar.innerHTML = '';
    data.filters.forEach(function (f) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'subpage-filter-pill' + (f.key === currentSubFilter ? ' active' : '');
      btn.textContent = f.label;
      btn.addEventListener('click', function () {
        currentSubFilter = f.key;
        setBrowserUrl(routeUrl(currentSubPageKey, f.key), false);
        renderSubpageFilters(data);
        renderSubpageProjects(data, f.key);
      });
      bar.appendChild(btn);
    });
  }

  function renderSubpageProjects(data, filterKey) {
    const grid = document.getElementById('subpage-projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const filtered = filterKey === 'all'
      ? data.projects
      : data.projects.filter(function (p) { return p.category === filterKey; });

    filtered.forEach(function (proj) {
      const imgSrc = getCardImgSrc(proj.imageCardIdx || 0);
      const card = document.createElement('article');
      card.className = 'subpage-proj-card';
      card.innerHTML =
        '<div class="subpage-proj-img-wrap">' +
          '<img src="' + imgSrc + '" alt="' + proj.title + '" />' +
          '<span class="subpage-proj-tag">' + proj.tag + '</span>' +
        '</div>' +
        '<div class="subpage-proj-body">' +
          '<div>' +
            '<h3 class="subpage-proj-title">' + proj.title + '</h3>' +
            '<p class="subpage-proj-desc">' + proj.desc + '</p>' +
          '</div>' +
          '<div class="subpage-proj-footer">' +
            '<span style="color:#10b981;">✓ Verified HORIZON / Portfolio Work</span>' +
            '<button type="button" onclick="openContactModal()" style="background:none;border:none;color:#ff6a18;font-weight:800;cursor:pointer;font-family:inherit;">Inquire &rarr;</button>' +
          '</div>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  // 5. Second Canvas: 6 Interactive Cards Accordion (Hover to Expand & Click Subnames to Open Page)
  window.activateWorkCard = function (index) {
    const cards = document.querySelectorAll('.work-card');
    cards.forEach(function (card, idx) {
      card.classList.toggle('active', idx === index);
    });
  };

  function initSelectedWorksAccordion() {
    const cards = document.querySelectorAll('.work-card');
    if (!cards.length) return;

    cards.forEach(function (card, idx) {
      card.addEventListener('mouseenter', function () {
        window.activateWorkCard(idx);
      });
      card.addEventListener('click', function (e) {
        if (e.target.closest('[data-subpage]')) return;
        if (!card.classList.contains('active')) {
          window.activateWorkCard(idx);
        }
      });
    });

    const subnamesBtn = document.getElementById('openActiveProjectBtn');
    if (subnamesBtn) {
      subnamesBtn.addEventListener('click', function () {
        const activeCard = document.querySelector('.work-card.active');
        const idx = activeCard ? parseInt(activeCard.getAttribute('data-index'), 10) : 0;
        const pageKey = CARD_TO_PAGE[idx] || '3Dvis';
        const filterKey = CARD_TO_FILTER[idx] || 'all';
        window.navigateToPage(pageKey, filterKey);
      });
    }
  }

  // 6. Modals: Direct Contact Card, Complete Resume PDF Viewer (resume.pdf), and Terms & Conditions
  function openModalWithHTML(htmlContent, extraCardClass) {
    const modal = document.getElementById('portfolioModal');
    const card = modal ? modal.querySelector('.portfolio-modal-card') : null;
    const body = document.getElementById('portfolioModalBody');
    if (!modal || !body) return;
    if (card) {
      card.classList.remove('contact-modal-card');
      if (extraCardClass) card.classList.add(extraCardClass);
    }
    body.innerHTML = htmlContent;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  window.closePortfolioModal = function () {
    const modal = document.getElementById('portfolioModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  window.copyTextToClipboard = function (text, btnEl) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    if (btnEl) {
      const orig = btnEl.textContent;
      btnEl.textContent = 'Copied!';
      setTimeout(function () { btnEl.textContent = orig; }, 1800);
    }
  };

  window.openContactModal = function (options) {
    const settings = options || {};
    if (settings.updateAddress !== false) {
      setRootHash('contact', false);
      window.navigateToPage('home', null, { updateAddress: false, scroll: false, closeModal: false });
    }
    openModalWithHTML(
      '<div class="cc-header">' +
        '<div class="cc-avatar">AR</div>' +
        '<div class="cc-title-wrap">' +
          '<div class="cc-eyebrow">DIRECT CONTACT CARD</div>' +
          '<h2 class="cc-name">Ataur Rahman Akash</h2>' +
          '<p class="cc-sub">Assistant Architect, HORIZON &bull; IDEB ID: 68269</p>' +
        '</div>' +
      '</div>' +

      '<div class="cc-rows">' +
        '<div class="cc-row">' +
          '<div class="cc-row-left">' +
            '<div class="cc-icon cc-icon-purple">' +
              '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>' +
            '</div>' +
            '<div class="cc-meta">' +
              '<div class="cc-label">EMAIL ADDRESS (ANCHORED)</div>' +
              '<a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=archarakash09@gmail.com" target="_blank" rel="noopener noreferrer" class="cc-val cc-val-amber">archarakash09@gmail.com</a>' +
            '</div>' +
          '</div>' +
          '<button type="button" onclick="copyTextToClipboard(\'archarakash09@gmail.com\', this)" class="cc-btn cc-btn-neutral">Copy</button>' +
        '</div>' +

        '<div class="cc-row">' +
          '<div class="cc-row-left">' +
            '<div class="cc-icon cc-icon-green">' +
              '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.92-1.26-4.82-4.21-4.97-4.4-.15-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.01-2.42.26-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.15.27.1 1.69.8 1.98.94.29.15.48.22.56.34.08.12.08.7-.16 1.38z"/></svg>' +
            '</div>' +
            '<div class="cc-meta">' +
              '<div class="cc-label">WHATSAPP NUMBER</div>' +
              '<a href="https://wa.me/8801792985959" target="_blank" rel="noopener noreferrer" class="cc-val cc-val-green">+88-01792985959</a>' +
            '</div>' +
          '</div>' +
          '<a href="https://wa.me/8801792985959" target="_blank" rel="noopener noreferrer" class="cc-btn cc-btn-green">Chat</a>' +
        '</div>' +

        '<div class="cc-row">' +
          '<div class="cc-row-left">' +
            '<div class="cc-icon cc-icon-blue">' +
              '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/></svg>' +
            '</div>' +
            '<div class="cc-meta">' +
              '<div class="cc-label">CONTACT NUMBER</div>' +
              '<a href="tel:+8801792985959" class="cc-val cc-val-blue">+88-01792985959</a>' +
            '</div>' +
          '</div>' +
          '<a href="tel:+8801792985959" class="cc-btn cc-btn-blue">Call</a>' +
        '</div>' +

        '<div class="cc-row cc-row-addr">' +
          '<div class="cc-row-left">' +
            '<div class="cc-icon cc-icon-orange">' +
              '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>' +
            '</div>' +
            '<div class="cc-meta">' +
              '<div class="cc-label">LOCATION / ADDRESS</div>' +
              '<div class="cc-addr-main">House # 05, Avenue # 01, Block-A, Chandrima Model Town, Mohammadpur, Dhaka, Bangladesh</div>' +
              '<div class="cc-addr-sub">Office (HORIZON): House # 229, Lane # 16, New DOHS, Mohakhali, Dhaka</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="cc-footer">' +
        '<span class="cc-footer-label">CONNECT ON SOCIALS:</span>' +
        '<div class="cc-socials">' +
          '<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="cc-soc-btn cc-soc-fb" title="Facebook" aria-label="Facebook">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V6.65c0-1.05.29-1.73 1.76-1.73z"/></svg>' +
          '</a>' +
          '<a href="https://wa.me/8801792985959" target="_blank" rel="noopener noreferrer" class="cc-soc-btn cc-soc-wa" title="WhatsApp" aria-label="WhatsApp">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.92-1.26-4.82-4.21-4.97-4.4-.15-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.01-2.42.26-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.15.27.1 1.69.8 1.98.94.29.15.48.22.56.34.08.12.08.7-.16 1.38z"/></svg>' +
          '</a>' +
          '<a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=archarakash09@gmail.com" target="_blank" rel="noopener noreferrer" class="cc-soc-btn cc-soc-mail" title="Email" aria-label="Email">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>' +
          '</a>' +
          '<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="cc-soc-btn cc-soc-in" title="LinkedIn" aria-label="LinkedIn">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>' +
          '</a>' +
        '</div>' +
      '</div>',
      'contact-modal-card'
    );
  };

  window.openResumeModal = function (e, options) {
    if (e && e.preventDefault) e.preventDefault();
    const settings = options || {};
    if (settings.updateAddress !== false) {
      setRootHash('resume', false);
      window.navigateToPage('home', null, { updateAddress: false, scroll: false, closeModal: false });
    }
    const logosHtml = SOFTWARE_LOGOS.map(function (item) {
      return (
        '<div class="software-skill-chip">' +
          '<img src="' + item.url + '" alt="' + item.name + '" onerror="this.style.display=\'none\'" />' +
          '<span>' + item.name + '</span>' +
        '</div>'
      );
    }).join('');

    openModalWithHTML(
      '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid rgba(150,150,150,0.25);">' +
        '<div>' +
          '<span class="modal-tag" style="margin-bottom:4px;">CURRICULUM VITAE — resume.pdf</span>' +
          '<h2 style="font-size:1.75rem;font-weight:800;">Ataur Rahman Akash</h2>' +
          '<p style="font-size:0.86rem;opacity:0.8;">Assistant Architect, HORIZON &bull; IDEB Membership ID: 68269</p>' +
        '</div>' +
        '<a href="resume.pdf" target="_blank" rel="noopener noreferrer" class="work-btn-primary" style="text-decoration:none;">📄 Open resume.pdf</a>' +
      '</div>' +

      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;font-size:0.88rem;line-height:1.58;">' +
        '<div style="display:flex;flex-direction:column;gap:14px;">' +
          '<div style="padding:14px;border-radius:16px;background:rgba(255,120,30,0.08);border:1px solid rgba(255,120,30,0.24);">' +
            '<h4 style="color:#e05a00;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Professional Profile</h4>' +
            '<p>A dedicated and hardworking architectural professional with <strong>6+ years</strong> of practical experience in the architectural field. Currently working as an <strong>Assistant Architect at HORIZON</strong> since September 2020. Experienced in architectural drafting, working drawings, 3D modeling, visualization, and project documentation. Contributed to <strong>23+ architectural projects</strong> in RAJUK, Cantonment, and Jalshiri areas, with additional international freelance experience on Fiverr and Upwork.</p>' +
          '</div>' +

          '<div style="padding:14px;border-radius:16px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.24);">' +
            '<h4 style="color:#10b981;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Work Experience</h4>' +
            '<div style="font-weight:800;">HORIZON — Assistant Architect (15 Sep 2020 – Present)</div>' +
            '<div style="font-size:0.8rem;opacity:0.75;margin-bottom:6px;">House # 229, Lane # 16, New DOHS, Mohakhali, Dhaka</div>' +
            '<ul style="padding-left:18px;margin-bottom:10px;">' +
              '<li>Prepare 2D, technical and working drawings using AutoCAD.</li>' +
              '<li>Develop 3D architectural models using SketchUp.</li>' +
              '<li>Create visualizations and presentation views using Lumion.</li>' +
              '<li>Contribute to 23+ architectural projects in RAJUK, Cantonment &amp; Jalshiri.</li>' +
            '</ul>' +
            '<div style="font-weight:800;padding-top:8px;border-top:1px solid rgba(150,150,150,0.2);">Freelance Architectural Designer — Fiverr &amp; Upwork</div>' +
            '<p style="font-size:0.82rem;opacity:0.85;">2D drafting &amp; floor plans, 3D modeling, visualization, and Animation Walkthrough presentation videos for international clients.</p>' +
          '</div>' +

          '<div style="padding:14px;border-radius:16px;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.24);">' +
            '<h4 style="color:#0284c7;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Educational Qualification</h4>' +
            '<div style="margin-bottom:8px;"><strong>Bachelor of Science in Architecture</strong><br/><span style="font-size:0.82rem;opacity:0.82;">Sonargaon University (SU), Mohakhali, Dhaka &bull; Passing Year: 2026 &bull; CGPA: 3.20 / 4.00</span></div>' +
            '<div style="margin-bottom:8px;"><strong>Diploma-in-Engineering in Architecture</strong><br/><span style="font-size:0.82rem;opacity:0.82;">Dhaka Polytechnic Institute (BTEB) &bull; Passing Year: 2021 &bull; CGPA: 3.26 / 4.00</span></div>' +
            '<div><strong>Secondary School Certificate (S.S.C. / Dakhil)</strong><br/><span style="font-size:0.82rem;opacity:0.82;">Joynagar Amina Hamidia Fazil Madrasa, Satkhira &bull; Passing Year: 2016 &bull; GPA: 5.00 / 5.00</span></div>' +
          '</div>' +
        '</div>' +

        '<div style="display:flex;flex-direction:column;gap:14px;">' +
          '<div style="padding:14px;border-radius:16px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.26);">' +
            '<h4 style="color:#d97706;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Technical &amp; Software Skills</h4>' +
            '<div class="software-skill-grid">' + logosHtml + '</div>' +
          '</div>' +

          '<div style="padding:14px;border-radius:16px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.24);">' +
            '<h4 style="color:#9333ea;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Membership &amp; Personal Info</h4>' +
            '<div><strong>IDEB Membership ID:</strong> 68269</div>' +
            '<div><strong>Freelancer Bangladesh ID:</strong> AT1634901985</div>' +
            '<div><strong>Date of Birth:</strong> 08 May 1999</div>' +
            '<div><strong>Nationality:</strong> Bangladeshi by Birth</div>' +
            '<div><strong>Blood Group:</strong> A+</div>' +
          '</div>' +

          '<div style="padding:14px;border-radius:16px;background:rgba(244,63,94,0.08);border:1px solid rgba(244,63,94,0.24);">' +
            '<h4 style="color:#e11d48;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">References</h4>' +
            '<div style="margin-bottom:8px;"><strong>AR. MD. Abdus Sobhan</strong><br/><span style="font-size:0.82rem;opacity:0.82;">Architect, FIAB-529, HORIZON &bull; +88-01819238647</span></div>' +
            '<div><strong>Engr. MD. Aman Ullah</strong><br/><span style="font-size:0.82rem;opacity:0.82;">Asst. Architect, Eastern Housing LTD &bull; +88-01716355631</span></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  };

  window.openTermsModal = function () {
    openModalWithHTML(
      '<span class="modal-tag">LEGAL &amp; INTELLECTUAL PROPERTY</span>' +
      '<h2 style="font-size:1.65rem;font-weight:800;margin-bottom:12px;">Terms and Conditions</h2>' +
      '<p style="line-height:1.65;margin-bottom:14px;">All architectural drawings, 3D visualizations, walkthrough animations, studio designs, and physical miniature model photographs displayed on this website are the intellectual property of <strong>Ataur Rahman Akash</strong> and respective project stakeholders at <strong>HORIZON</strong>.</p>' +
      '<p style="line-height:1.65;margin-bottom:0;">Unauthorized reproduction, redistribution, or commercial use of these architectural plans or renders without prior written permission is strictly prohibited. Copyright &copy; 2026 Ataur Rahman Akash. All rights reserved.</p>'
    );
  };

  function initModals() {
    const modal = document.getElementById('portfolioModal');
    const closeBtn = document.getElementById('portfolioModalClose');
    if (closeBtn) closeBtn.addEventListener('click', window.closePortfolioModal);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) window.closePortfolioModal();
      });
    }
  }

  window.addEventListener('popstate', restoreRouteFromLocation);
  window.addEventListener('hashchange', restoreRouteFromLocation);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadModularPartials);
  } else {
    loadModularPartials();
  }
})();
