/* =====================================================
   navbar-loader.js
   Drop ONE line into every page's <head>:
     <script src="navbar-loader.js" defer></script>
   That's it. The script handles everything else:
     - Injects navbar.html into the page
     - Highlights the correct active link
     - Wires up hamburger, overlay, nav sounds
     - Syncs padding so content isn't hidden under navbar
   ===================================================== */

(function () {
  // ── 1. INJECT SHARED NAVBAR CSS ───────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* === NAVBAR VARIABLES (safe to redeclare; only used here if page lacks them) === */
    :root {
      --red:          #c0392b;
      --white-muted:  rgba(245,240,235,0.75);
      --glass:        rgba(20,10,10,0.78);
      --border:       rgba(192,57,43,0.35);
    }

    /* === BASE RESET (font-size & font-family must match index.html) === */
    html { font-size: 78%; scroll-behavior: smooth; }
    body { font-family: 'Raleway', sans-serif; }

    /* === HEADER / NAVBAR === */
    header {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      z-index: 1000;
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 5%;
      background: var(--glass);
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(14px);
      gap: 2rem;
      position: relative;
    }

    .nav-links {
      list-style: none;
      display: flex;
      gap: 2.8rem;
    }

    .nav-links li a {
      text-decoration: none;
      color: var(--white-muted);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: color 0.2s;
    }

    .nav-links li a:hover,
    .nav-links li a.active {
      color: var(--red);
    }

    .hamburger {
      display: none;
      font-size: 1.9rem;
      cursor: pointer;
      color: var(--white-muted);
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
    }

    /* === MOBILE SIDEBAR === */
    .sidebar {
      position: fixed;
      top: 0; right: -100%;
      width: min(280px, 70%);
      height: 100vh;
      background: rgba(10,10,10,0.55);
      backdrop-filter: blur(18px) saturate(180%);
      -webkit-backdrop-filter: blur(18px) saturate(180%);
      border-left: 1px solid rgba(192,57,43,0.5);
      box-shadow: -8px 0 25px rgba(0,0,0,0.5);
      z-index: 2000;
      padding: 2rem;
      transition: right 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .sidebar.active { right: 0; }

    .sidebar ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      align-items: center;
      width: 100%;
    }
    .sidebar li { text-align: center; width: 100%; }

    .sidebar a {
      text-decoration: none;
      color: var(--white-muted);
      font-size: 1.4rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: block;
      padding: 0.4rem 0;
      transition: color 0.2s;
    }
    .sidebar a:hover,
    .sidebar a.active { color: var(--red); }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1500;
    }
    .overlay.active { opacity: 1; pointer-events: all; }

    @media (max-width: 768px) {
      .nav-links  { display: none; }
      .hamburger  { display: block; }
      .navbar     { padding: 2rem 5%; }
    }
  `;
  document.head.insertBefore(style, document.head.firstChild);

  // ── 2. FETCH & INJECT navbar.html ─────────────────────────────────────────
  fetch('navbar.html')
    .then(r => r.text())
    .then(html => {
      // Insert navbar at the very top of <body>
      document.body.insertAdjacentHTML('afterbegin', html);
      init();
    })
    .catch(() => console.warn('navbar-loader: could not load navbar.html'));

  // ── 3. INITIALISE EVERYTHING AFTER INJECTION ──────────────────────────────
  function init() {

    // --- Active link: match current filename ---
    const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav-links a, .sidebar a').forEach(a => {
      if (a.dataset.page === page) a.classList.add('active');
    });

    // --- Sync padding so first section isn't hidden under the fixed navbar ---
    function syncOffset() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      const h = navbar.offsetHeight;

      // Works for pages that use .urgency-strip (index) OR section.home (AboutUs etc.)
      const urgency = document.querySelector('.urgency-strip');
      const firstSection = document.querySelector('section');
      if (urgency)       urgency.style.marginTop  = h + 'px';
      else if (firstSection) firstSection.style.paddingTop = h + 'px';
    }
    syncOffset();
    window.addEventListener('resize', syncOffset);

    // --- Hamburger / Sidebar / Overlay ---
    const hamburger = document.getElementById('hamburger');
    const sidebar   = document.getElementById('sidebar');
    const overlay   = document.getElementById('overlay');

    const menuSound = new Audio('menu.mp3');
    const navSound  = new Audio('nav.mp3');

    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      menuSound.currentTime = 0;
      menuSound.play().catch(() => {});
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });

    // --- Nav link clicks (sound + smooth scroll for anchors) ---
    document.querySelectorAll('.nav-links a, .sidebar a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const dest = link.getAttribute('href');
        navSound.currentTime = 0;
        navSound.play().catch(() => {});

        sidebar.classList.remove('active');
        overlay.classList.remove('active');

        if (dest && dest.startsWith('#')) {
          setTimeout(() => {
            const el = document.querySelector(dest);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        } else {
          setTimeout(() => { window.location.href = dest; }, 150);
        }
      });
    });
  }
})();
