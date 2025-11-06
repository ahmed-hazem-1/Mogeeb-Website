import { NextRequest, NextResponse } from 'next/server'

// Store for pending messages (in production, use Redis or database)
const pendingMessages = new Map<string, string[]>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json({
        error: 'Session ID is required',
        status: 'error'
      }, { status: 400 })
    }

    // Check if webhook URL is configured to listen to
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 
                       'https://mogeeb.shop/webhook-test/d581640e-383a-4eb1-bbb6-a8ac9be9ad40'
    
    console.log('=== Listen API Request ===')
    console.log('Session ID:', sessionId)
    console.log('Checking for incoming messages from webhook...')
    
    try {
      // Poll the webhook to check for any messages for this session
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'Mogeeb-Website/1.0'
        },
        body: JSON.stringify({
          action: 'poll',
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          userId: body.userId || 'demo-user'
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        console.log('Received data from webhook:', data)
        
        // Check if there's a message in the response
        let incomingMessage = extractResponse(data)
        
        if (incomingMessage && incomingMessage.trim()) {
          console.log('Found incoming message:', incomingMessage)
          
          return NextResponse.json({
            hasMessage: true,
            message: incomingMessage,
            status: 'success'
          })
        }
      }
      
      // No message available
      return NextResponse.json({
        hasMessage: false,
        status: 'success'
      })
      
    } catch (fetchError) {
      console.error('Error polling webhook:', fetchError)
      
      // Return no message on error (don't disrupt the chatbot)
      return NextResponse.json({
        hasMessage: false,
        status: 'success'
      })
    }
  } catch (error) {
    console.error('Error in listen endpoint:', error)
    
    return NextResponse.json({
      hasMessage: false,
      status: 'error'
    }, { status: 500 })
  }
}

/**
 * Extract text response from various n8n response formats
 */
function extractResponse(data: any): string {
  // Handle array response from n8n
  if (Array.isArray(data) && data.length > 0) {
    const firstItem = data[0]
    
    // Try different fields in order of preference
    if (firstItem.message) return firstItem.message
    if (firstItem.text) return firstItem.text
    if (firstItem.response) return firstItem.response
    if (firstItem.output?.tool_calls?.[0]?.args?.text) {
      return firstItem.output.tool_calls[0].args.text
    }
    if (firstItem.output) return JSON.stringify(firstItem.output)
  }
  
  // Handle direct object response
  if (typeof data === 'object' && data !== null) {
    if (data.message) return data.message
    if (data.text) return data.text
    if (data.response) return data.response
    if (data.output) {
      if (typeof data.output === 'string') return data.output
      if (data.output.message) return data.output.message
      if (data.output.text) return data.output.text
    }
  }
  
  // Handle string response
  if (typeof data === 'string') return data
  
  // No response found
  return ''
}
