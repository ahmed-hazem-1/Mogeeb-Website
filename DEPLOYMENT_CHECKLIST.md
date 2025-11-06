# 🚀 Deployment & Testing Checklist

## Pre-Deployment Checklist

### Configuration Review
- [ ] `.env.local` contains test webhook URL: `https://mogeeb.shop/webhook-test/...`
- [ ] `.env.example` documents both test and production URLs
- [ ] No sensitive data in source code
- [ ] `.env.local` is in `.gitignore`

### Code Review
- [ ] `src/app/api/chat/route.ts` makes single call (not double)
- [ ] `netlify/functions/chat.js` makes single call
- [ ] Both files use `extractResponse()` helper
- [ ] Both files have comprehensive logging
- [ ] Response parsing logic is identical in both

### Dependencies
- [ ] All npm packages are installed: `npm install`
- [ ] No TypeScript errors: Check build
- [ ] No console warnings

---

## Local Testing (Development)

### Setup
- [ ] Close previous dev server instances
- [ ] Kill all Node processes: `taskkill /F /IM node.exe`
- [ ] Verify `.env.local` is in project root
- [ ] Start fresh: `npm run dev`
- [ ] Wait for "ready - started server" message

### Basic Chat Test
- [ ] Open http://localhost:3000 in browser
- [ ] Scroll to "Chat with مُجيب" section
- [ ] See initial greeting message
- [ ] Type a test message in Arabic or English
- [ ] Press Enter or click Send button
- [ ] Wait 1-3 seconds for response
- [ ] Verify bot responds with appropriate message

### Console Verification
- [ ] Open DevTools: Press F12
- [ ] Go to Console tab
- [ ] Should see logs like:
  ```
  === Chat API Request ===
  Webhook URL: https://mogeeb.shop/webhook-test/...
  Message: [your message]
  Sending message to n8n webhook...
  N8N responded with status: 200
  Raw N8N response: {...}
  Extracted bot response: [bot message]
  ```
- [ ] No errors in console
- [ ] No warnings about hydration

### Error Handling Test
- [ ] If webhook is temporarily down, should show Arabic error message
- [ ] Error message should be user-friendly
- [ ] Should not show technical errors
- [ ] Should allow retry

### Network Test (DevTools)
- [ ] Open DevTools → Network tab
- [ ] Send a message
- [ ] See POST request to `/api/chat`
- [ ] Response status should be 200
- [ ] Response body should contain `response` field
- [ ] Only ONE request per message (not two!)

---

## Production Deployment (Netlify)

### Pre-Deployment
- [ ] Code is committed and pushed to GitHub
- [ ] All tests pass locally
- [ ] No console errors or warnings
- [ ] Production webhook URL ready: `https://mogeeb.shop/webhook/...`

### Netlify Configuration
- [ ] Go to Netlify Dashboard
- [ ] Select your site
- [ ] Go to Site Settings → Build & deploy → Environment
- [ ] Click "Edit variables"
- [ ] Add new variable:
  - **Key:** `N8N_WEBHOOK_URL`
  - **Value:** `https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40`
- [ ] Save environment variables
- [ ] Trigger new deploy (or wait for auto-deploy)

### Build Verification
- [ ] Check build logs in Netlify Dashboard
- [ ] Build should succeed (no errors)
- [ ] Deployment should complete successfully
- [ ] Site should be live within 1-2 minutes

### Production Testing
- [ ] Open your Netlify site URL
- [ ] Navigate to chat section
- [ ] Send a test message
- [ ] Verify you get a response
- [ ] Check that response format is correct (Arabic text)
- [ ] Test multiple messages
- [ ] Test error handling (if webhook is down)

### Production Monitoring
- [ ] Monitor Netlify logs for errors
- [ ] Check browser console in production (F12)
- [ ] Verify no console errors
- [ ] Test chat periodically throughout day

---

## Troubleshooting Guide

### Problem: 404 Not Found Error

**Symptoms:**
- Error: `POST http://localhost:3000/api/chat 404 (Not Found)`
- Chat doesn't work at all

**Solutions:**
1. Restart dev server:
   ```bash
   taskkill /F /IM node.exe
   npm run dev
   ```
2. Verify `.env.local` exists in project root
3. Check `.env.local` is not empty
4. Verify no TypeScript errors: `npm run build`

---

### Problem: Empty Response from Webhook

**Symptoms:**
- Chat sends message but no response appears
- Console shows success (200 status)
- But no message displayed

**Solutions:**
1. Check n8n workflow is **active**
2. Check webhook URL is correct in `.env.local`
3. Test webhook directly:
   ```bash
   curl -X POST https://mogeeb.shop/webhook-test/... \
     -H "Content-Type: application/json" \
     -d '{"message":"test"}'
   ```
4. Check n8n logs for errors
5. Verify response format matches expected structure

---

### Problem: Duplicate Messages Appearing

**Symptoms:**
- Each message creates 2 messages in n8n
- Double processing of requests

**Solutions:**
1. Verify only ONE dev server running:
   ```bash
   taskkill /F /IM node.exe
   npm run dev
   ```
2. Check there's only one `npm run dev` process
3. Kill all node processes and restart
4. Check browser hasn't sent duplicate requests (Network tab)

---

### Problem: Timeout Errors

**Symptoms:**
- Error: "Request timeout"
- "استغرق الرد وقتاً أطول من المتوقع"

