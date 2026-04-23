const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 630;

// 1. Background
const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#0a1628');
gradient.addColorStop(1, '#050d18');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1200, 630);

// Subtle map texture (simulated)
ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
ctx.lineWidth = 1;
for (let i = 0; i < 1200; i += 40) {
  ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 630); ctx.stroke();
}
for (let i = 0; i < 630; i += 40) {
  ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1200, i); ctx.stroke();
}

// 2. Logo (Placeholder for the real asset)
ctx.fillStyle = 'white';
ctx.font = '900 40px Arial'; // Using Arial as a safe fallback
ctx.fillText('CoRoam', 60, 80); 
// Note: In a real design tool I'd use the provided logo-mark.png or the wordmark

// 3. Headline
ctx.fillStyle = 'white';
ctx.font = '900 72px Arial';
const headline = "Stop navigating.";
const headline2 = "Start roaming.";
ctx.fillText(headline, 60, 240);
ctx.fillText(headline2, 60, 320);

// 4. Subheadline
ctx.fillStyle = '#94a3b8'; // text-zinc-400
ctx.font = '300 24px Arial';
const wrapText = (text, x, y, maxWidth, lineHeight) => {
  const words = text.split(' ');
  let line = '';
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
};
wrapText("Swap the shortest route for the most interesting one. Receive neural nudges toward the city's best hidden gems.", 60, 380, 500, 32);

// 5. Mockups (Right Side)
// Representing the two phones with glowing rectangles
ctx.shadowBlur = 40;
ctx.shadowColor = 'rgba(10, 132, 255, 0.3)';
ctx.fillStyle = '#111827';
// Phone 1
ctx.roundRect(650, 80, 240, 480, 40);
ctx.fill();
// Phone 2
ctx.roundRect(920, 120, 240, 480, 40);
ctx.fill();
ctx.shadowBlur = 0;

// Save to disk
const fs = require('fs');
const out = fs.createWriteStream('/Users/gracebressner/documents/coroam-web/public/og-share-draft.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
