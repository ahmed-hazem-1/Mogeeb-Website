import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Forward the request to the n8n webhook
    const response = await fetch('https://biometrical-bettina-benignly.ngrok-free.dev/webhook/mogeeb-demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'Mogeeb-Website/1.0'
      },
      body: JSON.stringify({
        message: body.message,
        timestamp: body.timestamp || new Date().toISOString(),
        userId: body.userId || 'demo-user',
        sessionId: body.sessionId || `demo-${Date.now()}`
      })
    })

    if (response.ok) {
      const data = await response.json()
      
      // Handle n8n response structure
      let botResponse = 'أهلاً بك! أنا مُجيب وجاهز لأساعدك.'
      
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
      }
      
      return NextResponse.json({
        response: botResponse,
        status: 'success',
        originalData: data
      })
    } else {
      // If webhook fails, return a fallback response
      return NextResponse.json({
        response: 'عذراً، حدث خطأ في الاتصال. جرب مرة أخرى.',
        status: 'fallback'
      })
    }
  } catch (error) {
    console.error('Error forwarding to webhook:', error)
    
    // Return fallback response on error
    return NextResponse.json({
      response: 'أهلاً بك! أنا مُجيب وجاهز لأساعدك. إيه اللي تحب تطلبه؟',
      status: 'fallback'
    })
  }
}