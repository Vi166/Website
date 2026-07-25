// =============================================
// NAV SCROLL EFFECT
// =============================================
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// =============================================
// SIDEBAR
// =============================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// =============================================
// SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================================
// GALLERY MODAL
// =============================================
let currentImageIndex = 0;
let galleryImageSources = [];

function initGallery() {
    const imgs = document.querySelectorAll('.gallery-item img');
    galleryImageSources = Array.from(imgs).map(img => img.src);
}

function openModal(src) {
    initGallery();
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    modal.classList.add('active');
    modal.style.display = 'flex';
    modalImg.src = src;
    currentImageIndex = galleryImageSources.findIndex(s => s.includes(src.split('/').pop())) || 0;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function changeImage(dir) {
    if (!galleryImageSources.length) return;
    currentImageIndex = (currentImageIndex + dir + galleryImageSources.length) % galleryImageSources.length;
    document.getElementById('modalImage').src = galleryImageSources[currentImageIndex];
}

// Gallery items now use data-img instead of inline onclick="" so this
// keeps working under a strict CSP (script-src 'self', no 'unsafe-inline').
document.querySelectorAll('.gallery-item[data-img]').forEach(item => {
    item.addEventListener('click', () => openModal(item.dataset.img));
});

// Modal controls now use ids instead of inline onclick="" for the same reason.
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalPrev').addEventListener('click', () => changeImage(-1));
document.getElementById('modalNext').addEventListener('click', () => changeImage(1));

document.addEventListener('keydown', e => {
    const modal = document.getElementById('galleryModal');
    if (modal.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    }
});

document.getElementById('galleryModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
