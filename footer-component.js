// footer-component.js - Include this ONE line on any page
(function() {
  const footerHTML = `
    <style>
      /* ALL footer styles here - copy from your AboutUs.html */
      .footer.glass-footer { padding: 0; border-top: 1px solid rgba(180,50,30,0.25); overflow: hidden; position: relative; z-index: 1; }
      .footer-partners { position: relative; padding: 3rem 6% 2rem; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); overflow: hidden; }
      .partners-scanner-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden; }
      #partnersParticleCanvas, #partnersScannerCanvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
      .partners-scanner-line { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 4px; height: 100%; background: linear-gradient(to bottom, transparent, rgba(200,0,0,0.8), rgba(255,0,0,1), rgba(200,0,0,0.8), transparent); box-shadow: 0 0 20px rgba(200,0,0,0.8); animation: scanPulse 2s ease-in-out infinite alternate; z-index: 2; }
      @keyframes scanPulse { 0% { opacity: 0.7; transform: translateX(-50%) scaleY(1); } 100% { opacity: 1; transform: translateX(-50%) scaleY(1.05); } }
      .partners-content { position: relative; z-index: 10; }
      .footer-partners-label { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 2rem 0; }
      .partners-track-wrapper { overflow: hidden; -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%); }
      .partners-track { display: flex; gap: 4rem; width: max-content; animation: partnerScroll 28s linear infinite; }
      .partners-track:hover { animation-play-state: paused; }
      @keyframes partnerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .partner-logo { position: relative; display: flex; align-items: center; justify-content: center; gap: 0.9rem; padding: 0.9rem 2rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); white-space: nowrap; cursor: default; transition: all 0.3s ease; overflow: hidden; }
      .partner-logo:hover { border-color: rgba(180,50,30,0.7); background: rgba(0,0,0,0.8); transform: translateY(-3px); }
      .partner-logo .p-icon { font-size: 1.6rem; z-index: 2; }
      .partner-logo .p-name { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 600; letter-spacing: 0.08em; color: rgba(255,255,255,0.7); z-index: 2; }
      .partner-code-card { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); border-radius: 10px; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.15s ease; pointer-events: none; z-index: 20; backdrop-filter: blur(4px); }
      .partner-code-card.active { opacity: 1; }
      .partner-code-content { font-family: 'Courier New', monospace; font-size: 0.7rem; color: #0f0; text-shadow: 0 0 5px #0f0; white-space: pre-wrap; text-align: center; line-height: 1.3; padding: 0.8rem; }
      .scan-flash { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,0,0,0.5), transparent); transform: translateX(-100%); pointer-events: none; z-index: 25; animation: scanFlash 0.4s ease-out; }
      @keyframes scanFlash { 0% { transform: translateX(-100%); opacity: 0; } 50% { opacity: 0.8; } 100% { transform: translateX(100%); opacity: 0; } }
      .footer-bottom { position: relative; z-index: 10; background: rgba(0,0,0,0.8); padding: 1.8rem 6%; }
      .footer-bottom-container { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; }
      .legal-copyright-row { display: flex; align-items: baseline; justify-content: center; flex-wrap: wrap; gap: 2rem; }
      .legal-links { display: flex; gap: 2.5rem; flex-wrap: wrap; justify-content: center; }
      .legal-links a { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 500; letter-spacing: 0.08em; color: rgba(255,255,255,0.55); text-decoration: none; }
      .legal-links a:hover { color: #fff; }
      .copyright { font-family: 'Raleway', sans-serif; font-size: 1.1rem; color: rgba(255,255,255,0.35); letter-spacing: 0.05em; }
      .footer-socials-row { display: flex; gap: 1.3rem; justify-content: center; margin-top: 0.3rem; }
      .footer-socials-row a { width: 44px; height: 44px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); font-size: 1.6rem; text-decoration: none; background: rgba(255,255,255,0.03); transition: all 0.3s ease; }
      .footer-socials-row a.s-linkedin-row:hover { border-color: #0a66c2; color: #0a66c2; box-shadow: 0 0 22px rgba(10,102,194,0.55); transform: translateY(-3px); }
      .footer-socials-row a.s-youtube-row:hover { border-color: #ff0000; color: #ff0000; box-shadow: 0 0 22px rgba(255,0,0,0.55); transform: translateY(-3px); }
      .footer-socials-row a.s-portfolio-row:hover { border-color: #2ecc71; color: #2ecc71; box-shadow: 0 0 22px rgba(46,204,113,0.55); transform: translateY(-3px); }
      @media (max-width: 650px) { .legal-copyright-row { flex-direction: column; gap: 0.8rem; } .legal-links { gap: 1.5rem; } .partner-logo { padding: 0.6rem 1.4rem; } .partner-code-content { font-size: 0.55rem; } }
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
            <div class="partners-track">
              <div class="partner-logo"><span class="p-icon">🔥</span><span class="p-name">OffSec</span><div class="partner-code-card"><div class="partner-code-content"># Exploit Dev<br>buffer_overflow()<br>shellcode_exec</div></div></div>
              <div class="partner-logo"><span class="p-icon">💻</span><span class="p-name">INE Security</span><div class="partner-code-card"><div class="partner-code-content">>>> PWNED<br>certificate_verified<br>access_granted</div></div></div>
              <div class="partner-logo"><span class="p-icon">🕷️</span><span class="p-name">BlackWidow Labs</span><div class="partner-code-card"><div class="partner-code-content">black_widow.init()<br>vulnerabilities: 42<br>exploit_ready</div></div></div>
              <div class="partner-logo"><span class="p-icon">🔥</span><span class="p-name">OffSec</span><div class="partner-code-card"><div class="partner-code-content"># Exploit Dev<br>buffer_overflow()<br>shellcode_exec</div></div></div>
              <div class="partner-logo"><span class="p-icon">💻</span><span class="p-name">INE Security</span><div class="partner-code-card"><div class="partner-code-content">>>> PWNED<br>certificate_verified<br>access_granted</div></div></div>
              <div class="partner-logo"><span class="p-icon">🕷️</span><span class="p-name">BlackWidow Labs</span><div class="partner-code-card"><div class="partner-code-content">black_widow.init()<br>vulnerabilities: 42<br>exploit_ready</div></div></div>
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
  
  // Initialize scanner effects (simplified version)
  setTimeout(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      // Your scanner initialization code here
      console.log('Footer scanner ready');
    };
    document.head.appendChild(script);
  }, 100);
})();
