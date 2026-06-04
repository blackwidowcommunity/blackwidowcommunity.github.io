// footer-component.js - Enhanced with scanner and particle effects from certs.html
(function() {
  const footerHTML = `
    <style>
      /* ALL footer styles with enhanced scanner effects */
      .footer.glass-footer { 
        padding: 0; 
        border-top: 1px solid rgba(180,50,30,0.25); 
        overflow: hidden; 
        position: relative; 
        z-index: 1; 
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
      
      /* Scanner overlay container */
      .partners-scanner-overlay { 
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        pointer-events: none; 
        z-index: 0; 
        overflow: hidden; 
      }
      
      #partnersParticleCanvas, 
      #partnersScannerCanvas { 
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        pointer-events: none;
      }
      
      #partnersParticleCanvas {
        z-index: 1;
      }
      
      #partnersScannerCanvas {
        z-index: 2;
      }
      
      /* Scanner line */
      .partners-scanner-line { 
        position: absolute; 
        top: 0; 
        left: 50%; 
        transform: translateX(-50%); 
        width: 4px; 
        height: 100%; 
        background: linear-gradient(to bottom, transparent, rgba(200,0,0,0.8), rgba(255,0,0,1), rgba(200,0,0,0.8), transparent); 
        box-shadow: 0 0 20px rgba(200,0,0,0.8); 
        animation: scanPulse 2s ease-in-out infinite alternate; 
        z-index: 3; 
      }
      
      @keyframes scanPulse { 
        0% { opacity: 0.7; transform: translateX(-50%) scaleY(1); } 
        100% { opacity: 1; transform: translateX(-50%) scaleY(1.05); } 
      }
      
      .partners-content { 
        position: relative; 
        z-index: 10; 
      }
      
      .footer-partners-label { 
        font-family: 'Cinzel', serif; 
        font-size: 1rem; 
        font-weight: 600; 
        letter-spacing: 0.25em; 
        text-transform: uppercase; 
        color: rgba(255,255,255,0.4); 
        margin: 0 0 2rem 0; 
        position: relative;
        z-index: 10;
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
      
      .partners-track:hover { 
        animation-play-state: paused; 
      }
      
      @keyframes partnerScroll { 
        from { transform: translateX(0); } 
        to { transform: translateX(-50%); } 
      }
      
      /* Enhanced partner logo with clipping effects like cards */
      .partner-logo { 
        position: relative; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        gap: 0.9rem; 
        padding: 0.9rem 2rem; 
        border: 1px solid rgba(255,255,255,0.1); 
        border-radius: 10px; 
        background: rgba(0,0,0,0.6); 
        backdrop-filter: blur(4px); 
        white-space: nowrap; 
        cursor: default; 
        transition: all 0.3s ease; 
        overflow: hidden; 
        min-width: 180px;
      }
      
      .partner-logo:hover { 
        border-color: rgba(180,50,30,0.7); 
        background: rgba(0,0,0,0.8); 
        transform: translateY(-3px); 
      }
      
      .partner-logo .p-icon { 
        font-size: 1.6rem; 
        z-index: 2; 
      }
      
      .partner-logo .p-name { 
        font-family: 'Cinzel', serif; 
        font-size: 1rem; 
        font-weight: 600; 
        letter-spacing: 0.08em; 
        color: rgba(255,255,255,0.7); 
        z-index: 2; 
      }
      
      /* Code card that appears on scan - like certs.html */
      .partner-code-card { 
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background: rgba(0,0,0,0.95); 
        border-radius: 10px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        opacity: 0; 
        transition: opacity 0.15s ease; 
        pointer-events: none; 
        z-index: 20; 
        backdrop-filter: blur(4px); 
      }
      
      .partner-code-card.active { 
        opacity: 1; 
      }
      
      .partner-code-content { 
        font-family: 'Courier New', monospace; 
        font-size: 0.7rem; 
        color: #0f0; 
        text-shadow: 0 0 5px #0f0; 
        white-space: pre-wrap; 
        text-align: center; 
        line-height: 1.3; 
        padding: 0.8rem; 
      }
      
      /* Scan flash effect */
      .scan-flash { 
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background: linear-gradient(90deg, transparent, rgba(255,0,0,0.5), transparent); 
        transform: translateX(-100%); 
        pointer-events: none; 
        z-index: 25; 
        animation: scanFlash 0.4s ease-out; 
      }
      
      @keyframes scanFlash { 
        0% { transform: translateX(-100%); opacity: 0; } 
        50% { opacity: 0.8; } 
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
        font-family: 'Cinzel', serif; 
        font-size: 1rem; 
        font-weight: 500; 
        letter-spacing: 0.08em; 
        color: rgba(255,255,255,0.55); 
        text-decoration: none; 
      }
      
      .legal-links a:hover { 
        color: #fff; 
      }
      
      .copyright { 
        font-family: 'Raleway', sans-serif; 
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
        border-color: #0a66c2; 
        color: #0a66c2; 
        box-shadow: 0 0 22px rgba(10,102,194,0.55); 
        transform: translateY(-3px); 
      }
      
      .footer-socials-row a.s-youtube-row:hover { 
        border-color: #ff0000; 
        color: #ff0000; 
        box-shadow: 0 0 22px rgba(255,0,0,0.55); 
        transform: translateY(-3px); 
      }
      
      .footer-socials-row a.s-portfolio-row:hover { 
        border-color: #2ecc71; 
        color: #2ecc71; 
        box-shadow: 0 0 22px rgba(46,204,113,0.55); 
        transform: translateY(-3px); 
      }
      
      @media (max-width: 650px) { 
        .legal-copyright-row { flex-direction: column; gap: 0.8rem; } 
        .legal-links { gap: 1.5rem; } 
        .partner-logo { padding: 0.6rem 1.4rem; min-width: 140px; } 
        .partner-code-content { font-size: 0.55rem; } 
      }
    </style>
    
    <footer class="footer glass-footer">
      <div class="footer-partners">
        <div class="partners-scanner-overlay">
          <canvas id="partnersParticleCanvas"></canvas>
          <canvas id="partnersScannerCanvas"></canvas>
          <div class="partners-scanner-line"></div>
        </div>
        <div class="partners-content">
          <p class="footer-partners-label">TRUSTED PARTNERS &amp; SPONSORS</p>
          <div class="partners-track-wrapper">
            <div class="partners-track" id="partnersTrack">
              <div class="partner-logo" data-code="# Exploit Dev\\nbuffer_overflow()\\nshellcode_exec"><span class="p-icon">🔥</span><span class="p-name">OffSec</span><div class="partner-code-card"><div class="partner-code-content"></div></div></div>
              <div class="partner-logo" data-code=">>> PWNED\\ncertificate_verified\\naccess_granted"><span class="p-icon">💻</span><span class="p-name">INE Security</span><div class="partner-code-card"><div class="partner-code-content"></div></div></div>
              <div class="partner-logo" data-code="black_widow.init()\\nvulnerabilities: 42\\nexploit_ready"><span class="p-icon">🕷️</span><span class="p-name">BlackWidow Labs</span><div class="partner-code-card"><div class="partner-code-content"></div></div></div>
              <div class="partner-logo" data-code="# Exploit Dev\\nbuffer_overflow()\\nshellcode_exec"><span class="p-icon">🔥</span><span class="p-name">OffSec</span><div class="partner-code-card"><div class="partner-code-content"></div></div></div>
              <div class="partner-logo" data-code=">>> PWNED\\ncertificate_verified\\naccess_granted"><span class="p-icon">💻</span><span class="p-name">INE Security</span><div class="partner-code-card"><div class="partner-code-content"></div></div></div>
              <div class="partner-logo" data-code="black_widow.init()\\nvulnerabilities: 42\\nexploit_ready"><span class="p-icon">🕷️</span><span class="p-name">BlackWidow Labs</span><div class="partner-code-card"><div class="partner-code-content"></div></div></div>
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
  
  // Insert footer
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  
  // Initialize all effects after DOM is ready
  setTimeout(() => {
    initFooterEffects();
  }, 100);
  
  function initFooterEffects() {
    // Populate code content from data attributes
    document.querySelectorAll('.partner-logo').forEach(logo => {
      const codeContent = logo.getAttribute('data-code');
      const codeCardDiv = logo.querySelector('.partner-code-content');
      if (codeContent && codeCardDiv) {
        codeCardDiv.textContent = codeContent.replace(/\\n/g, '\n');
      }
    });
    
    // Initialize Particle System for footer
    initFooterParticleSystem();
    
    // Initialize Scanner System for footer
    initFooterScannerSystem();
    
    // Initialize clipping/scanner effect on logos
    initScannerClippingEffect();
  }
  
  function initFooterParticleSystem() {
    const canvas = document.getElementById('partnersParticleCanvas');
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    const containerHeight = parent.offsetHeight;
    
    let scene, camera, renderer, particles;
    let particleCount = 300;
    let velocities = [];
    let alphas = [];
    
    function init() {
      scene = new THREE.Scene();
      
      const width = window.innerWidth;
      const height = containerHeight;
      
      camera = new THREE.OrthographicCamera(
        -width / 2,
        width / 2,
        height / 2,
        -height / 2,
        1,
        1000
      );
      camera.position.z = 100;
      
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      
      createParticles();
      animate();
    }
    
    function createParticles() {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      velocities = new Float32Array(particleCount);
      alphas = new Float32Array(particleCount);
      
      // Create particle texture
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 32;
      textureCanvas.height = 32;
      const ctx = textureCanvas.getContext('2d');
      
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, '#fff');
      gradient.addColorStop(0.2, 'rgba(200, 50, 30, 0.8)');
      gradient.addColorStop(0.5, 'rgba(139, 0, 0, 0.4)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      
      const texture = new THREE.CanvasTexture(textureCanvas);
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * window.innerWidth;
        positions[i * 3 + 1] = (Math.random() - 0.5) * containerHeight;
        positions[i * 3 + 2] = 0;
        
        colors[i * 3] = 1;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.2;
        colors[i * 3 + 2] = Math.random() * 0.3;
        
        sizes[i] = Math.random() * 6 + 2;
        velocities[i] = Math.random() * 40 + 20;
        alphas[i] = Math.random() * 0.6 + 0.2;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
      
      const material = new THREE.ShaderMaterial({
        uniforms: {
          pointTexture: { value: texture },
          size: { value: 12.0 },
        },
        vertexShader: `
          attribute float alpha;
          attribute float size;
          varying float vAlpha;
          varying vec3 vColor;
          uniform float size;
          
          void main() {
            vAlpha = alpha;
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D pointTexture;
          varying float vAlpha;
          varying vec3 vColor;
          
          void main() {
            gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      
      particles = new THREE.Points(geometry, material);
      scene.add(particles);
    }
    
    function animate() {
      if (!particles) return;
      
      const positions = particles.geometry.attributes.position.array;
      const width = window.innerWidth;
      const height = containerHeight;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        
        if (positions[i * 3] > width / 2 + 50) {
          positions[i * 3] = -width / 2 - 50;
          positions[i * 3 + 1] = (Math.random() - 0.5) * height;
        }
        
        positions[i * 3 + 1] += Math.sin(Date.now() * 0.002 + i) * 0.3;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    
    function handleResize() {
      const newWidth = window.innerWidth;
      const newHeight = parent.offsetHeight;
      
      camera.left = -newWidth / 2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = -newHeight / 2;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
      
      if (particles) {
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          if (Math.abs(positions[i * 3]) > newWidth / 2) {
            positions[i * 3] = (Math.random() - 0.5) * newWidth;
          }
          if (Math.abs(positions[i * 3 + 1]) > newHeight / 2) {
            positions[i * 3 + 1] = (Math.random() - 0.5) * newHeight;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }
    }
    
    window.addEventListener('resize', handleResize);
    init();
  }
  
  function initFooterScannerSystem() {
    const canvas = document.getElementById('partnersScannerCanvas');
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    let w = window.innerWidth;
    let h = parent.offsetHeight;
    
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let count = 0;
    let maxParticles = 600;
    let intensity = 0.8;
    let lightBarX = w / 2;
    let lightBarWidth = 4;
    let fadeZone = 50;
    let scanningActive = true;
    let animationId = null;
    
    // Create gradient cache
    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 20;
    gradientCanvas.height = 20;
    const gradientCtx = gradientCanvas.getContext('2d');
    const grad = gradientCtx.createRadialGradient(10, 10, 0, 10, 10, 10);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(200, 0, 0, 0.8)');
    grad.addColorStop(0.7, 'rgba(139, 0, 0, 0.4)');
    grad.addColorStop(1, 'transparent');
    gradientCtx.fillStyle = grad;
    gradientCtx.fillRect(0, 0, 20, 20);
    
    function createParticle() {
      return {
        x: lightBarX + (Math.random() - 0.5) * lightBarWidth,
        y: Math.random() * h,
        vx: Math.random() * 0.8 + 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.3,
        decay: Math.random() * 0.01 + 0.005,
        life: 1,
        time: 0
      };
    }
    
    function initParticles() {
      for (let i = 0; i < maxParticles; i++) {
        particles.push(createParticle());
        count++;
      }
    }
    
    function updateParticle(p) {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      
      if (p.x > w + 20 || p.life <= 0) {
        p.x = lightBarX + (Math.random() - 0.5) * lightBarWidth;
        p.y = Math.random() * h;
        p.life = 1;
        p.vx = Math.random() * 0.8 + 0.2;
      }
      
      p.alpha = Math.max(0, Math.min(0.8, p.life * 0.8));
    }
    
    function drawParticle(p) {
      let fadeAlpha = 1;
      if (p.y < fadeZone) {
        fadeAlpha = p.y / fadeZone;
      } else if (p.y > h - fadeZone) {
        fadeAlpha = (h - p.y) / fadeZone;
      }
      
      ctx.globalAlpha = p.alpha * fadeAlpha;
      ctx.drawImage(gradientCanvas, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
    }
    
    function drawLightBar() {
      const verticalGradient = ctx.createLinearGradient(0, 0, 0, h);
      verticalGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      verticalGradient.addColorStop(fadeZone / h, 'rgba(255, 255, 255, 0.9)');
      verticalGradient.addColorStop(1 - fadeZone / h, 'rgba(255, 255, 255, 0.9)');
      verticalGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.globalCompositeOperation = 'lighter';
      
      // Core glow
      const coreGradient = ctx.createLinearGradient(lightBarX - lightBarWidth, 0, lightBarX + lightBarWidth, 0);
      coreGradient.addColorStop(0, 'rgba(139, 0, 0, 0)');
      coreGradient.addColorStop(0.4, 'rgba(255, 50, 30, 0.8)');
      coreGradient.addColorStop(0.5, 'rgba(255, 0, 0, 1)');
      coreGradient.addColorStop(0.6, 'rgba(255, 50, 30, 0.8)');
      coreGradient.addColorStop(1, 'rgba(139, 0, 0, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.fillRect(lightBarX - lightBarWidth, 0, lightBarWidth * 2, h);
      
      // Outer glow
      const outerGradient = ctx.createLinearGradient(lightBarX - lightBarWidth * 4, 0, lightBarX + lightBarWidth * 4, 0);
      outerGradient.addColorStop(0, 'rgba(139, 0, 0, 0)');
      outerGradient.addColorStop(0.5, 'rgba(200, 0, 0, 0.4)');
      outerGradient.addColorStop(1, 'rgba(139, 0, 0, 0)');
      
      ctx.fillStyle = outerGradient;
      ctx.fillRect(lightBarX - lightBarWidth * 4, 0, lightBarWidth * 8, h);
      
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = verticalGradient;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    }
    
    function render() {
      ctx.clearRect(0, 0, w, h);
      drawLightBar();
      
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < count; i++) {
        updateParticle(particles[i]);
        drawParticle(particles[i]);
      }
      
      // Add new particles occasionally
      if (Math.random() < 0.3 && count < maxParticles + 100) {
        particles.push(createParticle());
        count++;
      }
      
      if (count > maxParticles + 50) {
        particles.splice(0, 10);
        count -= 10;
      }
    }
    
    function animate() {
      render();
      animationId = requestAnimationFrame(animate);
    }
    
    function handleResize() {
      w = window.innerWidth;
      h = parent.offsetHeight;
      lightBarX = w / 2;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    }
    
    window.addEventListener('resize', handleResize);
    initParticles();
    animate();
  }
  
  function initScannerClippingEffect() {
    const logos = document.querySelectorAll('.partner-logo');
    const scannerLine = document.querySelector('.partners-scanner-line');
    
    if (!logos.length || !scannerLine) return;
    
    function updateClipping() {
      const scannerRect = scannerLine.getBoundingClientRect();
      const scannerLeft = scannerRect.left;
      const scannerRight = scannerRect.right;
      
      logos.forEach(logo => {
        const logoRect = logo.getBoundingClientRect();
        const logoLeft = logoRect.left;
        const logoRight = logoRect.right;
        const logoWidth = logoRect.width;
        
        const normalContent = logo.querySelector('.p-icon, .p-name');
        const codeCard = logo.querySelector('.partner-code-card');
        
        if (!normalContent || !codeCard) return;
        
        // Check if scanner overlaps with logo
        if (logoLeft < scannerRight && logoRight > scannerLeft) {
          // Calculate clip percentages
          const intersectLeft = Math.max(scannerLeft - logoLeft, 0);
          const intersectRight = Math.min(scannerRight - logoLeft, logoWidth);
          
          const normalClipRight = (intersectLeft / logoWidth) * 100;
          const codeClipLeft = (intersectRight / logoWidth) * 100;
          
          // Apply clipping to simulate scanner reveal
          logo.style.position = 'relative';
          
          // Trigger flash effect on first scan
          if (!logo.hasAttribute('data-scanned')) {
            logo.setAttribute('data-scanned', 'true');
            codeCard.classList.add('active');
            
            // Add flash effect
            const flash = document.createElement('div');
            flash.className = 'scan-flash';
            logo.style.position = 'relative';
            logo.appendChild(flash);
            
            setTimeout(() => {
              if (flash.parentNode) flash.remove();
            }, 400);
            
            setTimeout(() => {
              codeCard.classList.remove('active');
            }, 800);
          }
        } else if (logoRight < scannerLeft) {
          // Logo is to the left of scanner - show normal content
          codeCard.classList.remove('active');
        } else if (logoLeft > scannerRight) {
          // Logo is to the right of scanner - show normal content
          codeCard.classList.remove('active');
        }
      });
      
      requestAnimationFrame(updateClipping);
    }
    
    updateClipping();
  }
})();
