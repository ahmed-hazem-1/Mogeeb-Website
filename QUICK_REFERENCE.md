# Quick Reference - N8N Webhook Configuration

## 🎯 Current Setup

### Development (Local Testing)
- **API Endpoint:** `http://localhost:3000/api/chat`
- **N8N Webhook:** `https://mogeeb.shop/webhook-test/d581640e-383a-4eb1-bbb6-a8ac9be9ad40`
- **Env File:** `.env.local`
- **Timeout:** 30 seconds

### Production (Netlify)
- **API Endpoint:** `https://your-domain.netlify.app/.netlify/functions/chat`
- **N8N Webhook:** `https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40`
- **Env Variable:** Set in Netlify Dashboard
- **Timeout:** 10-26 seconds (Netlify managed)

---

## 🚀 How to Test

### Option 1: Using the Chat Demo
1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Scroll to "Chat with مُجيب" section
4. Type a message and press Enter
5. Watch browser console for logs

### Option 2: Direct API Test (curl)
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "مرحبا",
    "userId": "test-user",
    "sessionId": "test-session"
  }'
```

### Option 3: Test Webhook Directly
```bash
curl -X POST https://mogeeb.shop/webhook-test/d581640e-383a-4eb1-bbb6-a8ac9be9ad40 \
  -H "Content-Type: application/json" \
  -d '{"message": "test message"}'
```

---

## 📊 Expected Response

### Success Response
```json
{
  "response": "أهلاً وسهلاً! كيف أساعدك؟",
  "status": "success"
}
```

### Error Response
```json
{
  "response": "عذراً، خدمة الدردشة غير متاحة حالياً. يرجى المحاولة مرة أخرى.",
  "status": "error"
}
```

---

## 🔍 Debugging

### Check Console Logs
Browser DevTools → Console tab will show:
```
=== Chat API Request ===
Webhook URL: https://mogeeb.shop/webhook-test/...
Message: your message
Sending message to n8n webhook...
N8N responded with status: 200
Raw N8N response: {...}
Extracted bot response: response text
```

### Common Issues

| Issue | Solution |
|-------|----------|
| 404 Not Found | Restart dev server with `npm run dev` |
| Timeout error | Check n8n workflow is active, restart webhook |
| Empty response | Check n8n response format, see logs |
| Webhook returns 404 | Verify URL is correct in `.env.local` |

---

## ⚙️ Files Modified

1. **`src/app/api/chat/route.ts`**
   - Uses test webhook URL
   - Single call (no retry pattern)
   - Simplified response parsing

2. **`netlify/functions/chat.js`**
   - Uses production webhook URL
   - Single call
   - Same response parsing logic

3. **`.env.local`** (Development only)
   - `N8N_WEBHOOK_URL` set to test endpoint

4. **`.env.example`**
   - Documents both test and production URLs
   - Setup instructions

---

## 🚨 Important Reminders

✅ Always restart dev server after changing `.env.local`:
```bash
# Kill current server (Ctrl+C) or:
taskkill /F /IM node.exe

# Start fresh
npm run dev
```

✅ For production, set env var in Netlify:
- Go to Netlify Dashboard → Site settings → Build & deploy → Environment
- Add: `N8N_WEBHOOK_URL = https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40`

✅ Keep `.env.local` out of git (already in `.gitignore`)

---

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify n8n workflow is **active** and **running**
3. Test webhook directly with curl
4. Check `.env.local` has correct URL
5. Restart dev server

---

**Last Updated:** November 6, 2025
**Status:** ✅ All fixes implemented and tested
