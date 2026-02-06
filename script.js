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
    container.innerHTML = ''; // Reset

    // 1. Floating Bokeh Orbs (Large, Blur) - Rising effect
    const orbCount = 12;
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'bokeh-orb';
        const size = Math.random() * 80 + 40; // 40-120px
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        orb.style.left = Math.random() * 100 + 'vw';
        orb.style.animationDuration = (Math.random() * 15 + 15) + 's';
        orb.style.animationDelay = -(Math.random() * 20) + 's';
        container.appendChild(orb);
    }

    // 2. Twinkling Sparkles (Stars effect)
    const sparkleCount = 40;
    for (let i = 0; i < sparkleCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'sparkle';
        spark.style.left = Math.random() * 100 + 'vw';
        spark.style.top = Math.random() * 100 + 'vh';
        spark.style.animationDelay = (Math.random() * 3) + 's';
        spark.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(spark);
    }

    // 3. Falling Snow / Gold Dust
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'falling-particle';
        const isGold = Math.random() > 0.7;
        const size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.backgroundColor = isGold ? '#FFD54F' : '#ffffff';
        p.style.boxShadow = isGold ? "0 0 6px #FFD54F" : "0 0 4px white";
        p.style.left = Math.random() * 100 + 'vw';
        p.style.opacity = Math.random() * 0.5 + 0.4;
        const duration = Math.random() * 8 + 7;
        const delay = Math.random() * 5;
        p.style.animation = `fallDown ${duration}s linear infinite -${delay}s`;
        container.appendChild(p);
    }

    // 4. Rising Golden Bubbles (from bottom)
    const bubbleCount = 20;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'rising-bubble';
        const size = Math.random() * 15 + 8;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDuration = (Math.random() * 10 + 10) + 's';
        bubble.style.animationDelay = -(Math.random() * 15) + 's';
        container.appendChild(bubble);
    }

    // 5. Shooting Stars (occasional)
    const starCount = 5;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = Math.random() * 50 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDelay = (Math.random() * 10 + i * 3) + 's';
        container.appendChild(star);
    }

    // 6. Floating Lanterns (small glowing squares)
    const lanternCount = 8;
    for (let i = 0; i < lanternCount; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'floating-lantern';
        lantern.style.left = Math.random() * 100 + 'vw';
        lantern.style.animationDuration = (Math.random() * 20 + 25) + 's';
        lantern.style.animationDelay = -(Math.random() * 20) + 's';
        container.appendChild(lantern);
    }

    // Inject all keyframes
    if (!document.getElementById('bg-anim-style')) {
        const style = document.createElement('style');
        style.id = 'bg-anim-style';
        style.innerHTML = `
            @keyframes fallDown {
                0% { transform: translateY(-10vh) translateX(0); opacity: 0; }
                10% { opacity: 0.8; }
                100% { transform: translateY(110vh) translateX(30px); opacity: 0; }
            }
            @keyframes riseUp {
                0% { transform: translateY(110vh) scale(0.5); opacity: 0; }
                20% { opacity: 0.6; }
                80% { opacity: 0.6; }
                100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
            }
            @keyframes shootStar {
                0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 0; width: 0; }
                10% { opacity: 1; width: 80px; }
                100% { transform: translateX(-300px) translateY(150px) rotate(-45deg); opacity: 0; width: 0; }
            }
            @keyframes floatLantern {
                0% { transform: translateY(110vh) translateX(0) rotate(-5deg); opacity: 0; }
                10% { opacity: 0.8; }
                50% { transform: translateY(50vh) translateX(30px) rotate(5deg); }
                90% { opacity: 0.8; }
                100% { transform: translateY(-20vh) translateX(-20px) rotate(-5deg); opacity: 0; }
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

    // Random winning segment
    const winningIndex = Math.floor(Math.random() * segments);
    const prize = prizes[winningIndex];

    console.log("Winning Index:", winningIndex, "Prize:", prize.text);

    // Calculate rotation
    // Pointer is on the RIGHT (0 degrees)
    // Canvas draws segment 0 at the TOP (rotated by -90 degrees)
    // Each segment spans (360 / segments) degrees

    const segmentAngleDeg = 360 / segments;

    // Segment i's center is originally at: -90 + i*segmentAngle + segmentAngle/2
    const segmentCenterAngle = -90 + (winningIndex * segmentAngleDeg) + (segmentAngleDeg / 2);

    // To bring segment to 0 degrees (right side), total rotation needed is:
    const targetTotalRotation = -segmentCenterAngle;

    // Normalize target to 0-360 range
    const targetMod = ((targetTotalRotation % 360) + 360) % 360;

    // Current rotation normalized
    const currentMod = ((currentRotation % 360) + 360) % 360;

    // How much MORE we need to spin from current position to reach target
    let additionalRotation = targetMod - currentMod;

    // Ensure we spin forward (positive direction) by at least some amount
    if (additionalRotation <= 0) {
        additionalRotation += 360;
    }

    // Add 5-10 full spins for dramatic effect
    const fullSpins = 5 + Math.floor(Math.random() * 5);
    additionalRotation += fullSpins * 360;

    // Apply the rotation
    currentRotation += additionalRotation;

    console.log("Target:", targetMod, "Current:", currentMod, "Additional:", additionalRotation, "Final:", currentRotation);

    wheelContainer.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        spinBtn.disabled = false;
        spinBtn.style.filter = "none";

        // Show Popup with the pre-determined prize
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
