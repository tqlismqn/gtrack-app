# G-Track Frontend Deployment Guide

## Vercel Configuration

### Build Settings
- **Framework**: None (manual configuration)
- **Build Command**: `npm run build -- --configuration production`
- **Output Directory**: `dist/gtrack-app/browser`
- **Install Command**: `npm install`
- **Node Version**: 20.x

### Files Structure After Build
```

dist/gtrack-app/
└── browser/          ← This is the output directory
├── index.html
├── main-*.js
├── polyfills-*.js
├── styles-*.css
├── assets/
├── _headers
└── _redirects

```
### Configuration Files
- `vercel.json` - Main Vercel configuration
- `public/_headers` - HTTP headers configuration
- `public/_redirects` - SPA routing redirects

## Local Testing

### Test Production Build
```bash
# Build for production
npm run build:prod

# Verify output
ls -la dist/gtrack-app/browser/

# Should see:
# - index.html
# - main-*.js
# - styles-*.css
# - assets/
# - _headers
# - _redirects

# Test locally
npm run serve:dist

# Open: http://localhost:4200
# Test routes:
# - / (Dashboard)
# - /drivers (Drivers list)
```

## Troubleshooting

### 404 Errors

1. Check Vercel build logs
1. Verify `dist/gtrack-app/browser/index.html` exists
1. Check `outputDirectory` in `vercel.json`
1. Ensure `_redirects` file is in build output

### Build Failures

1. Run `npm run build:prod` locally
1. Check for TypeScript errors
1. Verify all dependencies installed
1. Check Node version (20.x required)

### Routes Not Working

1. Verify `vercel.json` has rewrite rules
1. Check `_redirects` file exists in output
1. Clear browser cache
1. Check Vercel deployment logs

## Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

## Automatic Deployment

- **Trigger**: Push to `main` branch
- **Duration**: ~2-3 minutes
- **URL**: https://app.g-track.eu (or auto-generated)

## Monitoring

- **Vercel Dashboard**: https://vercel.com/tqlismqn/gtrack-app
- **Deployments**: https://vercel.com/tqlismqn/gtrack-app/deployments
- **Analytics**: https://vercel.com/tqlismqn/gtrack-app/analytics

```
---
