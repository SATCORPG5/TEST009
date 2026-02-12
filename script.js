const skillData = {
    identity: {
        title: "01. CORE IDENTITY",
        content: "End-to-end problem solver bridging design, automation, and systems. Client-first concierge model: clarity → scope → execution → polish.",
        tags: ["RTX WORKFLOWS", "RAPID ITERATION", "SYSTEMS DESIGN"]
    },
    systems: {
        title: "04. SYSTEMS ARCHITECTURE",
        content: "Workflow mapping, AI-assisted production pipelines, and command architecture. Scalable service design and SOP creation.",
        tags: ["CLIENT INTAKE", "TOOLCHAIN OPTIMIZATION", "SOP CREATION"]
    },
    creative: {
        title: "06. AI-ENHANCED WORKFLOWS",
        content: "Prompt engineering, style-locked pipelines, and custom AI personas. Rapid concept iteration with human-led accountability.",
        tags: ["PROMPT ENG", "TASK AUTOMATION", "STYLE-LOCKED VISUALS"]
    },
    gamedev: {
        title: "07. WORLD BUILDING",
        content: "Real-time engine workflows (Unity/Unreal). HUD/UI systems for simulations, environment blockouts, and canon documentation.",
        tags: ["BLENDER", "UNREAL ENGINE", "MOBILE PROTOTYPING"]
    },
    broadcast: {
        title: "05. PULSΞ BROADCAST",
        content: "OBS scene architecture, HUD-style UI design, and creator-focused visual systems for high-fidelity live streaming.",
        tags: ["STREAM OVERLAYS", "LIVE BROADCAST KITS", "HUD DESIGN"]
    }
};

document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', () => {
        // Toggle Active State
        document.querySelector('.sidebar li.active').classList.remove('active');
        item.classList.add('active');

        // Update Content with "Glitch" feel
        const key = item.getAttribute('data-target');
        const data = skillData[key];
        
        const contentArea = document.getElementById('content-area');
        contentArea.style.opacity = 0;
        
        setTimeout(() => {
            contentArea.innerHTML = `
                <div class="module-header">
                    <h2>${data.title}</h2>
                    <hr>
                </div>
                <div class="grid-layout">
                    <div class="card">
                        <h3>CAPABILITIES</h3>
                        <p>${data.content}</p>
                    </div>
                </div>
                <div class="skill-tags">
                    ${data.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            `;
            contentArea.style.opacity = 1;
        }, 200);
    });
});

// Randomize Ping for realism
setInterval(() => {
    const ping = Math.floor(Math.random() * (20 - 11) + 11);
    document.getElementById('ping').innerText = `${ping}ms`;
}, 3000);
