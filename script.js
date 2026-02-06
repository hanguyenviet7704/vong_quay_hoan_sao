// Configuration prize list with image mapping
// Harmonized Palette: Deep Rich Red (#B71C1C) & Premium Cream (#FFF9C4)
const prizes = [
    { text: "x2 Combo\nQuà Tặng", type: "text", color: "#B71C1C", textColor: "#FBC02D", img: "gift_combo.png" },
    { text: "x2 Thay Dầu\nMiễn Phí", type: "text", color: "#FFF9C4", textColor: "#B71C1C", img: "oil_bottle_gold.png" },
    { text: "x2 Thay Pin\nSmart Key", type: "text", color: "#B71C1C", textColor: "#FBC02D", img: "smart_key_fob.png" },
    { text: "Rửa Xe\nMiễn Phí", type: "text", color: "#FFF9C4", textColor: "#B71C1C", img: "vinfast_vf3.png" },
    { text: "Dán Nilong\nXe Free", type: "text", color: "#B71C1C", textColor: "#FBC02D", img: "vinfast_scooter.png" },
    { text: "Lì Xì\n50k-100k", type: "text", color: "#FFF9C4", textColor: "#D50000", img: "red_envelope.png" }, // Highlighted text
    { text: "Nước Làm Mát\nXe Máy", type: "text", color: "#B71C1C", textColor: "#FBC02D", img: "oil_bottle_gold.png" }
];

const segments = prizes.length;
const arc = Math.PI * 2 / segments;
let startAngle = 0;

