import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json({
        response: 'عذراً، لم أستطع فهم رسالتك. حاول مرة أخرى.',
        status: 'error'
      })
    }

    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout
    
    // Forward the request to the n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://biometrical-bettina-benignly.ngrok-free.dev/webhook/10645e4a-c81d-4035-ae43-db5a699cd983'
    
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
      
      // Handle n8n response structure with better parsing
      let botResponse = 'أهلاً بك! أنا مُجيب وجاهز لأساعدك.'
      
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
      } catch (parseError) {
        console.error('Error parsing n8n response:', parseError)
        botResponse = 'أهلاً بك! أنا مُجيب وجاهز لأساعدك. إيه اللي تحب تطلبه؟'
      }
      
      return NextResponse.json({
        response: botResponse,
        status: 'success',
        originalData: data
      })
    } else {
      console.error('N8N webhook error:', response.status, response.statusText)
      
      // Return a meaningful error based on status
      let errorMessage = 'عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.'
      if (response.status === 429) {
        errorMessage = 'عذراً، كثرة الطلبات. انتظر قليلاً ثم حاول مرة أخرى.'
      } else if (response.status >= 500) {
        errorMessage = 'عذراً، الخدمة غير متاحة حالياً. حاول مرة أخرى لاحقاً.'
      }
      
      return NextResponse.json({
        response: errorMessage,
        status: 'fallback'
      })
    }
  } catch (error) {
    console.error('Error forwarding to webhook:', error)
    
    // Handle specific error types
    let fallbackMessage = 'أهلاً بك! أنا مُجيب وجاهز لأساعدك. إيه اللي تحب تطلبه؟'
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        fallbackMessage = 'عذراً، استغرق الرد وقتاً أطول من المتوقع. حاول مرة أخرى.'
      } else if (error.message.includes('fetch')) {
        fallbackMessage = 'عذراً، مشكلة في الاتصال. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.'
      }
    }
    
    // Return fallback response on error
    return NextResponse.json({
      response: fallbackMessage,
      status: 'fallback'
    })
  }
}