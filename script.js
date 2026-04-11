// Nav border on scroll
const nav = document.querySelector('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });
}

// ===== LIGHTBOX =====
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <button class="lb-close" aria-label="Fermer">&#x2715;</button>
    <div class="lb-inner">
        <img class="lb-img" src="" alt="">
        <p class="lb-caption"></p>
    </div>
`;
document.body.appendChild(lightbox);

const lbImg     = lightbox.querySelector('.lb-img');
const lbCaption = lightbox.querySelector('.lb-caption');

function openLightbox(img) {
    lbImg.src = img.src;
    lbImg.alt = img.alt;

    const item    = img.closest('.gallery-item, .project-hero-img');
    const caption = item ? item.querySelector('.img-caption') : null;
    lbCaption.innerHTML = caption ? caption.innerHTML : '';
    lbCaption.style.display = caption ? 'block' : 'none';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
}

document.querySelectorAll('.gallery-item img, .project-hero-img img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img));
});

lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
