# Chat ID and Session ID Implementation

## Overview
The chatbot now sends two unique identifiers to n8n with every message:

1. **`chatId`** - Persistent user identifier (BigInt)
2. **`sessionId`** - Session-specific identifier (BigInt)

## How It Works

### Chat ID (Persistent BigInt)
- **Purpose**: Identifies the same user across multiple sessions
- **Storage**: Stored in browser's `localStorage` as string
- **Runtime Type**: `bigint` in memory, converted to string for storage/transmission
- **Lifetime**: Persists until user clears browser data
- **Format**: BigInt timestamp (e.g., `1731153600000`)
- **Use Case**: Track order history, user preferences, and conversations across different visits

### Session ID (Temporary BigInt)
- **Purpose**: Identifies a single conversation session
- **Storage**: Kept in component state (React ref)
- **Runtime Type**: `bigint` in memory, converted to string for transmission
- **Lifetime**: Changes on every page refresh
- **Format**: BigInt timestamp (e.g., `1731154200000`)
- **Use Case**: Keeps n8n memory light by limiting context to current session

## Implementation Details

### Frontend (ChatbotDemo.tsx)
```typescript
// Refs are BigInt type
const sessionIdRef = useRef<bigint>(BigInt(0))
const chatIdRef = useRef<bigint>(BigInt(0))

// Initialize on component mount
useEffect(() => {
  // Get or create persistent chatId from localStorage
  const storedChatId = localStorage.getItem('mogeeb_chatId')
  let chatId: bigint
  
  if (storedChatId) {
    chatId = BigInt(storedChatId)  // Convert from string to BigInt
  } else {
    chatId = BigInt(Date.now())
    localStorage.setItem('mogeeb_chatId', chatId.toString())
  }
  chatIdRef.current = chatId

  // Generate new sessionId on every page load/refresh
  const sessionId = BigInt(Date.now())
  sessionIdRef.current = sessionId
}, [])

// Convert BigInt to string when sending (JSON doesn't support BigInt)
body: JSON.stringify({
  message: messageText,
  timestamp: new Date().toISOString(),
  userId: 'demo-user',
  sessionId: sessionIdRef.current.toString(),  // BigInt → string
  chatId: chatIdRef.current.toString()         // BigInt → string
})
```

### API Routes
Both the Next.js API route (`/api/chat/route.ts`) and Netlify function (`/netlify/functions/chat.js`) receive string values and forward them to n8n:

```javascript
{
  message: "user message",
  timestamp: "2025-11-09T12:00:00.000Z",
  userId: "demo-user",
  sessionId: "1731153600000",  // String representation of BigInt
  chatId: "1731067200000"       // String representation of BigInt
}
```

## N8N Configuration

Your n8n workflow should expect these fields in the webhook payload:

```json
{
  "message": "string",
  "timestamp": "string (ISO 8601)",
  "userId": "string",
  "sessionId": "string (numeric)",
  "chatId": "string (numeric)"
}
```

### Recommended N8N Setup

1. **Use `chatId` for**:
   - Storing user data in database (as numeric or string)
   - Tracking order history
   - Retrieving user preferences
   - Long-term conversation context

2. **Use `sessionId` for**:
   - Current conversation memory
   - Temporary context storage
   - Session-specific data
   - Clearing memory on new session

### Example N8N Logic
```javascript
// Convert string to number if needed
const chatId = parseInt(data.chatId)
const sessionId = parseInt(data.sessionId)

// Store message in database with chatId for history
// Store conversation context with sessionId for current chat

// On new sessionId:
//   - Start fresh conversation memory
//   - Keep chatId to access user's order history
//   - Reduce memory overhead
```

## Benefits

✅ **BigInt Advantages**:
- Handles large timestamp values safely
- No floating-point precision issues
- Unique IDs based on millisecond precision
- Simple and efficient

✅ **For Users**:
- System remembers them across visits (via chatId)
- Fresh conversation on each visit (via sessionId)
- Order history preserved

✅ **For N8N**:
- Lighter memory per session
- Better performance
- Clear session boundaries
- Easy to implement memory cleanup
- Numeric IDs work well with databases

✅ **For Database**:
- Clear user identification
- Easy to query order history
- Session-based analytics possible
- Standard numeric ID format

## Testing

### Test Chat ID Persistence:
1. Open the chat and send a message
2. Check browser console for: `Chat initialized: { chatId: '1731153600000', sessionId: '1731154200000' }`
3. Note the `chatId` value
4. Refresh the page
5. Check console again - `chatId` should be the same, `sessionId` should be different

### Test Session ID Reset:
1. Send a message
2. Note the `sessionId` in console
3. Refresh the page
4. Send another message
5. Verify `sessionId` has changed (will be a newer timestamp)

### Test BigInt Values:
1. Check browser localStorage: `localStorage.getItem('mogeeb_chatId')`
2. Verify it's a numeric string (e.g., "1731153600000")
3. Both IDs are based on `Date.now()` which returns milliseconds since epoch

## Clearing User Data

Users can reset their chatId by:
1. Clearing browser localStorage
2. Or deleting the `mogeeb_chatId` key specifically

Developers can add a "Reset Chat" button that calls:
```javascript
localStorage.removeItem('mogeeb_chatId')
window.location.reload()
```

## Example Values

```javascript
// First visit at 2025-11-09 12:00:00 UTC
chatId: "1731153600000"     // Stored in localStorage
sessionId: "1731153600000"  // Generated on mount

// After refresh at 2025-11-09 12:05:00 UTC
chatId: "1731153600000"     // SAME - retrieved from localStorage
sessionId: "1731153900000"  // NEW - 5 minutes later
```
