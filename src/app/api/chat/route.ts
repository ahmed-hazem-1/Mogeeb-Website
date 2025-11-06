import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json({
        error: 'Message is required',
        status: 'error'
      }, { status: 400 })
    }

    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
    
    // Forward the request to the n8n webhook
    const webhookUrl =  process.env.N8N_WEBHOOK_URL || 'https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40'
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'Mogeeb-Website/1.0'
      },
      body: JSON.stringify({
        message: body.message.trim(),
        timestamp: body.timestamp || new Date().toISOString(),
        userId: body.userId || 'demo-user',
        sessionId: body.sessionId || `demo-${Date.now()}`
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      
      // Handle n8n response structure
      let botResponse = ''
      
      try {
        if (Array.isArray(data) && data.length > 0) {
          // Handle array response from n8n
          const firstItem = data[0]
          if (firstItem.text) {
            botResponse = firstItem.text
          } else if (firstItem.output && firstItem.output.tool_calls && firstItem.output.tool_calls.length > 0) {
            const toolCall = firstItem.output.tool_calls[0]
            if (toolCall.args && toolCall.args.text) {
              botResponse = toolCall.args.text
            }
          } else if (firstItem.response) {
            botResponse = firstItem.response
          } else if (firstItem.message) {
            botResponse = firstItem.message
          }
        } else if (data.text) {
          // Handle direct text response
          botResponse = data.text
        } else if (data.response) {
          // Handle response field
          botResponse = data.response
        } else if (data.message) {
          // Handle message field
          botResponse = data.message
        } else if (typeof data === 'string') {
          // Handle string response
          botResponse = data
        }
        
        // If no response was found, return an error
        if (!botResponse) {
          return NextResponse.json({
            error: 'No response from chatbot service',
            status: 'error'
          }, { status: 502 })
        }
      } catch (parseError) {
        console.error('Error parsing n8n response:', parseError)
        return NextResponse.json({
          error: 'Failed to parse chatbot response',
          status: 'error'
        }, { status: 502 })
      }
      
      return NextResponse.json({
        response: botResponse,
        status: 'success',
        originalData: data
      })
    } else {
      console.error('N8N webhook error:', response.status, response.statusText)
      
      return NextResponse.json({
        error: `Webhook service error: ${response.status} ${response.statusText}`,
        status: 'error'
      }, { status: response.status })
    }
  } catch (error) {
    console.error('Error forwarding to webhook:', error)
    
    // Handle specific error types
    let errorMessage = 'Internal server error'
    let statusCode = 500
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout'
        statusCode = 408
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Connection failed'
        statusCode = 503
      }
    }
    
    return NextResponse.json({
      error: errorMessage,
      status: 'error'
    }, { status: statusCode })
  }
}