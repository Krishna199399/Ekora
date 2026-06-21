# Git History Cleanup Guide

## 🔴 Problem: Git repository is 942 MB!

Your `.git` folder contains old large files in its history:
- `hostinger-final.zip` - 545 MB
- `hostinger-upload.zip` - 34 MB  
- `main-files.zip` - 34 MB
- Old unoptimized images - 2-3 MB each

These files are in Git history even though they're not in your current files.

---

## ⚠️ WARNING: This Will Rewrite Git History

This process is **irreversible** and will:
- Remove large files from ALL git history
- Change all commit hashes
- Require force-push if already pushed to remote
- Break existing clones (others need to re-clone)

**Only do this if:**
- ✅ You have a backup
- ✅ You're okay with rewriting history
- ✅ You can force-push to remote (or it's a local-only repo)

---

## 🚀 Solution: Remove Large Files from Git History

### Method 1: Using BFG Repo-Cleaner (Fastest, Recommended)

1. **Download BFG Repo-Cleaner:**
   - Visit: https://rtyley.github.io/bfg-repo-cleaner/
   - Download `bfg.jar`

2. **Backup your repo:**
   ```bash
   cd ..
   xcopy ekorr ekorr-backup /E /I /H
   cd ekorr
   ```

3. **Remove large files:**
   ```bash
   # Remove all ZIP files from history
   java -jar ../bfg.jar --delete-files "*.zip" .

   # Clean up
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

4. **Result**: Git repo will shrink from 942 MB to ~50-100 MB

---

### Method 2: Using git filter-repo (More Control)

1. **Install git-filter-repo:**
   ```bash
   pip install git-filter-repo
   ```

2. **Create analysis:**
   ```bash
   git filter-repo --analyze
   ```

3. **Remove specific large files:**
   ```bash
   # Remove the specific large files
   git filter-repo --path hostinger-final.zip --invert-paths
   git filter-repo --path hostinger-upload.zip --invert-paths
   git filter-repo --path main-files.zip --invert-paths
   ```

---

### Method 3: Manual with git filter-branch (Slowest, Not Recommended)

```bash
# Remove hostinger-final.zip from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch hostinger-final.zip" \
  --prune-empty --tag-name-filter cat -- --all

# Remove other zip files
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch hostinger-upload.zip main-files.zip" \
  --prune-empty --tag-name-filter cat -- --all

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

---

## 📊 Expected Results

| Step | Size Before | Size After | Savings |
|------|-------------|------------|---------|
| Current | 1.4 GB | - | - |
| After cleanup | 1.4 GB | ~500 MB | **900 MB** |

**Final project size: ~500 MB** ✅

---

## 🔄 If You Have a Remote Repository

After cleaning:

```bash
# Force push (DANGER: This rewrites remote history!)
git push origin --force --all
git push origin --force --tags
```

⚠️ **All team members must delete and re-clone the repo!**

---

## 🛡️ Alternative: Start Fresh (Easiest)

If you don't care about Git history:

```bash
# 1. Remove .git folder
Remove-Item -Recurse -Force .git

# 2. Create new repo
git init
git add .
git commit -m "Fresh start with optimized images"

# 3. Connect to remote (if needed)
git remote add origin <your-remote-url>
git push -u origin main --force
```

**Result**: Git repo will be ~50 MB (only current files, no history)

---

## 📋 Which Method Should You Choose?

| Method | When to Use | Pros | Cons |
|--------|-------------|------|------|
| **BFG Repo-Cleaner** | You want to keep history but remove large files | Fast, easy, keeps commits | Need Java |
| **git filter-repo** | You want fine control | Very flexible | Need Python |
| **Start Fresh** | You don't need history | Simplest, smallest size | Lose all history |

---

## 🎯 Recommendation

For your case, I recommend **"Start Fresh"** because:
- ✅ You'll save 900 MB immediately
- ✅ No complex tools needed
- ✅ Clean Git history without large files
- ✅ Simple and fast

---

## ✋ Prevent This in Future

Add to `.gitignore`:
```gitignore
*.zip
*.rar
*.7z
*.tar.gz
*.iso
```

Already in your `.gitignore`:
```gitignore
# Build outputs
.next/
out/

# Dependencies
node_modules/

# Large assets (add this)
*.zip
public_backup/
src/assets/
```

---

## Need Help?

Check current Git repo size:
```powershell
$size = (Get-ChildItem ".git" -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host ".git folder size: $([math]::Round($size, 2)) MB"
```

Find largest files in Git:
```bash
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | Where-Object {$_ -match '^blob'} | Sort-Object {[int]($_ -split '\s+')[2]} -Descending | Select-Object -First 20
```
