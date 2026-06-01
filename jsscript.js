/* =========================================================
   NAM MY PORTFOLIO - MAIN SCRIPT
========================================================= */

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

/* =========================================================
   MOBILE MENU
========================================================= */

if (menuIcon && navbar) {

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

}

/* =========================================================
   ACTIVE NAVBAR LINK WHEN SCROLLING
========================================================= */

function updateActiveSection() {

    let currentSection = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute('id');
        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        const href = link.getAttribute('href');

        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }

    });
}

/* =========================================================
   STICKY HEADER
========================================================= */

function updateHeader() {

    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

}

/* =========================================================
   SCROLL EVENTS
========================================================= */

window.addEventListener('scroll', () => {

    updateActiveSection();
    updateHeader();

});

/* =========================================================
   PDF ZOOM CONTROLLER
========================================================= */

const pdf = document.getElementById('thesisPdf');
const zoomSlider = document.getElementById('thesisZoom');
const zoomValue = document.querySelector('.zoom-value');
const zoomButtons = document.querySelectorAll('.zoom-btn');

if (
    pdf &&
    zoomSlider &&
    zoomValue &&
    zoomButtons.length > 0
) {

    let zoom = 1;

    const MIN_ZOOM = 0.8;
    const MAX_ZOOM = 1.6;
    const STEP = 0.1;

    function applyZoom(newZoom) {

        zoom = Math.max(
            MIN_ZOOM,
            Math.min(MAX_ZOOM, newZoom)
        );

        pdf.style.setProperty('--pdf-zoom', zoom);

        const percent = Math.round(zoom * 100);

        zoomSlider.value = percent;
        zoomValue.textContent = `${percent}%`;

    }

    zoomSlider.addEventListener('input', () => {

        applyZoom(
            Number(zoomSlider.value) / 100
        );

    });

    zoomButtons.forEach(button => {

        button.addEventListener('click', () => {

            if (button.dataset.action === 'in') {
                applyZoom(zoom + STEP);
            } else {
                applyZoom(zoom - STEP);
            }

        });

    });

    applyZoom(1);

}

/* =========================================================
   INITIAL LOAD
========================================================= */

window.addEventListener('load', () => {

    updateActiveSection();
    updateHeader();

});

/* =========================================================
   SMOOTH REVEAL ANIMATION
========================================================= */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('show');

            }

        });

    },

    {
        threshold: 0.15
    }

);

document
    .querySelectorAll(
        '.journey-card, .thesis-panel, .activity-panel'
    )
    .forEach(el => {
        observer.observe(el);
    });
