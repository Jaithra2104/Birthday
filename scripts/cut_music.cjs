const MP3Cutter = require('mp3-cutter');
const fs = require('fs');
const path = require('path');

const musicDir = path.join(__dirname, '..', 'music');
const outputDir = path.join(__dirname, '..', 'public', 'music');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Cut Ammaadi.mp3 (e.g., from 01:00 to 01:40)
MP3Cutter.cut({
    src: path.join(musicDir, 'Ammaadi.mp3'),
    target: path.join(outputDir, 'Ammaadi_cut.mp3'),
    start: 60,
    end: 100
});

// Cut Samayama.mp3 (e.g., from 01:00 to 01:40)
MP3Cutter.cut({
    src: path.join(musicDir, 'Samayama.mp3'),
    target: path.join(outputDir, 'Samayama_cut.mp3'),
    start: 60,
    end: 100
});

console.log('Successfully cut MP3 files!');
