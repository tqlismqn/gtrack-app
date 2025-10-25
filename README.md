# G-Track v2 — init main

This is an initial main commit to enable branch protection & PR checks.

## Deployment

### Vercel

The app is automatically deployed to Vercel on every push to `main` branch.

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist/gtrack-app/browser`
- Install Command: `npm install`
- Node Version: 20.x

**URLs:**
- Production: https://app.g-track.eu (or Vercel auto-generated)
- Preview: Auto-generated for each PR

**Environment Variables:**
No environment variables needed for production (API URL is in environment.production.ts)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Troubleshooting

**404 errors:**

- Check `vercel.json` exists with correct `outputDirectory`
- Verify `dist/gtrack-app/browser/index.html` exists after build
- Check Vercel deployment logs for build errors

**Build fails:**

- Run `npm run build` locally to test
- Check Node version (20.x required)
- Verify all dependencies installed

## Part 6: Alternative - Project Settings in Vercel Dashboard

If the above doesn't work, you may need to configure Vercel project settings manually:

**Go to Vercel Dashboard:**
1. Open: https://vercel.com/tqlismqn/gtrack-app/settings
2. Navigate to: **Build & Development Settings**
3. Set:
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `dist/gtrack-app/browser`
   - Install Command: `npm install`
4. Navigate to: **Environment Variables**
   - No variables needed (optional: add for future)
5. Click **Save**
6. Go to **Deployments** → Click **Redeploy** on latest

---

## [Testing After Deployment]

### Check Build Locally First

Before pushing to Vercel, test locally:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Check output
ls -la dist/gtrack-app/browser/
# Should see: index.html, main-*.js, styles-*.css, etc.

# Test locally
npx http-server dist/gtrack-app/browser -p 4200
# Open: http://localhost:4200
# Should see: Dashboard ✅
```

### After Vercel Deployment

1. Check deployment logs:
   ```
   https://vercel.com/tqlismqn/gtrack-app/deployments
   ```
   Look for:
   - ✅ Build succeeded
   - ✅ Output: dist/gtrack-app/browser
   - ✅ Files deployed
2. Test URLs:
   ```
   https://app.g-track.eu/
   https://app.g-track.eu/drivers
   ```
3. Check browser console (F12):
   - No 404 errors for JS/CSS files
   - API calls working

---

## [CI Acceptance — must be green]

- **gtrack-ci-v2 / node-build** ✅
- **gtrack-policy-v2** ✅

---

## [Deliverables]

### PR title

```
fix(vercel): add complete build configuration for Angular 20
```

### PR body

```markdown
## Docs updated
- Updated vercel.json with buildCommand and outputDirectory
- Added .vercelignore to optimize uploads
- Updated README.md with deployment documentation
- Configured for Angular 20's new application builder output structure

## Summary
Fixes 404 errors by properly configuring Vercel build settings for Angular 20.

**Problem:**
- Vercel didn't know where Angular outputs files
- Angular 20's new builder uses `dist/gtrack-app/browser` (not `dist/gtrack-app`)
- Build command not explicitly configured

**Solution:**
Updated `vercel.json` with:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/gtrack-app/browser",
  "framework": null
}
```

**Angular 20 Change:**
The new `@angular-devkit/build-angular:application` builder outputs to:

```
dist/gtrack-app/
  ├── browser/        ← Static files go here!
  │   ├── index.html
  │   ├── main-*.js
  │   └── ...
  └── server/         ← SSR files (if enabled)
```

**Testing Locally:**

```bash
npm run build
ls dist/gtrack-app/browser/
# Should see index.html and JS files

npx http-server dist/gtrack-app/browser
# Should work at http://localhost:8080
```

**After Deployment:**

- Dashboard loads: ✅
- Drivers page loads: ✅
- Direct navigation works: ✅
- Page refresh works: ✅

**Documentation:**

- Added deployment section to README
- Added troubleshooting guide
- Added manual deploy instructions

```

---

## [Notes]
- Angular 20 uses new application builder with different output structure
- The `/browser` subfolder is critical for Vercel to find files
- Framework preset set to `null` to use manual configuration
- This configuration works for all Angular 20+ apps on Vercel

---

## Output Expected
- Link to created PR in gtrack-app
- After merge, Vercel will redeploy with correct settings
- App should work within 2-3 minutes
- No more 404!
