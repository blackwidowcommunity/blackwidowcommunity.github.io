/* =====================================================
   navbar-loader.js - Works with style(9).css
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

  // ── 2. INJECT SPIDER WEB SVG (if not already in page) ─────────────────────
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

  // ── 3. FETCH & INJECT navbar.html ─────────────────────────────────────────
  fetch('navbar.html')
    .then(r => r.text())
    .then(html => {
      // Only inject if not already present
      if (!document.querySelector('header')) {
        document.body.insertAdjacentHTML('afterbegin', html);
      }
      init();
    })
    .catch(() => console.warn('navbar-loader: could not load navbar.html'));

  // ── 4. INITIALISE EVERYTHING AFTER INJECTION ──────────────────────────────
  function init() {
    // Active link: match current filename
    const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav-links a, .sidebar a').forEach(a => {
      if (a.dataset.page === page || a.getAttribute('href') === page + '.html' || 
          (page === 'index' && a.getAttribute('href') === 'index.html')) {
        a.classList.add('active');
      }
    });

    // CRITICAL: Sync padding so content isn't hidden under fixed navbar
    function syncOffset() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      const navbarHeight = navbar.offsetHeight;
      
      // Find the first main content element
      const firstElements = [
        '.urgency-strip',
        '.home', 
        '.hero',
        '.contact-section',
        '.main-content',
        '.certificates-heading',
        '#projects-slider',
        '.project-detail',
        '.about-section',
        'section:first-of-type',
        '.container:first-of-type'
      ];
      
      let targetElement = null;
      for (const selector of firstElements) {
        targetElement = document.querySelector(selector);
        if (targetElement) break;
      }
      
      if (targetElement) {
        // Apply padding-top to the target element
        targetElement.style.paddingTop = (parseInt(getComputedStyle(targetElement).paddingTop) || 0) + navbarHeight + 'px';
      } else {
        // Fallback: add margin to body's first child
        const bodyFirstChild = document.body.children[0];
        if (bodyFirstChild && bodyFirstChild !== document.querySelector('.web-svg')) {
          bodyFirstChild.style.marginTop = navbarHeight + 'px';
        }
      }
    }
    
    // Run after a short delay to ensure DOM is ready
    setTimeout(syncOffset, 100);
    window.addEventListener('resize', syncOffset);
    window.addEventListener('load', syncOffset);

    // Hamburger / Sidebar / Overlay
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

      // Close sidebar when clicking a link
      document.querySelectorAll('.sidebar a, .nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
          const dest = link.getAttribute('href');
          navSound.currentTime = 0;
          navSound.play().catch(() => {});

          sidebar.classList.remove('active');
          overlay.classList.remove('active');
          document.body.classList.remove('sidebar-open');

          // Handle anchor links
          if (dest && dest.startsWith('#')) {
            e.preventDefault();
            setTimeout(() => {
              const el = document.querySelector(dest);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          }
          // For regular links, let the browser handle navigation
        });
      });
    }
  }
})();
