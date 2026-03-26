// 🔒 ПРЕЛОАДЕР
const preloader = document.getElementById('preloader');
const enterBtn = document.getElementById('enterBtn');
const music = document.getElementById('music');
const site = document.getElementById('site'); // Находим блок сайта

document.body.classList.add('preloader-active');

enterBtn.onclick = () => {
  // 1. Показываем блок сайта (он был display: none)
  if (site) {
    site.style.display = "block";
  }

  // 2. Скрываем прелоадер
  preloader.style.opacity = "0";
  
  setTimeout(() => {
    preloader.style.display = "none";
    document.body.classList.remove('preloader-active');
    
    // Перезапускаем наблюдатель для анимаций, чтобы текст появился сразу после входа
    refreshObserver(); 
  }, 1000);

  if (music) music.play();
};

// ⏳ ТАЙМЕР
const weddingDate = new Date("2026-07-03T15:00:00"); // Дата из твоего макета

function updateTimer() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) return;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  if(document.getElementById('d-val')) {
    document.getElementById('d-val').textContent = d;
    document.getElementById('h-val').textContent = String(h).padStart(2, '0');
    document.getElementById('m-val').textContent = String(m).padStart(2, '0');
    document.getElementById('s-val').textContent = String(s).padStart(2, '0');
  }
}
setInterval(updateTimer, 1000);
updateTimer();

// ✨ АНИМАЦИИ (Появление при скролле)
function refreshObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Оставляем текст видимым (не исчезает при скролле назад)
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// 🔊 ЗВУК
const toggle = document.getElementById('soundToggle');
if (toggle) {
    toggle.onclick = () => {
      if (music.paused) {
        music.play();
        toggle.textContent = "🔊";
      } else {
        music.pause();
        toggle.textContent = "🔇";
      }
    };
}

