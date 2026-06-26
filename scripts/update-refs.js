const fs = require('fs');
const path = require('path');

const sessionsFile = path.join(__dirname, '../src/data/sessions.ts');
const pageFile = path.join(__dirname, '../src/app/page.tsx');

let sessionsContent = fs.readFileSync(sessionsFile, 'utf8');
sessionsContent = sessionsContent.replace(/\.jpg"/g, '.webp"').replace(/\.png"/g, '.webp"');
fs.writeFileSync(sessionsFile, sessionsContent);

let pageContent = fs.readFileSync(pageFile, 'utf8');
pageContent = pageContent.replace(/\/hero\.jpg/g, '/hero.webp').replace(/\/gear\.jpg/g, '/gear.webp');
fs.writeFileSync(pageFile, pageContent);

console.log('References updated successfully.');