**Solutions:**
1. Check n8n workflow is running
2. Check webhook URL is accessible:
   ```bash
   curl -I https://mogeeb.shop/webhook-test/...
   ```
3. Wait a moment and retry
4. Check n8n for processing delays
5. Check internet connection

---

### Problem: Wrong Webhook URL

**Symptoms:**
- Error: `POST https://mogeeb.shop/webhook-test/... 404`
- Webhook returns 404 error

**Solutions:**
1. Verify `.env.local` content:
   ```
   N8N_WEBHOOK_URL=https://mogeeb.shop/webhook-test/d581640e-383a-4eb1-bbb6-a8ac9be9ad40
   ```
2. Check for typos in URL
3. Verify `/webhook-test/` not `/webhook/` (for dev)
4. Restart dev server after changes
5. Test URL with curl to verify it works

---

### Problem: N8N Workflow Not Responding

**Symptoms:**
- Gets to webhook but no response returned
- Console shows connection timeout

**Solutions:**
1. Check n8n is running (check n8n dashboard)
2. Activate the workflow:
   - Open n8n interface
   - Find the webhook trigger
   - Verify it shows "Active"
   - Click toggle if needed
3. Test webhook from n8n interface
4. Check n8n execution history for errors
5. Restart n8n if necessary

---

## Performance Checklist

### Response Time
- [ ] Chat responds within 1-3 seconds (typical)
- [ ] No lag when typing
- [ ] No page freezing
- [ ] Loading indicator shows while waiting

### Error Recovery
- [ ] Clicking Send again retries the request
- [ ] No "stuck" states
- [ ] Can send multiple messages in sequence
- [ ] Each message is independent

### Resource Usage
- [ ] Browser doesn't consume excessive memory
- [ ] CPU usage is reasonable while chatting
- [ ] No memory leaks after repeated chat use
- [ ] Page remains responsive

---

## Security Checklist

### Data Protection
- [ ] No API keys in source code ✓
- [ ] No webhook URLs in source code ✓
- [ ] Environment variables used for secrets ✓
- [ ] `.env.local` not committed to git ✓

### Error Messages
- [ ] No sensitive data in error logs
- [ ] Error messages are user-friendly
- [ ] No technical details leaked
- [ ] Arabic fallback for all errors

### Communication
- [ ] HTTPS used for all webhook calls
- [ ] Proper headers sent with requests
- [ ] Input validation on messages
- [ ] No SQL injection risks

---

## Documentation Checklist

### For Team
- [ ] Shared `FIXES_SUMMARY.md` (overview)
- [ ] Shared `QUICK_REFERENCE.md` (testing guide)
- [ ] Shared `WEBHOOK_FIXES_SUMMARY.md` (technical details)
- [ ] Documented webhook URLs in safe location

### For Maintenance
- [ ] Created `CHANGES_DETAILED.md` (code changes)
- [ ] Created `WEBHOOK_RESPONSE_ISSUES.md` (issue analysis)
- [ ] Created troubleshooting guide
- [ ] Documented testing procedures

### For Future Reference
- [ ] Stored all fix documentation
- [ ] Archived old troubleshooting notes
- [ ] Documented deployment process
- [ ] Created this checklist

---

## Final Verification

### Code Quality
```bash
npm run build  # Should complete with no errors
npm run lint   # Should show no critical issues
```

### Before Going Live
- [ ] All local tests pass
- [ ] No console errors or warnings
- [ ] All documentation is current
- [ ] Team is informed of changes
- [ ] Monitoring is in place
- [ ] Rollback plan exists (if needed)

### Post-Deployment
- [ ] Monitor for errors in first hour
- [ ] Test chat functionality every few minutes
- [ ] Check Netlify logs for issues
- [ ] Be available for quick fixes if needed
- [ ] Document any issues encountered

---

## Sign-Off

| Item | By | Date | Status |
|------|----|----|--------|
| Local Testing | - | - | ⭕ Pending |
| Code Review | - | - | ⭕ Pending |
| Netlify Setup | - | - | ⭕ Pending |
| Production Deploy | - | - | ⭕ Pending |
| Production Testing | - | - | ⭕ Pending |
| Documentation | - | - | ✅ Complete |

---

## Quick Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run lint            # Check for lint issues

# Testing
npm run test            # Run tests (if available)

# Environment
taskkill /F /IM node.exe # Kill Node processes (Windows)
killall node             # Kill Node processes (Mac/Linux)

# Deployment
npm run build            # Build production version
npm run export           # Export static site (if needed)
```

---

## Support Resources

### Documentation Files
- `FIXES_SUMMARY.md` - Visual overview
- `QUICK_REFERENCE.md` - Testing guide
- `WEBHOOK_FIXES_SUMMARY.md` - Technical details
- `CHANGES_DETAILED.md` - Code changes
- `README_FIXES.md` - Index of all documentation

### Online Resources
- N8N Documentation: https://docs.n8n.io/
- Next.js Documentation: https://nextjs.org/docs
- Netlify Documentation: https://docs.netlify.com/

### Team Contacts
- Project Lead: [Name/Contact]
- N8N Admin: [Name/Contact]
- Infrastructure: [Name/Contact]

---

**Deployment Checklist Version:** 1.0
**Last Updated:** November 6, 2025
**Status:** Ready for use

✅ **All systems ready for deployment!**
