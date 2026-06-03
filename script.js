// ✅ Only run Swiper if the element exists
if (document.querySelector('.projects-swiper')) {

  // Add these 3 lines BEFORE var swiper = new Swiper...
  const urlParams = new URLSearchParams(window.location.search);
  const initialSlide = parseInt(urlParams.get('slide')) || 0;
  
  var swiper = new Swiper('.projects-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    initialSlide: initialSlide, // ✅ Start at the specified slide
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // 🎵 Add navigation sound to swiper arrows
  const swiperNavSound = new Audio('menu.mp3');
  swiperNavSound.preload = 'auto';
  
  const nextArrow = document.querySelector('.swiper-button-next');
  const prevArrow = document.querySelector('.swiper-button-prev');
  
  if (nextArrow) {
    nextArrow.addEventListener('click', () => {
      swiperNavSound.currentTime = 0;
      swiperNavSound.play().catch(() => {});
    });
  }
  
  if (prevArrow) {
    prevArrow.addEventListener('click', () => {
      swiperNavSound.currentTime = 0;
      swiperNavSound.play().catch(() => {});
    });
  }
}




// 🎧 FIXED Sound system - create audio instances once
const sounds = {
  click: new Audio('click.mp3'),
  error: new Audio('error.mp3'),
  locked: new Audio('locked.mp3')  // Add this line
};

// Preload all sounds
Object.values(sounds).forEach(audio => {
  audio.preload = 'auto';
});

function playSound(type) {
  const sound = sounds[type];
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(err => console.log('Audio play failed:', err));
}

// Handle Coming Soon buttons specifically
function attachComingSoonListeners() {
  document.querySelectorAll('.coming-soon-card-btn').forEach(btn => {
    btn.replaceWith(btn.cloneNode(true));
  });
  
  document.querySelectorAll('.coming-soon-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playSound('click');
      
      // Get the href from parent link
      const destination = btn.getAttribute('href');
      
      // Navigate after sound plays
      setTimeout(() => {
        window.location.href = destination;
      }, 250);
    });
  });
}

// Handle other sound buttons
// Handle other sound buttons
function attachSoundListeners() {
  document.querySelectorAll('[data-sound]:not(.coming-soon-card-btn)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const soundType = btn.getAttribute('data-sound');
      
      if (soundType) {
        playSound(soundType);
        
        // Get the href for navigation
        const destination = btn.getAttribute('href');
        
        // Navigate after sound plays
        if (destination) {
          setTimeout(() => {
            window.location.href = destination;
          }, 250);
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  attachSoundListeners();
  attachComingSoonListeners();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    attachSoundListeners();
    attachComingSoonListeners();
  }, 300);
});






// 🔴 Shake animation for selected buttons only
document.querySelectorAll('[data-shake]').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('shake');
    setTimeout(() => button.classList.remove('shake'), 400);
  });
});

// NAVIGATION BAR
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});


// AI POWERED CONVERSATION
// AI Audio Playback (using .mp3)
const aiAudio = document.getElementById('ai-audio');
const aiPlayBtn = document.getElementById('ai-play-btn');
const aiProgressBar = document.getElementById('ai-progress-bar');
const aiCurrentTime = document.getElementById('ai-current-time');
const aiDuration = document.getElementById('ai-duration');
const aiPlayIcon = aiPlayBtn.querySelector('i');

// CHANGED: Force load metadata immediately to prevent --:-- showing
aiAudio.load();

// CHANGED: Set duration when metadata loads
aiAudio.addEventListener('loadedmetadata', () => {
  aiDuration.textContent = formatTime(aiAudio.duration);
  aiProgressBar.classList.add('loaded');
});

// CHANGED: Backup check if metadata doesn't load immediately
setTimeout(() => {
  if (aiAudio.duration && !isNaN(aiAudio.duration)) {
    aiDuration.textContent = formatTime(aiAudio.duration);
  }
}, 500);

// CHANGED: Additional check when audio is ready to play
aiAudio.addEventListener('canplaythrough', () => {
  if (aiAudio.duration && !isNaN(aiAudio.duration)) {
    aiDuration.textContent = formatTime(aiAudio.duration);
  }
});

aiPlayBtn.addEventListener('click', () => {
  if (aiAudio.paused) {
    aiAudio.play();
    aiPlayIcon.classList.remove('fa-play');
    aiPlayIcon.classList.add('fa-pause');
  } else {
    aiAudio.pause();
    aiPlayIcon.classList.remove('fa-pause');
    aiPlayIcon.classList.add('fa-play');
  }
});

// CHANGED: Keep duration visible during playback
aiAudio.addEventListener('timeupdate', () => {
  const progress = (aiAudio.currentTime / aiAudio.duration) * 100;
  aiProgressBar.style.width = `${progress}%`;
  aiCurrentTime.textContent = formatTime(aiAudio.currentTime);
  
  // Keep duration visible during playback
  if (aiAudio.duration && !isNaN(aiAudio.duration)) {
    aiDuration.textContent = formatTime(aiAudio.duration);
  }
});

aiAudio.addEventListener('ended', () => {
  aiPlayIcon.classList.remove('fa-pause');
  aiPlayIcon.classList.add('fa-play');
  aiProgressBar.style.width = '0%';
  aiCurrentTime.textContent = '0:00';
});

// Allow seeking by clicking on progress container
const progressContainer = document.querySelector('.progress-container');
progressContainer.addEventListener('click', (e) => {
  const containerWidth = progressContainer.offsetWidth;
  const clickX = e.offsetX;
  const duration = aiAudio.duration;
  aiAudio.currentTime = (clickX / containerWidth) * duration;
});

// Add drag functionality
let isDragging = false;

progressContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  updateAudioTime(e);
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    updateAudioTime(e);
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Touch support for mobile
progressContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  updateAudioTime(e.touches[0]);
});

document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    updateAudioTime(e.touches[0]);
  }
});

document.addEventListener('touchend', () => {
  isDragging = false;
});

function updateAudioTime(e) {
  const rect = progressContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const containerWidth = progressContainer.offsetWidth;
  const percentage = Math.max(0, Math.min(1, offsetX / containerWidth));
  aiAudio.currentTime = percentage * aiAudio.duration;
}

// Add cursor pointer to show it's clickable
progressContainer.style.cursor = 'pointer';

// CHANGED: Return '--' if duration is invalid, preventing NaN display
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '--';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}




// ===============================
// HACKER DECODE TEXT EFFECT
// ===============================

// ====== SCRAMBLE TEXT ANIMATION ======
const roles = [
  "Security Analyst",
  "Ethical Hacker",
  "Threat Hunter",
  "Incident Responder",
  "SOC Analyst"
];

const dynamicText = document.getElementById("dynamic-text");

let currentRole = 0;
let scrambleInterval;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*:";

function scrambleText(role) {
  let iteration = 0;
  const target = role;
  const total = target.length;

  clearInterval(scrambleInterval);

  scrambleInterval = setInterval(() => {
    dynamicText.innerText = target
      .split("")
      .map((char, idx) => {
        if (idx < iteration) return target[idx];
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    iteration += 1 / 2; // smooth speed

    if (iteration >= total) {
      clearInterval(scrambleInterval);
      dynamicText.innerText = target;
      setTimeout(() => rotateRole(), 1500);
    }
  }, 50);
}

function rotateRole() {
  currentRole = (currentRole + 1) % roles.length;
  scrambleText(roles[currentRole]);
}

// Start animation
scrambleText(roles[currentRole]);
