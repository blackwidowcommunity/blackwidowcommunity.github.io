/* =====================================================
   navbar-loader.js - Shared Navigation Loader
   ===================================================== */

(function () {
  // ── 1. INJECT FONTS & FONT AWESOME IF NOT ALREADY PRESENT ─────────────────
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(fontAwesome);
  }

  if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Cinzel"]')) {
    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Raleway:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(fonts);
  }

  // ── 2. INJECT NAVBAR STYLES (if not already present) ─────────────────────
  if (!document.getElementById('navbar-styles')) {
    const navStyles = document.createElement('style');
    navStyles.id = 'navbar-styles';
    navStyles.textContent = `
      /* ===== SHARED NAVBAR STYLES ===== */
      :root {
        --red: #c0392b;
        --red-dark: #8e1c12;
        --black: #0a0a0a;
        --black-2: #111111;
        --white: #f5f0eb;
        --white-muted: rgba(245,240,235,0.75);
        --glass: rgba(20,10,10,0.78);
        --border: rgba(192,57,43,0.35);
      }

      header {
        position: fixed;
        top: 0;
        left: 0;
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
        margin: 0;
        padding: 0;
      }

      .nav-links li a {
        text-decoration: none;
        color: var(--white-muted);
        font-size: 0.9rem;
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
        background: transparent;
        border: none;
        font-size: 1.9rem;
        cursor: pointer;
        color: var(--white-muted);
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
      }

      /* Sidebar */
      .sidebar {
        position: fixed;
        top: 0;
        right: -100%;
        width: min(280px, 70%);
        height: 100vh;
        background: rgba(10, 10, 10, 0.55);
        backdrop-filter: blur(18px) saturate(180%);
        -webkit-backdrop-filter: blur(18px) saturate(180%);
        border-left: 1px solid rgba(192, 57, 43, 0.5);
        box-shadow: -8px 0 25px rgba(0, 0, 0, 0.5);
        z-index: 2000;
        padding: 2rem;
        transition: right 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .sidebar.active {
        right: 0;
      }

      .sidebar ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        align-items: center;
        width: 100%;
        margin: 0;
        padding: 0;
      }

      .sidebar li {
        text-align: center;
        width: 100%;
      }

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
      .sidebar a.active {
        color: var(--red);
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1500;
      }

      .overlay.active {
        opacity: 1;
        pointer-events: all;
      }

      @media (max-width: 768px) {
        .nav-links {
          display: none;
        }
        .hamburger {
          display: block;
        }
        .navbar {
          padding: 1rem 5%;
          justify-content: flex-start;
        }
      }

      /* Prevent scroll when sidebar is open */
      body.sidebar-open {
        overflow: hidden;
      }
    `;
    document.head.appendChild(navStyles);
  }

  // ── 3. INJECT SPIDER WEB SVG (if not already in page) ─────────────────────
  if (!document.querySelector('.web-svg')) {
    const webSVG = document.createElement('div');
    webSVG.innerHTML = `
      <svg class="web-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <g stroke="rgba(245,240,235,0.25)" fill="none" stroke-linecap="round">
          <line x1="400" y1="400" x2="400" y2="0" stroke-width="0.7"/>
          <line x1="400" y1="400" x2="594" y2="14" stroke-width="0.6"/>
          <line x1="400" y1="400" x2="748" y2="110" stroke-width="0.7"/>
          <line x1="400" y1="400" x2="800" y2="280" stroke-width="0.6"/>
          <line x1="400" y1="400" x2="800" y2="400" stroke-width="0.7"/>
          <line x1="400" y1="400" x2="800" y2="520" stroke-width="0.6"/>
          <line x1="400" y1="400" x2="748" y2="690" stroke-width="0.7"/>
          <line x1="400" y1="400" x2="594" y2="786" stroke-width="0.6"/>
          <line x1="400" y1="400" x2="400" y2="800" stroke-width="0.7"/>
          <line x1="400" y1="400" x2="206" y2="786" stroke-width="0.6"/>
          <line x1="400" y1="400" x2="52" y2="690" stroke-width="0.7"/>
          <line x1="400" y1="400" x2="0" y2="520" stroke-width="0.6"/>
          <line x1="400" y1="400" x2="0" y2="400" stroke-width="0.7"/>
          <line x1="400" y1="400" x2="0" y2="280" stroke-width="0.6"/>
          <line x1="400" y1="400" x2="52" y2="110" stroke-width="0.7"/>
          <line x1="400" y1="400" x2="206" y2="14" stroke-width="0.6"/>
          <path d="M400,352 Q448,352 448,400 Q448,448 400,448 Q352,448 352,400 Q352,352 400,352" stroke-width="0.7"/>
          <path d="M400,304 Q452,296 487,334 Q520,362 528,400 Q530,444 496,472 Q462,508 400,496 Q344,504 310,472 Q272,446 272,400 Q270,354 308,326 Q344,296 400,304Z" stroke-width="0.7"/>
        </g>
      </svg>
    `;
    document.body.insertAdjacentElement('afterbegin', webSVG);
  }

  // ── 4. FETCH & INJECT navbar.html ─────────────────────────────────────────
  fetch('navbar.html')
    .then(r => r.text())
    .then(html => {
      if (!document.querySelector('header')) {
        document.body.insertAdjacentHTML('afterbegin', html);
      }
      init();
    })
    .catch(err => console.warn('navbar-loader: could not load navbar.html', err));

  // ── 5. INITIALISE EVERYTHING AFTER INJECTION ──────────────────────────────
  function init() {
    const currentPath = window.location.pathname;
    let currentFile = currentPath.split('/').pop().replace('.html', '') || 'index';
    
    // Handle AboutUs(8).html type filenames
    if (currentFile.includes('AboutUs')) currentFile = 'AboutUs';
    if (currentFile.includes('contact')) currentFile = 'contact';
    if (currentFile.includes('projects')) currentFile = 'projects';
    if (currentFile.includes('guests')) currentFile = 'guests';
    if (currentFile.includes('shop')) currentFile = 'shop';
    
    document.querySelectorAll('.nav-links a, .sidebar a').forEach(a => {
      const href = a.getAttribute('href');
      const pageName = href ? href.replace('.html', '') : '';
      if (pageName === currentFile) {
        a.classList.add('active');
      }
    });

    function syncOffset() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      const navbarHeight = navbar.offsetHeight;
      
      const contentSelectors = [
        '.urgency-strip',
        '.home', 
        '.hero',
        '.contact-section',
        '.guests-main',
        '#projects-slider',
        '.project-detail',
        '.about-section',
        '.certificates-heading',
        'section:first-of-type',
        '.container:first-of-type'
      ];
      
      let targetElement = null;
      for (const selector of contentSelectors) {
        targetElement = document.querySelector(selector);
        if (targetElement && targetElement !== document.querySelector('.web-svg')) break;
      }
      
      if (targetElement) {
        targetElement.style.paddingTop = navbarHeight + 'px';
      } else {
        document.body.style.marginTop = navbarHeight + 'px';
      }
    }
    
    setTimeout(syncOffset, 100);
    window.addEventListener('resize', syncOffset);
    window.addEventListener('load', syncOffset);

    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (hamburger && sidebar && overlay) {
      const menuSound = new Audio('menu.mp3');
      const navSound = new Audio('nav.mp3');

      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
        menuSound.currentTime = 0;
        menuSound.play().catch(() => {});
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
      });

      document.querySelectorAll('.sidebar a, .nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
          const dest = link.getAttribute('href');
          navSound.currentTime = 0;
          navSound.play().catch(() => {});
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
          document.body.classList.remove('sidebar-open');
        });
      });
    }
  }
})();
