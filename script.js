// --- Matrix Rain Effect ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF41";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// --- KYRAX Tactical Logic ---
const input = document.getElementById('user-input');
const log = document.getElementById('output-log');

const responses = {
    "status": "Sensors nominal. Perimeter secure. No threats detected in the local sector.",
    "mission": "Objective: Data extraction and infiltration. Readiness: 100%.",
    "target": "Scanning... Multiple vulnerabilities identified. Ready to strike on your command.",
    "default": "Command unrecognized. Stick to the protocol, Operator."
};

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.toLowerCase().trim();
        appendLine(`> ${cmd}`, 'system-msg');
        
        setTimeout(() => {
            const reply = responses[cmd] || responses["default"];
            appendLine(`KYRAX: ${reply}`, 'kyrax-msg');
        }, 400);

        input.value = '';
    }
});

function appendLine(text, className) {
    const p = document.createElement('p');
    p.className = className;
    p.textContent = text;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}
