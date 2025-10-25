# G-Track v2 — init main

This is an initial main commit to enable branch protection & PR checks.

## Deployment

This app is deployed on [Vercel](https://vercel.com).

**Production URL**: https://app.g-track.eu

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deploy

```bash
# Build and test locally
npm run build:prod
npm run serve:dist

# Deploy (requires Vercel CLI)
vercel --prod
```

## Troubleshooting

### API Connection Issues

**"Failed to load drivers" error:**

1. **Test API directly:**
   Open: https://gtrack-backend-gtrack-backend-lnf9mi.laravel.cloud/api/v0/health
   
   Should see:
   ```json
   {
     "status": "ok",
     "version": "0.1.0"
   }
```

1. **Test in app:**
- Open: https://app.g-track.eu/drivers
- Click “Test API” button
- Check browser console (F12)
1. **Check CORS:**
   Open test tool: https://app.g-track.eu/assets/test-api.html
- Click “Test CORS”
- Should see CORS headers
1. **Check browser console:**
- F12 → Console tab
- Look for:
  - 🔵 API Request logs
  - ✅ Success or ❌ Error logs
  - Full error details

**Common issues:**

- **CORS Error** (Status: 0)
  - Backend CORS not configured
  - Check backend config/cors.php
- **404 Not Found**
  - Wrong API URL
  - Check src/environments/environment.production.ts
- **Network Error**
  - Backend down
  - Check Laravel Cloud deployment

```
---

## [Testing Instructions]

### After Deployment

1. **Open app:**
```

https://app.g-track.eu/drivers

```
2. **Click "Test API" button**
- Should show alert with success/error

3. **Open Browser Console (F12)**
- Should see detailed logs:
  - 🚀 Environment loaded
  - 📡 API URL
  - 🔵 API Request logs
  - ✅ Success or ❌ Error details

4. **Open test tool:**
```

https://app.g-track.eu/assets/test-api.html

```
- Test Health ✅
- Test Drivers ✅
- Test CORS ✅

---

## [CI Acceptance — must be green]

- **gtrack-ci-v2 / node-build** ✅
- **gtrack-policy-v2** ✅

---

## [Deliverables]

### PR title
```

fix(api): add comprehensive diagnostics and error handling

```
### PR body
```markdown
## Docs updated
- Added detailed console logging for API requests
- Added error handling with specific error types
- Created Test API button for manual testing
- Added standalone API test tool
- Updated README with troubleshooting guide

## Summary
Adds comprehensive diagnostics to identify and fix API connection issues.

**New Features:**

1. **Console Logging:**
   - Every API request logged
   - Full URLs shown
   - Error details displayed
   - CORS errors detected

2. **Test API Button:**
   - Manual API testing
   - Shows success/error alerts
   - Detailed console logs

3. **Standalone Test Tool:**
   - Available at: /assets/test-api.html
   - Tests Health endpoint
   - Tests Drivers endpoint
   - Tests CORS headers

4. **Better Error Messages:**
   - "Failed to load drivers" now includes details
   - Browser console shows exact error
   - Retry button available

**Testing:**
After deployment, open browser console and see:
```

🚀 Production Environment Loaded
📡 API URL: https://gtrack-backend…/api/v0
🔵 API Request: GET /drivers
✅ Drivers loaded: 25 drivers

```
If errors:
```

❌ CORS or Network Error - Backend not reachable

```
**Troubleshooting:**
1. Check browser console for detailed logs
2. Click "Test API" button
3. Open /assets/test-api.html
4. Follow README troubleshooting guide
```

-----

## Output Expected

- Link to created PR in gtrack-app
- After merge and deployment
- Open app and check browser console
- See detailed diagnostic logs
- Identify exact issue preventing API calls
