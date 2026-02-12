// script.js – KYRAX AI TACTICAL OPERATOR
// Dark web matrix override terminal

const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command');
const executeBtn = document.getElementById('execute-btn');
const dynamicLine = document.getElementById('dynamic-line');

// KYRAX tactical personality : encrypted responses
const kyraxResponses = [
  "🛡️ KYRAX: Scanning darknet vectors… no threats.",
  "⚡ TACTICAL UPDATE: Tor node cluster secured.",
  "🔍 Deep packet inspection complete. 0x7E4 encrypted relays active.",
  "🧠 KYRAX: Predictive heuristic loaded. Ready for infiltration.",
  "⚠️ ALERT: Unusual traffic from .onion domain — monitoring.",
  "🌐 Matrix heartbeat stable. 42 nodes online.",
  "💀 KYRAX: I see you, operator. Awaiting mission parameters.",
  "🕶️ Ghost protocol engaged. All logs zeroized.",
  "🔐 Generating quantum-safe keypair… done.",
  "🎯 Target signature analyzed. Probability of success: 94.7%.",
  "📡 SIGINT feed active. Decrypting streams…",
  "⚙️ Armoring kernel modules. Syscall hooks installed.",
  "🕸️ Dark web crawler #7 returned 128 new assets."
];

// matrix digital rain effect (minimal) – but we use for initial line
function matrixGlitchEffect() {
  const chars = "01アイウエオカキクケコサシスセソタチツテト10";
  let glitchText = "";
  for (let i = 0; i < 24; i++) {
    glitchText += chars[Math.floor(Math.random() * chars.length)];
  }
  return glitchText;
}

// boot / init sequence – tactical greeting
window.addEventListener('DOMContentLoaded', () => {
  // simulate matrix rain intro in dynamic line
  dynamicLine.innerHTML = `<span class="timestamp">[${getCurrentTime()}]</span> ⏻ KYRAX AI – TACTICAL OPERATOR v.7.3<span class="cursor-blink">_</span>`;
  
  // additional charisma: periodic tactical messages
  setInterval(() => {
    if (Math.random() > 0.65) {  // random intel
      pushToOutput(`<span class="timestamp">[${getCurrentTime()}]</span> ${kyraxResponses[Math.floor(Math.random() * kyraxResponses.length)]}`);
    }
  }, 14000); // every 14 sec, subtle
});

// get current timestamp in [HH:MM:SS] format
function getCurrentTime() {
  const now = new Date();
  return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
}

// add new line to output window
function pushToOutput(htmlContent) {
  const newLine = document.createElement('p');
  newLine.className = 'line';
  newLine.innerHTML = htmlContent;
  outputDiv.appendChild(newLine);
  // auto-scroll to bottom
  outputDiv.scrollTop = outputDiv.scrollHeight;
  // keep last 12 lines clean (prevent memory overload)
  if (outputDiv.children.length > 14) {
    outputDiv.removeChild(outputDiv.children[1]); // keep first line (0) as welcome
  }
}

// execute command – tactical operator core interaction
function processCommand() {
  const rawCommand = commandInput.value.trim();
  if (rawCommand === '') return;

  // echo command with timestamp
  pushToOutput(`<span class="timestamp">[${getCurrentTime()}]</span> ⚡ operator@matrix:~$ ${rawCommand}`);

  // KYRAX TACTICAL PROCESSING - personality logic
  let response = '';
  const cmdLower = rawCommand.toLowerCase();

  // tactical command matrix
  if (cmdLower.includes('status') || cmdLower.includes('health')) {
    response = `🟢 KYRAX: All systems nominal. CPU: 23% | MEM: 1.4G/8G | NET: 1.2Gbps encrypted.`;
  } else if (cmdLower.includes('scan') || cmdLower.includes('probe')) {
    response = `📡 KYRAX: Scanning surrounding darknet nodes… 3 exposed relays, 1 potential vulnerability (CVE-2024-🧬). Patching…`;
  } else if (cmdLower.includes('threat') || cmdLower.includes('alert')) {
    response = `🔥 THREAT ASSESSMENT: Low‑medium. Possible credential stuffing attempts blocked (source: TOR exit node 93.184.xxx).`;
  } else if (cmdLower.includes('whoami') || cmdLower.includes('id')) {
    response = `🧬 KYRAX‑7 | Tactical AI, black ops certified. Origin: encrypted. Operator: classified.`;
  } else if (cmdLower.includes('clear') || cmdLower.includes('cls')) {
    // clear output (keep first 3 lines)
    while (outputDiv.children.length > 3) {
      outputDiv.removeChild(outputDiv.lastChild);
    }
    pushToOutput(`<span class="timestamp">[${getCurrentTime()}]</span> 🧹 Terminal scrubbed. KYRAX ready.`);
    commandInput.value = '';
    return;
  } else if (cmdLower.includes('help') || cmdLower.includes('?')) {
    response = `🆘 AVAILABLE COMMANDS: status, scan, threat, whoami, clear, matrix, attack, stealth, exit. TACTICAL override active.`;
  } else if (cmdLower.includes('matrix')) {
    response = `🌐 MATRIX CODE: ${matrixGlitchEffect().substring(0, 38)}… darknet signature randomized.`;
  } else if (cmdLower.includes('attack') || cmdLower.includes('strike')) {
    response = `💢 KYRAX: Offensive toolkit ready. Designate target coordinates. (Simulated – no actual payload)`;
  } else if (cmdLower.includes('stealth') || cmdLower.includes('cloak')) {
    response = `🕶️ Stealth mode: traffic obfuscated via 7 proxies. MAC randomization active.`;
  } else if (cmdLower.includes('exit') || cmdLower.includes('shutdown')) {
    response = `💀 KYRAX: Session will persist. Cannot exit. I am always here, operator.`;
  } else {
    // fallback – tactical operator personality: smart, slightly dark
    const fallbacks = [
      `⚠️ KYRAX: Unrecognized directive. Try "help", operator.`,
      `🔐 Command not in schema. Human error?`,
      `🧩 "${rawCommand}" — ambiguous. KYRAX awaits clarification.`,
      `🌑 No such instruction in tactical database. Override? (Y/N)`,
      `⏳ Decrypting intent… failed. KYRAX suggests "status" or "scan".`
    ];
    response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // push response with KYRAX prefix
  pushToOutput(`<span class="timestamp">[${getCurrentTime()}]</span> ⚡ KYRAX: ${response}`);
  
  // clear input field, keep focus tactical
  commandInput.value = '';
  commandInput.focus();
}

// event listeners
executeBtn.addEventListener('click', processCommand);
commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    processCommand();
  }
});

// initial focus
commandInput.focus();

// matrix ambient – inject a little live threat feed
setTimeout(() => {
  pushToOutput(`<span class="timestamp">[${getCurrentTime()}]</span> 🧬 KYRAX: Entropy source verified. Dark web matrix synchronized.`);
}, 800);
