# Timeout Configuration - Updated

## Current Timeout Settings

### Development (Local Testing)
- **Timeout:** 60 seconds
- **File:** `src/app/api/chat/route.ts`
- **Reason:** Allows slower n8n workflows to complete
- **When Used:** Running `npm run dev`

```typescript
const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 seconds
```

### Production (Netlify)
- **Timeout:** 10-26 seconds (Netlify managed)
  - Free plan: 10 seconds maximum
  - Pro plan: 26 seconds maximum
- **File:** `netlify/functions/chat.js`
- **Reason:** Limited by Netlify's function timeout

**Note:** You can upgrade Netlify plan if you need longer timeouts on production.

---

## User Experience

### Expected Response Times
| Scenario | Time | Action |
|----------|------|--------|
| Normal response | 1-3 seconds | Message appears |
| Slow n8n workflow | 5-20 seconds | Loading spinner shows |
| Very slow workflow | 20-60 seconds | Still loading... |
| Timeout (60s dev, 26s prod) | 60+ seconds | Error message shown |

---

## When to Extend Timeout

### Reasons to Increase:
- N8N workflow is slow (database queries, API calls, AI processing)
- Multiple n8n nodes need time to execute
- External integrations are slow
- Testing long-running workflows

### Reasons to Keep Short:
- Better user experience (faster feedback)
- Prevents resource exhaustion
- User might retry faster requests
- Cost efficiency on serverless platforms

---

## How to Adjust

### Development Only
Edit `src/app/api/chat/route.ts`:
```typescript
// Change from:
const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 seconds

// To:
const timeoutId = setTimeout(() => controller.abort(), 90000) // 90 seconds
// or
const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minutes
```

Then restart dev server:
```bash
taskkill /F /IM node.exe
npm run dev
```

### Production
**Option 1: Upgrade Netlify Plan**
- Upgrade to Netlify Pro for 26-second timeout
- (Free plan maxes out at 10 seconds)

**Option 2: Use Different Hosting**
- Switch to hosting with longer timeouts
- Consider AWS Lambda (15 minutes max)
- Consider Google Cloud Functions (longer)

---

## Testing Different Timeouts

### Test 60-Second Timeout (Current)
```bash
1. Start dev server: npm run dev
2. Send chat message
3. Wait up to 60 seconds for response
4. Should see response or error message
```

### Test Timeout Trigger
```bash
1. Stop n8n temporarily (to simulate timeout)
2. Send message in chat
3. After 60 seconds, should see timeout error
4. Error message: "عذراً، استغرق الرد وقتاً أطول من المتوقع. حاول مرة أخرى."
```

---

## Recommended Settings

### For Development (Flexible)
```
60-120 seconds
Allows testing slow workflows without timeout pressure
```

### For Production (Balanced)
```
Netlify Free: 10 seconds (system limit)
Netlify Pro: 26 seconds (system limit)
Consider upgrading if users see timeouts
```

### For Long-Running Workflows
```
If n8n processing takes > 30 seconds:
1. Optimize n8n workflow
2. Split into multiple steps
3. Use async processing with webhooks
4. Upgrade Netlify plan
```

---

## Error Messages

When timeout occurs, user sees (in Arabic):
```
"عذراً، استغرق الرد وقتاً أطول من المتوقع. حاول مرة أخرى."
Translation: "Sorry, the response took longer than expected. Try again."
```

---

## Monitoring Timeouts

### In Development
Check browser console logs:
```
=== Chat API Request ===
Webhook URL: https://mogeeb.shop/webhook-test/...
Message: [your message]
Timeout: 60 seconds
Sending message to n8n webhook...
[After 60 seconds if no response]
Fetch error: AbortError
```

### In Production
Check Netlify logs:
```
Netlify Dashboard → Functions → Chat Function
Look for timeout errors in execution logs
```

---

## Current Configuration (Updated)

**Development:** ✅ Extended to 60 seconds
**Production:** ✅ Using Netlify defaults (10-26 seconds)

**Files Modified:**
- ✅ `src/app/api/chat/route.ts` - Timeout increased to 60s
- ✅ `netlify/functions/chat.js` - Logging added

**Status:** Ready to test with new extended timeout

---

## Next Steps

1. Restart dev server to apply changes:
   ```bash
   taskkill /F /IM node.exe
   npm run dev
   ```

2. Test chat - should handle slower responses now

3. If n8n is taking > 60 seconds:
   - Check n8n workflow for performance issues
   - Consider optimizing the workflow
   - Split complex tasks into multiple steps

4. For production, monitor Netlify logs for timeouts

---

**Timeout Updated:** November 6, 2025
**Development Timeout:** 60 seconds
**Production Timeout:** 10-26 seconds (Netlify limit)
