// SATCORP - Concierge Empire Interactive Script

// ============================================
// Smooth Scroll Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// ============================================
// Mobile Navigation Toggle
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
}

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.service-card, .operation-card, .client-card, .diff-item, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Stats Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target === Infinity ? '∞' : Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 16);
}

// Trigger counter animation when stats are in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const target = num.textContent === '∞' ? '∞' : parseInt(num.textContent);
                if (target !== '∞' && !num.classList.contains('counted')) {
                    num.classList.add('counted');
                    num.textContent = '0';
                    animateCounter(num, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ============================================
// Parallax Effect for Hero Background
// ============================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBackground.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ============================================
// Dynamic Cursor Effect (Desktop Only)
// ============================================
if (window.innerWidth > 968) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #d4af37;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease, opacity 0.15s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #d4af37;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.05s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    function animateCursor() {
        // Smooth follow effect
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        cursorDot.style.left = dotX - 2 + 'px';
        cursorDot.style.top = dotY - 2 + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    document.querySelectorAll('a, button, .nav-link, .cta-button, .contact-button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#ffffff';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#d4af37';
        });
    });
}

// ============================================
// Service Card Hover Effect
// ============================================
document.querySelectorAll('.service-card, .operation-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// Scroll Progress Indicator
// ============================================
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #b8941f);
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// Typed Text Effect for Hero Subtitle
// ============================================
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    function typeText() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 1000);
}

// ============================================
// Add Subtle Animation to Operation Icons
// ============================================
document.querySelectorAll('.operation-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.1}s`;
    icon.style.animation = 'fadeInScale 0.6s ease forwards';
});

// Add keyframe animation via style tag
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 73px;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        padding: 2rem;
        gap: 1.5rem;
        backdrop-filter: blur(20px);
        border-bottom: 1px solid #2a2a2a;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// Lazy Load Background Images
// ============================================
const lazyBackgrounds = document.querySelectorAll('[data-bg]');
if ('IntersectionObserver' in window) {
    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.backgroundImage = `url(${entry.target.dataset.bg})`;
                bgObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyBackgrounds.forEach(bg => bgObserver.observe(bg));
}

// ============================================
// Performance: Debounce Scroll Events
// ============================================
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

// ============================================
// Console Easter Egg
// ============================================
console.log('%c SATCORP ', 'background: #d4af37; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Concierge Creative Operations ', 'color: #d4af37; font-size: 14px; padding: 5px;');
console.log('%c Technology is a force multiplier, not a crutch. ', 'color: #a0a0a0; font-style: italic;');

// ============================================
// Initialize All Functions on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    console.log('SATCORP Empire initialized successfully.');
});

// ============================================
// Add Click Ripple Effect to Buttons
// ============================================
document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
