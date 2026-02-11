// Custom Alien Cursor
const cursor = document.getElementById('alienCursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Animate signal strength
const signal = document.getElementById('signal');
let signalValue = 75;
let increasing = true;

setInterval(() => {
    if (increasing) {
        signalValue += Math.random() * 5;
        if (signalValue >= 100) {
            signalValue = 100;
            increasing = false;
        }
    } else {
        signalValue -= Math.random() * 3;
        if (signalValue <= 60) {
            signalValue = 60;
            increasing = true;
        }
    }
    signal.style.width = signalValue + '%';
}, 200);

// Life forms counter
const lifeformsElement = document.getElementById('lifeforms');
let lifeforms = 0;

const countInterval = setInterval(() => {
    if (lifeforms < 1337) {
        lifeforms += Math.floor(Math.random() * 50) + 1;
        if (lifeforms > 1337) lifeforms = 1337;
        lifeformsElement.textContent = lifeforms.toLocaleString();
    } else {
        clearInterval(countInterval);
    }
}, 100);

// Distance updater
const distanceElement = document.getElementById('distance');
let distance = 42000;

setInterval(() => {
    distance -= Math.floor(Math.random() * 100) + 50;
    if (distance < 0) distance = 42000;
    distanceElement.textContent = distance.toLocaleString() + ' km';
}, 1000);

// Alien messages
const messages = [
    "Greetings, Earthling. We come in peace... 🌌",
    "Your species shows promise. Initiating cultural exchange protocols. 👽",
    "We have been watching. Your coffee is... acceptable. ☕",
    "Resistance is futile. Just kidding! We're friendly. 😄",
    "The answer to the universe is NOT 42. It's 43. Sorry. 🔢",
    "We traveled light years for your memes. Worth it. 🖼️",
    "Your music intrigues us. Especially the dubstep. 🎵",
    "Humans are 70% water. We are 100% awesome. 💧",
    "Take us to your leader... or just your pizza. 🍕",
    "Scanning complete. Your planet has too many cats. We approve. 🐱"
];

const messageElement = document.getElementById('alien-message');
const contactBtn = document.getElementById('contactBtn');

contactBtn.addEventListener('click', () => {
    // Button animation
    contactBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        contactBtn.style.transform = 'scale(1)';
    }, 100);

    // Change message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.style.opacity = '0';
    
    setTimeout(() => {
        messageElement.textContent = randomMessage;
        messageElement.style.opacity = '1';
    }, 300);

    // Add terminal message
    addTerminalMessage('> Communication established...');
    setTimeout(() => {
        addTerminalMessage('> Message received: "' + randomMessage.substring(0, 30) + '..."');
    }, 500);
    setTimeout(() => {
        addTerminalMessage('> Status: <span class="success">ACTIVE</span>');
    }, 1000);
});

// Terminal message function
const terminal = document.getElementById('terminal');

function addTerminalMessage(message) {
    const p = document.createElement('p');
    p.innerHTML = message;
    terminal.appendChild(p);
    
    // Scroll to bottom
    terminal.scrollTop = terminal.scrollHeight;
    
    // Keep only last 10 messages
    if (terminal.children.length > 10) {
        terminal.removeChild(terminal.firstChild);
    }
}

// Random terminal activity
setInterval(() => {
    const randomMessages = [
        '> Scanning sector 7G...',
        '> Quantum entanglement stable',
        '> Warp drive charging: ' + Math.floor(Math.random() * 100) + '%',
        '> Detecting life signs...',
        '> Analyzing Earth broadcasts',
        '> Translating binary code',
        '> Monitoring cosmic radiation',
        '> Updating star charts'
    ];
    
    if (Math.random() > 0.7) {
        addTerminalMessage(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
    }
}, 5000);

// Card hover effects
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = '#ff00ff';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = '#00ff88';
    });
});

// Random starfield twinkle
function createTwinkle() {
    const twinkle = document.createElement('div');
    twinkle.style.position = 'fixed';
    twinkle.style.width = '2px';
    twinkle.style.height = '2px';
    twinkle.style.borderRadius = '50%';
    twinkle.style.background = '#fff';
    twinkle.style.left = Math.random() * window.innerWidth + 'px';
    twinkle.style.top = Math.random() * window.innerHeight + 'px';
    twinkle.style.pointerEvents = 'none';
    twinkle.style.zIndex = '0';
    twinkle.style.animation = 'twinkle 2s ease-in-out';
    
    document.body.appendChild(twinkle);
    
    setTimeout(() => {
        twinkle.remove();
    }, 2000);
}

// Add CSS for twinkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1.5); }
    }
`;
document.head.appendChild(style);

// Create twinkles periodically
setInterval(createTwinkle, 500);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateSecretMode();
    }
});

function activateSecretMode() {
    addTerminalMessage('> 🎮 KONAMI CODE DETECTED!');
    addTerminalMessage('> Activating SECRET ALIEN MODE...');
    addTerminalMessage('> 👾 You have unlocked: HYPERDRIVE');
    
    // Add rainbow colors to all borders
    document.querySelectorAll('section').forEach((section, index) => {
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
        section.style.borderColor = colors[index % colors.length];
    });
    
    // Make UFO spin
    const ufo = document.querySelector('.ufo');
    ufo.style.animation = 'float 3s ease-in-out infinite, spin 2s linear infinite';
    
    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            from { transform: translateX(-50%) rotate(0deg); }
            to { transform: translateX(-50%) rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
}

// Initialize
console.log('%c👽 ALIEN PROTOCOL INITIATED', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the intergalactic network!', 'color: #ff00ff; font-size: 14px;');
console.log('%cTry the Konami code for a secret... 🎮', 'color: #00ffff; font-size: 12px;');

// Add initial terminal messages
setTimeout(() => {
    addTerminalMessage('> System initialized successfully');
}, 1500);

setTimeout(() => {
    addTerminalMessage('> Awaiting human interaction...');
}, 2500);
