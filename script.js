// ===========================
// TWO-PHASE VIEW SWITCHING SYSTEM
// ===========================

// Get all navigation links and views
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view');
const ctaButtons = document.querySelectorAll('[data-view]');

// Current active view
let currentView = 'home';

// Transition lock to prevent rapid clicks
let isTransitioning = false;

// Transition duration (must match CSS)
const TRANSITION_DURATION = 350; // 350ms

/**
 * Switch to a specific view with two-phase transition
 * Phase 1: Exit current view
 * Phase 2: Enter new view
 * @param {string} viewName - Name of the view to switch to
 */
function switchView(viewName) {
    // Don't switch if already on this view
    if (currentView === viewName) return;

    // Don't switch if transition is in progress
    if (isTransitioning) return;

    // Lock transitions
    isTransitioning = true;

    // Find the views
    const targetView = document.getElementById(`${viewName}-view`);
    const currentViewElement = document.getElementById(`${currentView}-view`);

    if (!targetView || !currentViewElement) {
        isTransitioning = false;
        return;
    }

    // PHASE 1: Exit current view
    currentViewElement.classList.add('leaving');
    currentViewElement.classList.remove('active');

    // Wait for exit animation to complete
    setTimeout(() => {
        // Remove leaving class and hide completely
        currentViewElement.classList.remove('leaving');

        // PHASE 2: Enter new view
        targetView.classList.add('active');

        // Update current view
        currentView = viewName;

        // Update navigation active state
        updateNavigation(viewName);

        // Update URL hash (optional, no page reload)
        updateHash(viewName);

        // Announce to screen readers
        announceViewChange(viewName);

        // Unlock transitions after enter animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, TRANSITION_DURATION);

    }, TRANSITION_DURATION);
}

/**
 * Update navigation active state
 * @param {string} viewName - Name of the active view
 */
function updateNavigation(viewName) {
    navLinks.forEach(link => {
        if (link.dataset.view === viewName) {
            link.classList.add('active');
            link.setAttribute('aria-selected', 'true');
        } else {
            link.classList.remove('active');
            link.setAttribute('aria-selected', 'false');
        }
    });
}

/**
 * Update URL hash without reload
 * @param {string} viewName - Name of the view
 */
function updateHash(viewName) {
    if (history.pushState) {
        history.pushState(null, null, `#${viewName}`);
    } else {
        window.location.hash = viewName;
    }
}

/**
 * Announce view change to screen readers
 * @param {string} viewName - Name of the view
 */
function announceViewChange(viewName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${viewName} view`;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===========================
// EVENT LISTENERS
// ===========================

// Navigation link clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = link.dataset.view;
        switchView(viewName);
    });
});

// CTA button clicks (e.g., "View Projects" button)
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const viewName = button.dataset.view;
        if (viewName) {
            switchView(viewName);
        }
    });
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================

// Arrow key navigation for tabs
document.addEventListener('keydown', (e) => {
    // Only handle arrow keys when focus is on nav links
    if (!document.activeElement.classList.contains('nav-link')) return;

    const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
    let nextIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % navLinks.length;
        navLinks[nextIndex].focus();
        switchView(navLinks[nextIndex].dataset.view);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        navLinks[nextIndex].focus();
        switchView(navLinks[nextIndex].dataset.view);
    } else if (e.key === 'Home') {
        e.preventDefault();
        navLinks[0].focus();
        switchView(navLinks[0].dataset.view);
    } else if (e.key === 'End') {
        e.preventDefault();
        navLinks[navLinks.length - 1].focus();
        switchView(navLinks[navLinks.length - 1].dataset.view);
    }
});

// ===========================
// INITIAL LOAD & HASH HANDLING
// ===========================

// Handle initial hash on page load
function handleInitialHash() {
    const hash = window.location.hash.substring(1); // Remove #
    const validViews = ['home', 'portfolio', 'about'];

    let initialView = 'home';
    if (hash && validViews.includes(hash)) {
        initialView = hash;
    }

    // Directly activate initial view without transition
    const initialViewElement = document.getElementById(`${initialView}-view`);
    if (initialViewElement) {
        initialViewElement.classList.add('active');
        currentView = initialView;
        updateNavigation(initialView);
    }
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    const validViews = ['home', 'portfolio', 'about'];

    if (hash && validViews.includes(hash)) {
        switchView(hash);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    handleInitialHash();
});

// ===========================
// PREVENT SCROLL (EXTRA SAFETY)
// ===========================

// Prevent any scroll attempts
window.addEventListener('scroll', (e) => {
    window.scrollTo(0, 0);
});

// Prevent mousewheel scroll
window.addEventListener('wheel', (e) => {
    if (e.target.closest('.view-content')) {
        // Allow scroll within view content
        return;
    }
    e.preventDefault();
}, { passive: false });

// Prevent touch scroll on body
document.body.addEventListener('touchmove', (e) => {
    if (e.target.closest('.view-content')) {
        // Allow scroll within view content
        return;
    }
    e.preventDefault();
}, { passive: false });

// ===========================
// SKILL BADGE INTERACTIONS
// ===========================

const skillBadges = document.querySelectorAll('.skill-badge');

skillBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// PROJECT CARD HOVER EFFECTS
// ===========================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// ACCESSIBILITY: SCREEN READER ONLY CLASS
// ===========================

// Add screen reader only styles
const srOnlyStyle = document.createElement('style');
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(srOnlyStyle);

// ===========================
// CONSOLE MESSAGE
// ===========================

console.log(
    '%c🚀 Fixed-View Portfolio',
    'color: #667eea; font-size: 18px; font-weight: bold;'
);
console.log(
    '%cNo scrolling - View switching only',
    'color: #764ba2; font-size: 12px;'
);
console.log(
    '%cKeyboard navigation: Arrow keys to switch tabs',
    'color: #4facfe; font-size: 12px;'
);
