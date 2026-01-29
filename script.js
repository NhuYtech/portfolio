// ===========================
// SMOOTH SCROLLING
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// ACTIVE SECTION HIGHLIGHTING
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedHighlight = debounce(highlightNavLink, 100);
window.addEventListener('scroll', debouncedHighlight);

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for cards
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ===========================
// GRADIENT ORBS PARALLAX
// ===========================
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        const x = (mouseX - 0.5) * 100 * speed;
        const y = (mouseY - 0.5) * 100 * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===========================
// SKILL BADGE INTERACTION
// ===========================
const skillBadges = document.querySelectorAll('.skill-badge');

skillBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        // Add subtle scale animation
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// PROJECT CARD TILT EFFECT
// ===========================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// CONTACT CARD GLOW EFFECT
// ===========================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add glow effect styles
const style = document.createElement('style');
style.textContent = `
    .contact-card::after {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent 70%);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .contact-card:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===========================
// BUTTON RIPPLE EFFECT
// ===========================
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===========================
// CURSOR GLOW TRAIL
// ===========================
if (window.innerWidth > 768) {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // Add cursor glow styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
        }
    `;
    document.head.appendChild(cursorStyle);
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log(
    '%c✨ Modern Portfolio ✨',
    'color: #667eea; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);'
);
console.log(
    '%cBuilt with modern web technologies',
    'color: #764ba2; font-size: 14px;'
);
