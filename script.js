// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrixCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        this.fontSize = 14;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
        
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        window.addEventListener('resize', () => this.resize());
        this.draw();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.draw());
    }
}

// Terminal Typing Effect
class TerminalTyper {
    constructor() {
        this.element = document.getElementById('typedText');
        this.output = document.getElementById('terminalOutput');
        this.commands = [
            'initialize_kyrax_systems.sh',
            'loading tactical modules...',
            'NEURAL NETWORK: ONLINE',
            'THREAT DETECTION: ACTIVE',
            'ENCRYPTION PROTOCOLS: VERIFIED',
            'KYRAX AI READY FOR OPERATIONS'
        ];
        this.currentCommand = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseDelay = 2000;
        
        this.type();
    }
    
    type() {
        const current = this.commands[this.currentCommand];
        
        if (this.isDeleting) {
            this.element.textContent = current.substring(0, this.currentChar - 1);
            this.currentChar--;
        } else {
            this.element.textContent = current.substring(0, this.currentChar + 1);
            this.currentChar++;
        }
        
        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentChar === current.length) {
            // Add to output
            if (this.currentCommand > 0) {
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line output-line';
                outputLine.innerHTML = `<span class="output-text">${current}</span>`;
                this.output.appendChild(outputLine);
            }
            
            speed = this.pauseDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentCommand = (this.currentCommand + 1) % this.commands.length;
            
            if (this.currentCommand === 0) {
                this.output.innerHTML = '';
            }
            
            speed = 500;
        }
        
        setTimeout(() => this.type(), speed);
    }
}

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            if (target < 10) {
                element.textContent = current.toFixed(2);
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, 16);
}

// Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseFloat(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Operations Log Animation
function addOperationLog() {
    const log = document.getElementById('operationsLog');
    const operations = [
        'PERIMETER SCAN - CLEAR',
        'SATELLITE UPLINK - ESTABLISHED',
        'DATA PACKET INTERCEPTED - ANALYZING',
        'FIREWALL STATUS - OPTIMAL',
        'BIOMETRIC VERIFICATION - PASSED',
        'TACTICAL ASSESSMENT - UPDATED'
    ];
    
    setInterval(() => {
        const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        const entry = document.createElement('div');
        entry.className = 'log-entry new-entry';
        entry.textContent = `[${timestamp}] ${operation}`;
        
        log.insertBefore(entry, log.firstChild);
        
        setTimeout(() => {
            entry.classList.remove('new-entry');
        }, 100);
        
        // Keep only last 10 entries
        while (log.children.length > 10) {
            log.removeChild(log.lastChild);
        }
    }, 5000);
}

// Glitch Effect
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.classList.add('glitch-active');
            setTimeout(() => {
                element.classList.remove('glitch-active');
            }, 200);
        }, 3000 + Math.random() * 5000);
    });
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form Handling
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const response = document.getElementById('formResponse');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate sending
        response.innerHTML = '<div class="sending">ENCRYPTING MESSAGE...</div>';
        
        setTimeout(() => {
            response.innerHTML = `
                <div class="success">
                    <div class="success-icon">✓</div>
                    <div>MESSAGE TRANSMITTED SUCCESSFULLY</div>
                    <div class="transmission-code">TRANSMISSION ID: KX-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                    <div>EXPECT RESPONSE WITHIN 24 HOURS</div>
                </div>
            `;
            form.reset();
            
            setTimeout(() => {
                response.innerHTML = '';
            }, 5000);
        }, 2000);
    });
}

// Card Hover Effects
function setupCardEffects() {
    const cards = document.querySelectorAll('.system-card, .intel-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Random Status Blink
function randomStatusBlink() {
    const indicators = document.querySelectorAll('.status-indicator.active');
    
    setInterval(() => {
        const randomIndicator = indicators[Math.floor(Math.random() * indicators.length)];
        randomIndicator.style.animation = 'none';
        setTimeout(() => {
            randomIndicator.style.animation = '';
        }, 100);
    }, 3000);
}

// Nav Active State
function setupNavActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Parallax Scroll Effect
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-title, .hero-subtitle');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Start Matrix Rain
    new MatrixRain();
    
    // Start Terminal Typer
    new TerminalTyper();
    
    // Setup counter animations
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Add operations log
    addOperationLog();
    
    // Add glitch effect
    addGlitchEffect();
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // Setup contact form
    setupContactForm();
    
    // Setup card effects
    setupCardEffects();
    
    // Random status blink
    randomStatusBlink();
    
    // Setup nav active state
    setupNavActiveState();
    
    // Setup parallax
    setupParallax();
    
    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg - Konami code
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.classList.add('ultra-matrix');
                setTimeout(() => {
                    document.body.classList.remove('ultra-matrix');
                    konamiIndex = 0;
                }, 10000);
            }
        } else {
            konamiIndex = 0;
        }
    });
})();
