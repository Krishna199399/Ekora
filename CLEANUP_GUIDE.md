# Project Size Cleanup Guide

## Current Size: 3.24 GB
## Target Size: ~600 MB

### Issues Found:

1. **Build Cache (.next)**: 976 MB - Can be deleted
2. **Static Export (out)**: 426 MB - Can be deleted  
3. **Duplicate Images**: ~550 MB - Images exist in both /public and /src/assets
4. **Large Images**: 289 MB in public folder alone (199 files)

---

## Step 1: Clean Build Outputs (Saves ~1.4 GB)

Run these commands to remove build cache:

```bash
# Remove Next.js build cache
rmdir /s /q .next

# Remove static export output
rmdir /s /q out

# Rebuild when needed
npm run build
```

**These folders are auto-generated and should NOT be committed to git.**

---

## Step 2: Remove Duplicate Images (Saves ~275 MB)

You have duplicate images in:
- `/public` folder (199 images, 289 MB)
- `/src/assets` folder (169 images, 275 MB)

**Recommendation**: Keep only `/public` folder for Next.js static assets.

To remove duplicates from src/assets:
```bash
rmdir /s /q src\assets
```

Then update any imports in your code from:
```jsx
import img from '../assets/image.png'
```
To:
```jsx
const img = '/image.png'
```

---

## Step 3: Optimize Images (Saves ~200+ MB)

Your images are unoptimized. Install and use image optimization:

```bash
npm install sharp
```

Create a script to optimize images:

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

fs.readdirSync(publicDir).forEach(file => {
  if (file.match(/\.(png|jpg|jpeg)$/)) {
    sharp(path.join(publicDir, file))
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(path.join(publicDir, 'optimized_' + file));
  }
});
```

Or use Next.js Image component which auto-optimizes:
```jsx
import Image from 'next/image'
<Image src="/image.png" width={500} height={300} alt="..." />
```

---

## Step 4: Add Cleanup Scripts to package.json

```json
{
  "scripts": {
    "clean": "rmdir /s /q .next && rmdir /s /q out",
    "clean:all": "rmdir /s /q .next && rmdir /s /q out && rmdir /s /q node_modules"
  }
}
```

---

## Expected Results After Cleanup:

| Folder | Before | After | Savings |
|--------|--------|-------|---------|
| .next | 976 MB | 0 MB | 976 MB |
| out | 426 MB | 0 MB | 426 MB |
| src/assets | 276 MB | 0 MB | 276 MB |
| public | 289 MB | ~80 MB | ~200 MB (after optimization) |
| **TOTAL** | **3.24 GB** | **~600 MB** | **~2.6 GB** |

---

## Quick Start:

1. **Immediate cleanup** (removes build files):
   ```bash
   rmdir /s /q .next
   rmdir /s /q out
   ```

2. **Remove duplicate images**:
   ```bash
   rmdir /s /q src\assets
   ```

3. **Optimize remaining images** using sharp or Next.js Image component

4. **Always run `npm run clean` before committing to git**

---

## Note:
The .gitignore already excludes .next and out folders, so they won't be tracked by git. Just make sure to clean them locally to reduce project size.
