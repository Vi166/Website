// =============================================
// NAV SCROLL EFFECT
// =============================================
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

// =============================================
// SIDEBAR
// =============================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() { sidebar.classList.add('open'); sidebarOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeSidebar() { sidebar.classList.remove('open'); sidebarOverlay.classList.remove('open'); document.body.style.overflow = ''; }

hamburgerBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// =============================================
// SCROLL REVEAL
// =============================================
const observer = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
    }
}), { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