// Advanced Background Effects
function createBackgroundEffects() {
    const container = document.getElementById('effects-layer');
    if (!container) return;
    container.innerHTML = ''; // Rest logic

    // 1. Floating Bokeh Orbs (Large, Blur)
    const orbCount = 15;
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'bokeh-orb';
        const size = Math.random() * 100 + 50; // 50-150px
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        orb.style.left = Math.random() * 100 + 'vw';
        orb.style.animationDuration = (Math.random() * 15 + 15) + 's'; // 15-30s
        orb.style.animationDelay = -(Math.random() * 20) + 's';
        container.appendChild(orb);
    }

    // 2. Twinkling Sparkles (Small, Gold/White)
    const sparkleCount = 30;
    for (let i = 0; i < sparkleCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'sparkle';
        spark.style.left = Math.random() * 100 + 'vw';
        spark.style.top = Math.random() * 100 + 'vh';
        spark.style.animationDelay = (Math.random() * 3) + 's';
        container.appendChild(spark);
    }

    // 3. Falling Snow / Gold Dust
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'falling-particle';

        // Randomize
        const isGold = Math.random() > 0.8; // Mostly snow, some gold
        const size = Math.random() * 4 + 2; // 2-6px

        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.backgroundColor = isGold ? '#FFD54F' : '#ffffff';
        p.style.boxShadow = isGold ? "0 0 4px #FFD54F" : "0 0 4px white";
        p.style.left = Math.random() * 100 + 'vw';
        p.style.opacity = Math.random() * 0.5 + 0.3;

        // Animation
        const duration = Math.random() * 8 + 7; // 7-15s
        const delay = Math.random() * 5;

        p.style.animation = `fallDown ${duration}s linear infinite -${delay}s`;

        container.appendChild(p);
    }

    // Inject keyframes
    if (!document.getElementById('bg-anim-style')) {
        const style = document.createElement('style');
        style.id = 'bg-anim-style';
        style.innerHTML = `
            @keyframes fallDown {
                0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
                10% { opacity: 0.8; }
                100% { transform: translateY(110vh) translateX(${Math.random() * 40 - 20}px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

createBackgroundEffects();

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const wheelContainer = document.querySelector('.wheel-container');
const wheelWrapper = document.querySelector('.wheel-wrapper');

// Popup elements
const popup = document.getElementById('prizePopup');
const popupPrizeName = document.getElementById('prizeName');
const popupPrizeImage = document.getElementById('prizeImage');
const closePopupBtn = document.getElementById('closePopup');

function drawWheel() {
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rotate canvas to start from top
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(-Math.PI / 2);

    for (let i = 0; i < segments; i++) {
        const angle = startAngle + i * arc;
        const prize = prizes[i];

        // Draw Segment
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, angle, angle + arc);
        ctx.lineTo(0, 0);

        // Rich Gradient Fill
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);

        if (prize.color === '#FFF9C4') { // Cream Segment
            grd.addColorStop(0, '#FFFFFF'); // Center bright
            grd.addColorStop(0.6, '#FFF9C4'); // Cream body
            grd.addColorStop(1, '#FBC02D'); // Gold edge
        } else { // Red Segment
            grd.addColorStop(0, '#E53935'); // Lighter Red Center
            grd.addColorStop(0.7, '#B71C1C'); // Deep Red
            grd.addColorStop(1, '#7f0000'); // Darkest edge
        }

        ctx.fillStyle = grd;
        ctx.fill();

        // Add Glassy Shine (Top half reflection)
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();

        // Stroke
        ctx.strokeStyle = '#FFD54F'; // Soft Gold Border
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw Text
        ctx.save();
        ctx.translate(Math.cos(angle + arc / 2) * (radius * 0.65), Math.sin(angle + arc / 2) * (radius * 0.65));
        ctx.rotate(angle + arc / 2 + Math.PI);

        // Text Shadow
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        // Text
        ctx.fillStyle = prize.textColor;
        ctx.font = "900 19px 'Roboto', sans-serif";
        ctx.textAlign = "center";

        const lines = prize.text.split('\n');
        lines.forEach((line, idx) => {
            ctx.fillText(line, 0, idx * 24 - (lines.length - 1) * 12 + 5);
        });

        ctx.restore();
    }
    ctx.restore();
}

function initLights() {
    const wrapper = document.querySelector('.wheel-wrapper');
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';

    const radius = wrapper.offsetWidth / 2 - 10;
    const count = 20;

    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        const angle = (i / count) * 2 * Math.PI;

        const offset = 222;
        const left = 230 + offset * Math.cos(angle) - 6;
        const top = 230 + offset * Math.sin(angle) - 6;

        dot.className = 'light-bulb-js';
        dot.style.position = 'absolute';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = (i % 2 === 0) ? '#fff' : '#ffd700';
        dot.style.boxShadow = `0 0 10px ${dot.style.backgroundColor}`;
        dot.style.left = `${left}px`;
        dot.style.top = `${top}px`;
        dot.style.animation = `blinkLights 1s infinite ${i % 2 === 0 ? '0s' : '0.5s'}`;

        container.appendChild(dot);
    }

    if (!document.getElementById('light-anim-style')) {
        const style = document.createElement('style');
        style.id = 'light-anim-style';
        style.innerHTML = `
            @keyframes blinkLights {
                0%, 100% { opacity: 1; transform: scale(1.2); }
                50% { opacity: 0.4; transform: scale(1); }
            }
         `;
        document.head.appendChild(style);
    }

    wrapper.appendChild(container);
}

drawWheel();
setTimeout(initLights, 100);

// Close Popup
closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

// Spin Logic
let isSpinning = false;
let currentRotation = 0;

spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.style.filter = "grayscale(0.5)";

    const winningIndex = Math.floor(Math.random() * segments);
    const prize = prizes[winningIndex];

    // Calculate rotation
    const segmentAngleDeg = 360 / segments;
    const currentSegmentPos = -90 + (winningIndex * segmentAngleDeg) + (segmentAngleDeg / 2);
    let rotationNeeded = 90 - currentSegmentPos;

    const fullSpins = 5 + Math.floor(Math.random() * 5);

    const targetRotationMod = (rotationNeeded % 360 + 360) % 360;
    const currentMod = currentRotation % 360;
    const distance = targetRotationMod - currentMod + (360 * fullSpins);

    const finalDist = distance > 0 ? distance : distance + 360;

    currentRotation += finalDist;

    wheelContainer.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        spinBtn.disabled = false;
        spinBtn.style.filter = "none";

        // Show Popup
        showPopup(prize);
        fireConfetti();
    }, 5000);
});

function showPopup(prize) {
    const cleanName = prize.text.replace(/\n/g, ' ');
    popupPrizeName.textContent = cleanName;
    popupPrizeImage.src = prize.img || "red_envelope.png";
    popup.classList.remove('hidden');
}

function fireConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';

    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#ffd700'];

    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'absolute';
        conf.style.width = '10px';
        conf.style.height = '10px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.left = Math.random() * 100 + '%';
        conf.style.top = '-10px';
        conf.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
        container.appendChild(conf);
    }

    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.innerHTML = `
            @keyframes fall {
                to { transform: translateY(500px) rotate(720deg); opacity: 0; }
            }
         `;
        document.head.appendChild(style);
    }
}
