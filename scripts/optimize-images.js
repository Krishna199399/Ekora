const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const optimizedDir = path.join(__dirname, '../public_optimized');

// Create optimized directory
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let filesProcessed = 0;

console.log('🖼️  Starting image optimization...\n');

fs.readdirSync(publicDir).forEach(async (file) => {
  const filePath = path.join(publicDir, file);
  
  // Skip if not an image or if it's a directory
  if (!fs.statSync(filePath).isFile()) return;
  if (!file.match(/\.(png|jpg|jpeg)$/i)) return;

  const originalStats = fs.statSync(filePath);
  totalOriginalSize += originalStats.size;

  try {
    const outputPath = path.join(optimizedDir, file);
    
    // Optimize based on file type
    if (file.match(/\.png$/i)) {
      await sharp(filePath)
        .resize(1920, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({ 
          quality: 85,
          compressionLevel: 9,
          palette: true
        })
        .toFile(outputPath);
    } else {
      await sharp(filePath)
        .resize(1920, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ 
          quality: 85,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
    }

    const optimizedStats = fs.statSync(outputPath);
    totalOptimizedSize += optimizedStats.size;
    filesProcessed++;

    const savings = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
    const originalSizeMB = (originalStats.size / 1024 / 1024).toFixed(2);
    const optimizedSizeMB = (optimizedStats.size / 1024 / 1024).toFixed(2);

    console.log(`✅ ${file}`);
    console.log(`   ${originalSizeMB} MB → ${optimizedSizeMB} MB (${savings}% reduction)\n`);

  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

// Wait a bit for async operations to complete
setTimeout(() => {
  console.log('\n========================================');
  console.log('📊 Optimization Summary');
  console.log('========================================');
  console.log(`Files processed: ${filesProcessed}`);
  console.log(`Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB (${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log('\n✨ Optimized images are in /public_optimized folder');
  console.log('📝 Review them, then replace /public with /public_optimized');
}, 5000);
