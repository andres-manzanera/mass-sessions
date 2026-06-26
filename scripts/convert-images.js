const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');

async function convertImages() {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) {
      const filePath = path.join(publicDir, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const newFilePath = path.join(publicDir, `${baseName}.webp`);
      
      console.log(`Converting ${file} to ${baseName}.webp...`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(newFilePath);
        console.log(`Success: ${baseName}.webp`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convertImages();
