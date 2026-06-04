// footer-component.js
// Usage: <script src="footer-component.js"></script>
// Place this tag at the bottom of <body> on any page.
// Three.js r128 is loaded automatically if not already present.

(function () {

  // ── 1. Inject styles ───────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap");

    .footer.glass-footer {
      padding: 0;
      border-top: 1px solid rgba(180,50,30,0.25);
      overflow: hidden;
      position: relative;
      z-index: 90;
      margin-top: 4rem;
    }

    .footer-partners {
      position: relative;
      padding: 3rem 6% 2rem;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      overflow: hidden;
      min-height: 280px;
    }

    #footerParticleCanvas {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    #footerScannerCanvas {
      position: absolute;
      top: 0; left: -3px;
      width: 100%; height: 100%;
      z-index: 2;
      pointer-events: none;
    }

    .footer-scanner-line {
      display: block;
      position: absolute;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%);
      width: 4px;
      height: 110%;
      border-radius: 30px;
      background: linear-gradient(
        to bottom,
        transparent,
        rgba(139,0,0,0.8),
        rgba(200,0,0,1),
        rgba(139,0,0,0.8),
        transparent
      );
      box-shadow: 0 0 20px rgba(200,0,0,0.8), 0 0 40px rgba(200,0,0,0.4);
      animation: footerScanPulse 2s ease-in-out infinite alternate;
      z-index: 3;
      pointer-events: none;
    }

    @keyframes footerScanPulse {
      0%   { opacity: 0.8; transform: translate(-50%,-50%) scaleY(1); }
      100% { opacity: 1;   transform: translate(-50%,-50%) scaleY(1.1); }
    }

    .partners-content {
      position: relative;
      z-index: 10;
    }

    .footer-partners-label {
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      margin: 0 0 2rem 0;
    }

    .partners-track-wrapper {
      overflow: hidden;
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
              mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
      position: relative;
      z-index: 10;
    }

    .partners-track {
      display: flex;
      gap: 4rem;
      width: max-content;
      animation: partnerScroll 28s linear infinite;
    }

    .partners-track:hover { animation-play-state: paused; }

    @keyframes partnerScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    /* Transparent wrapper — reserves space only, no visible styling of its own */
    .partner-logo {
      position: relative;
      min-width: 180px;
      height: 56px;
      flex-shrink: 0;
      white-space: nowrap;
      cursor: default;
    }

    /* Normal card — full border/bg/content, clips away LEFT as scanner passes
       mirrors: .card-normal { clip-path: inset(0 0 0 var(--clip-right, 0%)); } */
    .p-card-normal {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      padding: 0.9rem 2rem;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px);
      box-sizing: border-box;
      clip-path: inset(0 0 0 var(--clip-right, 0%));
      z-index: 2;
      transition: border-color 0.3s ease, background 0.3s ease;
    }

    .partner-logo:hover .p-card-normal {
      border-color: rgba(180,50,30,0.7);
      background: rgba(0,0,0,0.85);
    }

    .p-icon { font-size: 1.6rem; }

    .p-name {
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.75);
    }

    /* ASCII card — dark bg + red border + code text, revealed behind scanner
       mirrors: .card-ascii { clip-path: inset(0 calc(100% - var(--clip-left, 0%)) 0 0); } */
    .p-card-ascii {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border: 1px solid rgba(183,75,75,0.45);
      border-radius: 10px;
      background: rgba(0,0,0,0.92);
      box-sizing: border-box;
      clip-path: inset(0 calc(100% - var(--clip-left, 0%)) 0 0);
      z-index: 1;
      overflow: hidden;
    }

    .p-ascii-content {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      color: rgba(220,210,255,0.65);
      font-family: "Courier New", monospace;
      font-size: 9px;
      line-height: 11px;
      overflow: hidden;
      white-space: pre;
      animation: footerGlitch 0.1s infinite linear alternate-reverse;
      -webkit-mask-image: linear-gradient(
        to right,
        rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%,
        rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%,
        rgba(0,0,0,0.2) 100%
      );
              mask-image: linear-gradient(
        to right,
        rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%,
        rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%,
        rgba(0,0,0,0.2) 100%
      );
      padding: 4px;
      box-sizing: border-box;
    }

    @keyframes footerGlitch {
      0%   { opacity: 1; }
      15%  { opacity: 0.9; }
      16%  { opacity: 1; }
      49%  { opacity: 0.8; }
      50%  { opacity: 1; }
      99%  { opacity: 0.9; }
      100% { opacity: 1; }
    }

    .footer-scan-effect {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(200,0,0,0.4), transparent);
      animation: footerScanEffect 0.6s ease-out;
      pointer-events: none;
      z-index: 5;
    }

    @keyframes footerScanEffect {
      0%   { transform: translateX(-100%); opacity: 0; }
      50%  { opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }

    .footer-bottom {
      position: relative;
      z-index: 10;
      background: rgba(0,0,0,0.8);
      padding: 1.8rem 6%;
    }

    .footer-bottom-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .legal-copyright-row {
      display: flex;
      align-items: baseline;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .legal-links {
      display: flex;
      gap: 2.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .legal-links a {
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .legal-links a:hover { color: #fff; }

    .copyright {
      font-family: 'Poppins', sans-serif;
      font-size: 1.1rem;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.05em;
    }

    .footer-socials-row {
      display: flex;
      gap: 1.3rem;
      justify-content: center;
      margin-top: 0.3rem;
    }

    .footer-socials-row a {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.7);
      font-size: 1.6rem;
      text-decoration: none;
      background: rgba(255,255,255,0.03);
      transition: all 0.3s ease;
    }

    .footer-socials-row a.s-linkedin-row:hover {
      border-color: #0a66c2; color: #0a66c2;
      box-shadow: 0 0 22px rgba(10,102,194,0.55);
      transform: translateY(-3px);
    }

    .footer-socials-row a.s-youtube-row:hover {
      border-color: #ff0000; color: #ff0000;
      box-shadow: 0 0 22px rgba(255,0,0,0.55);
      transform: translateY(-3px);
    }

    .footer-socials-row a.s-portfolio-row:hover {
      border-color: #2ecc71; color: #2ecc71;
      box-shadow: 0 0 22px rgba(46,204,113,0.55);
      transform: translateY(-3px);
    }

    @media (max-width: 650px) {
      .legal-copyright-row { flex-direction: column; gap: 0.8rem; }
      .legal-links { gap: 1.5rem; }
      .partner-logo { padding: 0.6rem 1.4rem; min-width: 140px; }
      .p-ascii-content { font-size: 7px; line-height: 9px; }
    }
  `;
  document.head.appendChild(style);

  // ── 2. Inject HTML ─────────────────────────────────────────────────────────
  const footerHTML = `
    <footer class="footer glass-footer">
      <div class="footer-partners">
        <canvas id="footerParticleCanvas"></canvas>
        <canvas id="footerScannerCanvas"></canvas>
        <div class="footer-scanner-line"></div>
        <div class="partners-content">
          <p class="footer-partners-label">TRUSTED PARTNERS &amp; SPONSORS</p>
          <div class="partners-track-wrapper">
            <div class="partners-track" id="partnersTrack">
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">🔥</span><span class="p-name">OffSec</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">💻</span><span class="p-name">INE Security</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">🕷️</span><span class="p-name">BlackWidow Labs</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">🛡️</span><span class="p-name">HackTheBox</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">⚡</span><span class="p-name">TryHackMe</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">🔥</span><span class="p-name">OffSec</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">💻</span><span class="p-name">INE Security</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">🕷️</span><span class="p-name">BlackWidow Labs</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">🛡️</span><span class="p-name">HackTheBox</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
              <div class="partner-logo"><div class="p-card-normal"><span class="p-icon">⚡</span><span class="p-name">TryHackMe</span></div><div class="p-card-ascii"><div class="p-ascii-content"></div></div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-container">
          <div class="legal-copyright-row">
            <div class="legal-links">
              <a href="community-guidelines.html">Community Guidelines</a>
              <a href="privacy.html">Data Privacy</a>
            </div>
            <div class="copyright">© 2026 Black Widow Community. All rights reserved.</div>
          </div>
          <div class="footer-socials-row">
            <a href="https://www.linkedin.com/in/bree-kagwe" target="_blank" class="s-linkedin-row"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://www.youtube.com/@HackerBree" target="_blank" class="s-youtube-row"><i class="fa-brands fa-youtube"></i></a>
            <a href="certs.html" class="s-portfolio-row"><i class="fa-solid fa-folder-open"></i></a>
          </div>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ── 3. Boot effects once Three.js is available ─────────────────────────────
  function bootEffects() {
    seedAsciiContent();
    initFooterParticleSystem();
    initFooterScannerSystem();
    startClippingLoop();

    setInterval(() => {
      document.querySelectorAll('.partner-logo').forEach(logo => {
        if (Math.random() < 0.15) {
          const asciiEl = logo.querySelector('.p-ascii-content');
          const name    = logo.querySelector('.p-name')?.textContent.trim();
          if (asciiEl && name) asciiEl.textContent = generateCode(26, 4);
        }
      });
    }, 200);
  }

  function loadThreeAndBoot() {
    if (typeof THREE !== 'undefined') {
      bootEffects();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = bootEffects;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadThreeAndBoot);
  } else {
    loadThreeAndBoot();
  }

  // ── generateCode — verbatim from certs.html ────────────────────────────────
  function generateCode(width, height) {
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pick    = (arr) => arr[randInt(0, arr.length - 1)];

    const header = [
      '// compiled preview • scanner demo',
      '/* generated for visual effect – not executed */',
      'const SCAN_WIDTH = 8;',
      'const FADE_ZONE = 35;',
      'const MAX_PARTICLES = 2500;',
      'const TRANSITION = 0.05;',
    ];
    const helpers = [
      'function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }',
      'function lerp(a, b, t) { return a + (b - a) * t; }',
      'const now = () => performance.now();',
      'function rng(min, max) { return Math.random() * (max - min) + min; }',
    ];
    const particleBlock = (idx) => [
      `class Particle${idx} {`,
      '  constructor(x, y, vx, vy, r, a) {',
      '    this.x = x; this.y = y;',
      '    this.vx = vx; this.vy = vy;',
      '    this.r = r; this.a = a;',
      '  }',
      '  step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }',
      '}',
    ];
    const scannerBlock = [
      'const scanner = {',
      '  x: Math.floor(window.innerWidth / 2),',
      '  width: SCAN_WIDTH,',
      '  glow: 3.5,',
      '};',
      '',
      'function drawParticle(ctx, p) {',
      '  ctx.globalAlpha = clamp(p.a, 0, 1);',
      '  ctx.drawImage(gradient, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);',
      '}',
    ];
    const loopBlock = [
      'function tick(t) {',
      '  // requestAnimationFrame(tick);',
      '  const dt = 0.016;',
      '  // update & render',
      '}',
    ];
    const misc = [
      'const state = { intensity: 1.2, particles: MAX_PARTICLES };',
      'const bounds = { w: window.innerWidth, h: 300 };',
      "const gradient = document.createElement('canvas');",
      "const ctx = gradient.getContext('2d');",
      "ctx.globalCompositeOperation = 'lighter';",
      '// ascii overlay is masked with a 3-phase gradient',
    ];

    const library = [];
    header.forEach(l => library.push(l));
    helpers.forEach(l => library.push(l));
    for (let b = 0; b < 3; b++) particleBlock(b).forEach(l => library.push(l));
    scannerBlock.forEach(l => library.push(l));
    loopBlock.forEach(l => library.push(l));
    misc.forEach(l => library.push(l));
    for (let i = 0; i < 40; i++) {
      library.push(`const v${i} = (${randInt(1,9)} + ${randInt(10,99)}) * 0.${randInt(1,9)};`);
    }
    for (let i = 0; i < 20; i++) {
      library.push(`if (state.intensity > ${1 + (i % 3)}) { scanner.glow += 0.01; }`);
    }

    let flow = library.join(' ').replace(/\s+/g, ' ').trim();
    const totalChars = width * height;
    while (flow.length < totalChars + width) {
      flow += ' ' + library[randInt(0, library.length - 1)].replace(/\s+/g, ' ').trim();
    }

    let out = '', offset = 0;
    for (let row = 0; row < height; row++) {
      let line = flow.slice(offset, offset + width);
      if (line.length < width) line += ' '.repeat(width - line.length);
      out += line + (row < height - 1 ? '\n' : '');
      offset += width;
    }
    return out;
  }

  // ── Seed initial ASCII text into every logo ────────────────────────────────
  function seedAsciiContent() {
    document.querySelectorAll('.partner-logo').forEach(logo => {
      const asciiEl = logo.querySelector('.p-ascii-content');
      if (asciiEl) asciiEl.textContent = generateCode(26, 4);
    });
  }

  // ── ParticleSystem (Three.js floating dots) — exact from certs.html ────────
  function initFooterParticleSystem() {
    const canvas = document.getElementById('footerParticleCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const band = canvas.parentElement;
    const W = () => window.innerWidth;
    const H = () => band.offsetHeight || 280;

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W()/2, W()/2, H()/2, -H()/2, 1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W(), H());
    renderer.setClearColor(0x000000, 0);

    const texCanvas = document.createElement('canvas');
    texCanvas.width = texCanvas.height = 100;
    const tCtx  = texCanvas.getContext('2d');
    const tGrad = tCtx.createRadialGradient(50, 50, 0, 50, 50, 50);
    tGrad.addColorStop(0,   '#fff');
    tGrad.addColorStop(0.2, 'rgba(200,50,30,0.8)');
    tGrad.addColorStop(0.5, 'rgba(139,0,0,0.4)');
    tGrad.addColorStop(1,   'transparent');
    tCtx.fillStyle = tGrad;
    tCtx.fillRect(0, 0, 100, 100);
    const texture = new THREE.CanvasTexture(texCanvas);

    const particleCount = 400;
    const positions  = new Float32Array(particleCount * 3);
    const colors     = new Float32Array(particleCount * 3);
    const sizes      = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i*3]   = (Math.random() - 0.5) * W();
      positions[i*3+1] = (Math.random() - 0.5) * H();
      positions[i*3+2] = 0;
      colors[i*3]   = 1;
      colors[i*3+1] = Math.random() * 0.3;
      colors[i*3+2] = 0;
      sizes[i]      = Math.random() * 8 + 3;
      velocities[i] = Math.random() * 40 + 15;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 8, map: texture, vertexColors: true,
      transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, opacity: 0.8,
    });

    scene.add(new THREE.Points(geo, mat));

    (function animate() {
      const pos = geo.attributes.position.array;
      const w = W(), h = H();
      for (let i = 0; i < particleCount; i++) {
        pos[i*3] += velocities[i] * 0.016;
        if (pos[i*3] > w / 2 + 50) {
          pos[i*3]   = -w / 2 - 50;
          pos[i*3+1] = (Math.random() - 0.5) * h;
        }
        pos[i*3+1] += Math.sin(Date.now() * 0.002 + i) * 0.3;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();

    window.addEventListener('resize', () => {
      const w = W(), h = H();
      camera.left = -w/2; camera.right = w/2;
      camera.top  =  h/2; camera.bottom = -h/2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  // ── ParticleScanner (2D canvas light-bar) — exact from certs.html ──────────
  function initFooterScannerSystem() {
    const canvas = document.getElementById('footerScannerCanvas');
    if (!canvas) return;

    const band = canvas.parentElement;
    let w = window.innerWidth;
    let h = band.offsetHeight || 280;
    canvas.width = w; canvas.height = h;

    const ctx = canvas.getContext('2d');

    const gradCanvas = document.createElement('canvas');
    gradCanvas.width = gradCanvas.height = 20;
    const gCtx = gradCanvas.getContext('2d');
    const g    = gCtx.createRadialGradient(10,10,0,10,10,10);
    g.addColorStop(0,   'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(200,0,0,0.8)');
    g.addColorStop(0.7, 'rgba(139,0,0,0.4)');
    g.addColorStop(1,   'transparent');
    gCtx.fillStyle = g;
    gCtx.fillRect(0, 0, 20, 20);

    const baseIntensity       = 0.6,  scanTargetIntensity    = 1.8;
    const baseMaxParticles    = 1200, scanTargetParticles    = 2500;
    const baseFadeZone        = 35,   scanTargetFadeZone     = 60;
    const transitionSpeed     = 0.05;
    const lightBarWidth       = 4;
    const lbx                 = () => w / 2;

    let currentIntensity    = baseIntensity;
    let currentMaxParticles = baseMaxParticles;
    let currentFadeZone     = baseFadeZone;
    let currentGlowIntensity = 1;
    let scanningActive      = false;
    let particles = {}, count = 0;

    function createParticle() {
      const side = Math.random() < 0.5 ? 1 : -1;
      return {
        x: lbx() + (Math.random()-0.5) * lightBarWidth,
        y: Math.random() * h,
        vx: (Math.random()*1.5+0.5) * side,
        vy: (Math.random()-0.5)*0.5,
        radius: Math.random()*2.5+0.5,
        alpha:  Math.random()*0.6+0.2,
        decay:  Math.random()*0.012+0.004,
        life:   1,
      };
    }

    function updateParticle(p) {
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      if (Math.abs(p.x - lbx()) > w * 0.6 || p.life <= 0) Object.assign(p, createParticle());
    }

    function drawParticle(p) {
      const fz = currentFadeZone;
      let fade = 1;
      if (p.y < fz)          fade = p.y / fz;
      else if (p.y > h - fz) fade = (h - p.y) / fz;
      ctx.globalAlpha = Math.max(0, p.alpha * fade * p.life);
      ctx.drawImage(gradCanvas, p.x - p.radius, p.y - p.radius, p.radius*2, p.radius*2);
    }

    function drawLightBar() {
      const x  = lbx();
      const fz = currentFadeZone;

      const vg = ctx.createLinearGradient(0,0,0,h);
      vg.addColorStop(0,       'rgba(255,255,255,0)');
      vg.addColorStop(fz/h,   'rgba(255,255,255,1)');
      vg.addColorStop(1-fz/h, 'rgba(255,255,255,1)');
      vg.addColorStop(1,       'rgba(255,255,255,0)');

      ctx.globalCompositeOperation = 'lighter';
      const tg = scanningActive ? 3.5 : 1;
      currentGlowIntensity += (tg - currentGlowIntensity) * transitionSpeed;
      const gi = currentGlowIntensity;

      const cg = ctx.createLinearGradient(x-lightBarWidth/2,0,x+lightBarWidth/2,0);
      cg.addColorStop(0,   'rgba(255,255,255,0)');
      cg.addColorStop(0.3, `rgba(255,255,255,${0.9*gi})`);
      cg.addColorStop(0.5, `rgba(255,255,255,${1.0*gi})`);
      cg.addColorStop(0.7, `rgba(255,255,255,${0.9*gi})`);
      cg.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.globalAlpha = 1; ctx.fillStyle = cg;
      ctx.beginPath(); ctx.roundRect(x-lightBarWidth/2,0,lightBarWidth,h,15); ctx.fill();

      const g1 = ctx.createLinearGradient(x-lightBarWidth*2,0,x+lightBarWidth*2,0);
      g1.addColorStop(0,   'rgba(139,0,0,0)');
      g1.addColorStop(0.5, `rgba(200,0,0,${0.8*gi})`);
      g1.addColorStop(1,   'rgba(139,0,0,0)');
      ctx.globalAlpha = scanningActive ? 1.0 : 0.8; ctx.fillStyle = g1;
      ctx.beginPath(); ctx.roundRect(x-lightBarWidth*2,0,lightBarWidth*4,h,25); ctx.fill();

      const g2 = ctx.createLinearGradient(x-lightBarWidth*4,0,x+lightBarWidth*4,0);
      g2.addColorStop(0,   'rgba(139,0,0,0)');
      g2.addColorStop(0.5, `rgba(139,0,0,${0.4*gi})`);
      g2.addColorStop(1,   'rgba(139,0,0,0)');
      ctx.globalAlpha = scanningActive ? 0.8 : 0.6; ctx.fillStyle = g2;
      ctx.beginPath(); ctx.roundRect(x-lightBarWidth*4,0,lightBarWidth*8,h,35); ctx.fill();

      if (scanningActive) {
        const g3 = ctx.createLinearGradient(x-lightBarWidth*8,0,x+lightBarWidth*8,0);
        g3.addColorStop(0,   'rgba(139,0,0,0)');
        g3.addColorStop(0.5, 'rgba(139,0,0,0.2)');
        g3.addColorStop(1,   'rgba(139,0,0,0)');
        ctx.globalAlpha = 0.6; ctx.fillStyle = g3;
        ctx.beginPath(); ctx.roundRect(x-lightBarWidth*8,0,lightBarWidth*16,h,45); ctx.fill();
      }

      ctx.globalCompositeOperation = 'destination-in';
      ctx.globalAlpha = 1; ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);
    }

    (function render() {
      const tI  = scanningActive ? scanTargetIntensity  : baseIntensity;
      const tMP = scanningActive ? scanTargetParticles  : baseMaxParticles;
      const tFZ = scanningActive ? scanTargetFadeZone   : baseFadeZone;
      currentIntensity    += (tI  - currentIntensity)    * transitionSpeed;
      currentMaxParticles += (tMP - currentMaxParticles) * transitionSpeed;
      currentFadeZone     += (tFZ - currentFadeZone)     * transitionSpeed;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      drawLightBar();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 1; i <= count; i++) {
        if (particles[i]) { updateParticle(particles[i]); drawParticle(particles[i]); }
      }

      const max = Math.floor(currentMaxParticles);
      const ir  = currentIntensity / baseIntensity;
      if (Math.random() < currentIntensity && count < max) particles[++count] = createParticle();
      if (ir > 1.1 && Math.random() < (ir-1.0)*1.2) particles[++count] = createParticle();
      if (ir > 1.3 && Math.random() < (ir-1.3)*1.4) particles[++count] = createParticle();
      if (ir > 1.5 && Math.random() < (ir-1.5)*1.8) particles[++count] = createParticle();
      if (ir > 2.0 && Math.random() < (ir-2.0)*2.0) particles[++count] = createParticle();
      if (count > max + 200) {
        const ex = Math.min(15, count - max);
        for (let i = 0; i < ex; i++) delete particles[count - i];
        count -= ex;
      }

      requestAnimationFrame(render);
    })();

    window._footerSetScanning = (active) => { scanningActive = active; };

    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = band.offsetHeight || 280;
      canvas.width = w; canvas.height = h;
    });
  }

  // ── Clipping loop — mirrors certs.html updateCardClipping exactly ──────────
  function startClippingLoop() {
    const scannerEl = document.querySelector('.footer-scanner-line');
    if (!scannerEl) return;

    (function updateClipping() {
      const sr   = scannerEl.getBoundingClientRect();
      const sL   = sr.left, sR = sr.right;
      let active = false;

      document.querySelectorAll('.partner-logo').forEach(logo => {
        const r  = logo.getBoundingClientRect();
        const cL = r.left, cR = r.right, cW = r.width;
        const nf = logo.querySelector('.p-card-normal');
        const af = logo.querySelector('.p-card-ascii');
        if (!nf || !af) return;

        if (cL < sR && cR > sL) {
          active = true;
          const iL = Math.max(sL - cL, 0);
          const iR = Math.min(sR - cL, cW);
          nf.style.setProperty('--clip-right', `${(iL/cW)*100}%`);
          af.style.setProperty('--clip-left',  `${(iR/cW)*100}%`);

          if (!logo.hasAttribute('data-scanned') && iL > 0) {
            logo.setAttribute('data-scanned', 'true');
            const flash = document.createElement('div');
            flash.className = 'footer-scan-effect';
            logo.appendChild(flash);
            setTimeout(() => flash.parentNode && flash.remove(), 600);
          }
        } else {
          if (cR < sL) {
            nf.style.setProperty('--clip-right', '100%');
            af.style.setProperty('--clip-left',  '100%');
          } else {
            nf.style.setProperty('--clip-right', '0%');
            af.style.setProperty('--clip-left',  '0%');
          }
          logo.removeAttribute('data-scanned');
        }
      });

      if (window._footerSetScanning) window._footerSetScanning(active);
      requestAnimationFrame(updateClipping);
    })();
  }

})();
