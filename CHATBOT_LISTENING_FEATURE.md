# Chatbot Listening Feature Documentation

## Overview
The chatbot now includes a **continuous listening feature** that allows it to receive messages from the webhook even before the user sends their first message. This creates a more proactive and responsive chat experience.

## How It Works

### 1. **Active Polling Mechanism**
- When the chatbot component loads, it automatically starts polling for incoming messages
- Polls the webhook every 3 seconds to check for new messages
- Uses a persistent session ID to track messages for this specific chat session

### 2. **Session Management**
- Each chat session gets a unique session ID: `demo-${timestamp}`
- The session ID is maintained throughout the entire chat session
- All messages (sent and received) are associated with this session ID

### 3. **API Endpoints**

#### **Development (Next.js)**
- **Send Message**: `/api/chat` (POST) - Sends user messages to the webhook
- **Listen for Messages**: `/api/chat/listen` (POST) - Polls for incoming messages

#### **Production (Netlify)**
- **Send Message**: `/.netlify/functions/chat` (POST)
- **Listen for Messages**: `/.netlify/functions/chat-listen` (POST)

### 4. **Webhook Integration**
The system sends two types of requests to your n8n webhook:

#### **Regular Message** (when user sends a message):
```json
{
  "message": "عايز كيلو كفتة",
  "timestamp": "2025-11-06T12:00:00.000Z",
  "userId": "demo-user",
  "sessionId": "demo-1730894400000"
}
```

#### **Polling Request** (continuous listening):
```json
{
  "action": "poll",
  "sessionId": "demo-1730894400000",
  "timestamp": "2025-11-06T12:00:00.000Z",
  "userId": "demo-user"
}
```

## N8N Webhook Configuration

Your n8n workflow should be able to:

1. **Handle Regular Messages**: Process user messages and return appropriate responses
2. **Handle Poll Requests**: Check if there are any pending messages for the session and return them

### Example N8N Response Structure

#### For Regular Messages:
```json
{
  "message": "تمام! كيلو كفتة هيوصلك في 30 دقيقة"
}
```

#### For Poll Requests:
```json
{
  "message": "مرحباً! عندنا عروض خاصة النهاردة"
}
```

Or if no message is pending:
```json
{}
```

## Visual Indicators

### Header Status
- **Listening Mode**: Shows "يستمع للرسائل الواردة..." (Listening for incoming messages)
- **Status Indicator**: Green pulsing dot when actively listening
- **Status Text**: "Listening" label in English

### Message Display
- Incoming messages from the webhook appear automatically
- Duplicate detection prevents the same message from showing twice
- Smooth animations for new messages

## Implementation Details

### Files Modified
1. **`src/components/ChatbotDemo.tsx`**
   - Added polling mechanism with `useEffect` hook
   - Added session ID management with `useRef`
   - Added `isListening` state for UI feedback
   - Updated header to show listening status

2. **`src/app/api/chat/listen/route.ts`** (NEW)
   - Next.js API route for listening in development
   - Polls the webhook with session information
   - Extracts messages from various response formats

3. **`netlify/functions/chat-listen.js`** (NEW)
   - Netlify serverless function for production
   - Same functionality as the Next.js route
   - Includes CORS headers for cross-origin requests

### Configuration
- **Polling Interval**: 3 seconds (configurable in ChatbotDemo.tsx)
- **Timeout**: 5 seconds per polling request
- **Session ID Format**: `demo-${timestamp}`

## Benefits

1. **Proactive Communication**: The chatbot can receive messages even before user interaction
2. **Real-time Updates**: Messages appear within 3 seconds of being sent from the webhook
3. **Persistent Session**: All messages are tracked within the same session
4. **Error Resilient**: Continues polling even if individual requests fail
5. **Duplicate Prevention**: Smart logic prevents the same message from appearing twice

## Testing

### Test the Listening Feature
1. Open the chatbot in your browser
2. Check that the header shows "Listening" status
3. Send a message from your n8n workflow with the action "poll"
4. The message should appear in the chat within 3 seconds

### Test Regular Messaging
1. Send a message from the chat input
2. Verify that your n8n workflow receives it with the session ID
3. Send a response from n8n
4. Verify the response appears in the chat

## Troubleshooting

### Messages Not Appearing
- Check browser console for polling errors
- Verify the webhook URL is correct in environment variables
- Ensure your n8n workflow is running and accessible
- Check that the response format matches the expected structure

### Duplicate Messages
- The system includes duplicate detection based on:
  - Message content matching
  - Timestamp within 10 seconds
  - Message type (bot message only)

### High Server Load
- Consider increasing the polling interval (currently 3 seconds)
- Implement rate limiting on the server side
- Use WebSocket for more efficient real-time communication

## Future Enhancements

1. **WebSocket Implementation**: Replace polling with WebSocket for true real-time communication
2. **Message Queue**: Implement a proper message queue (Redis) for production
3. **Push Notifications**: Add browser notifications for incoming messages
4. **Typing Indicators**: Show when the bot is typing a response
5. **Message History**: Store and retrieve chat history from database

## Environment Variables

Make sure these are set:
- `N8N_WEBHOOK_URL`: Your n8n webhook URL for message processing

## Notes

- The polling is lightweight and won't significantly impact performance
- The feature works in both development and production environments
- Session IDs are client-side only; for production, consider server-side session management
- The feature automatically cleans up polling intervals when the component unmounts
