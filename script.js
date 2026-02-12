// SATCORP Concierge Empire - Interactive Features
// ================================================

// Smooth Scroll with Offset for Fixed Header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-In Animations
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

// Observe all cards and major sections
const animatedElements = document.querySelectorAll(`
    .empire-card,
    .capability-card,
    .difference-card,
    .client-card,
    .principle-item
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// Number Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target === Infinity ? '∞' : target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stats and trigger counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const numberElement = entry.target.querySelector('.stat-number');
            const targetValue = numberElement.textContent;
            
            if (targetValue === '∞') {
                // Animate infinity symbol with pulsing effect
                numberElement.style.animation = 'infinityPulse 2s ease-in-out infinite';
            } else {
                const target = parseInt(targetValue);
                animateCounter(numberElement, target);
            }
            
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add infinity pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes infinityPulse {
        0%, 100% { 
            transform: scale(1);
            opacity: 1;
        }
        50% { 
            transform: scale(1.1);
            opacity: 0.8;
        }
    }
    
    /* Mobile Nav Styles */
    @media (max-width: 768px) {
        .main-nav {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 250px;
            background: rgba(10, 14, 26, 0.98);
            backdrop-filter: blur(20px);
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            padding: 2rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            transition: right 0.3s ease;
            height: calc(100vh - 70px);
            box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .main-nav.active {
            right: 0;
        }
        
        .nav-link {
            width: 100%;
            padding: 0.5rem 0;
            font-size: 1.1rem;
        }
        
        .nav-cta {
            width: 100%;
            text-align: center;
            margin-top: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Cursor Trail Effect (Desktop Only)
if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: rgba(0, 102, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateCursor = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .empire-card, .capability-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(0, 229, 255, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(0, 102, 255, 0.6)';
        });
    });
}

// Random Grid Animation Enhancement
const bgGrid = document.querySelector('.bg-grid');
if (bgGrid) {
    let gridSpeed = 20;
    
    window.addEventListener('scroll', () => {
        const scrollSpeed = Math.abs(window.pageYOffset - lastScroll);
        gridSpeed = Math.min(5 + scrollSpeed / 10, 30);
        bgGrid.style.animationDuration = `${gridSpeed}s`;
    });
}

// Empire Card Hover Effect Enhancement
document.querySelectorAll('.empire-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const spotlight = document.createElement('div');
        spotlight.style.cssText = `
            position: absolute;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(0, 102, 255, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        
        this.appendChild(spotlight);
        
        this.addEventListener('mousemove', (e) => {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlight.style.left = `${x}px`;
            spotlight.style.top = `${y}px`;
        });
        
        this.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
            setTimeout(() => spotlight.remove(), 300);
        });
    });
});

// Capability Card Stagger Animation
const capabilityCards = document.querySelectorAll('.capability-card');
const capabilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

capabilityCards.forEach(card => {
    capabilityObserver.observe(card);
});

// Typing Effect for Hero Badge (Optional Enhancement)
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
    const originalText = heroBadge.textContent;
    let index = 0;
    heroBadge.textContent = '';
    
    const typeWriter = () => {
        if (index < originalText.length) {
            heroBadge.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Console Easter Egg
console.log('%c┌─────────────────────────────────┐', 'color: #0066FF; font-weight: bold;');
console.log('%c│       SATCORP SYSTEMS v1.0      │', 'color: #0066FF; font-weight: bold;');
console.log('%c│    Concierge Operator Active    │', 'color: #00E5FF; font-weight: bold;');
console.log('%c└─────────────────────────────────┘', 'color: #0066FF; font-weight: bold;');
console.log('%cAll systems operational. Technology as a force multiplier.', 'color: #A0AEC0;');
console.log('%cInterested in building something? Contact: contact@satcorp.co', 'color: #FFD700;');

// Performance Monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Browser doesn't support LCP observation
    }
}

// Initialize tooltips for capability tags (future enhancement)
document.querySelectorAll('.capability-tag').forEach(tag => {
    tag.setAttribute('title', 'Tech stack and deliverables');
});

// Log initialization
console.log('%c✓ SATCORP Empire Interface Initialized', 'color: #00E5FF; font-weight: bold;');
