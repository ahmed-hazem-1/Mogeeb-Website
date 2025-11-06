# Session ID Type Fix

## Problem
The `sessionId` was being stored as a string with "demo-" prefix:
```typescript
sessionIdRef.current = `demo-${Date.now()}` // ❌ Wrong: string
```

This caused issues because:
- It was not a BigInt as required
- It had unnecessary "demo-" prefix
- Inconsistent with the message ID format (which uses BigInt)

## Solution
Changed `sessionId` to use BigInt type:

```typescript
sessionIdRef.current = BigInt(Date.now()) // ✅ Correct: bigint
```

## Changes Made

### 1. Updated sessionIdRef Type
**File:** `src/components/ChatbotDemo.tsx`

**Before:**
```typescript
const sessionIdRef = useRef<string>(`demo-${Date.now()}`)
```

**After:**
```typescript
const sessionIdRef = useRef<bigint>(BigInt(Date.now()))
```

### 2. Convert to String for JSON Transmission
Since BigInt cannot be directly serialized to JSON, we convert it to string when sending:

**Listening Requests:**
```typescript
body: JSON.stringify({
  sessionId: sessionIdRef.current.toString(), // Convert BigInt to string
  userId: 'demo-user'
})
```

**Message Sending:**
```typescript
body: JSON.stringify({
  message: messageText,
  timestamp: new Date().toISOString(),
  userId: 'demo-user',
  sessionId: sessionIdRef.current.toString() // Convert BigInt to string
})
```

## Result

### Before:
```json
{
  "sessionId": "demo-1730894400000"
}
```

### After:
```json
{
  "sessionId": "1730894400000"
}
```

## Benefits

1. **Type Consistency**: Session ID is now BigInt, matching the Message ID format
2. **No Prefix**: Removed unnecessary "demo-" prefix
3. **Proper Format**: Clean numeric identifier
4. **Better Tracking**: More consistent across the application

## API Compatibility

The backend (N8N webhook, Next.js API routes, Netlify functions) will receive the session ID as a string:
- Type: `string`
- Format: `"1730894400000"` (timestamp as string)
- Can be converted back to BigInt on the server if needed: `BigInt(sessionId)`

## Example Usage

```typescript
// Generate session ID
const sessionId = BigInt(Date.now())
// Result: 1730894400000n

// Send to API
fetch('/api/chat', {
  body: JSON.stringify({
    sessionId: sessionId.toString()
  })
})
// Sends: { "sessionId": "1730894400000" }

// Receive in backend
const receivedSessionId = BigInt(request.body.sessionId)
// Result: 1730894400000n
```

## Notes

- The session ID is generated once when the chatbot component mounts
- It persists throughout the entire chat session
- All messages and polling requests use the same session ID
- The format is a timestamp (milliseconds since epoch) as BigInt
