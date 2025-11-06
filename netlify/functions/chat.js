exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    }
  }

  try {
    const { message, timestamp, userId, sessionId } = JSON.parse(event.body)

    // Validate input
    if (!message || message.trim().length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          response: 'عذراً، لم أستطع فهم رسالتك. حاول مرة أخرى.',
          status: 'error'
        })
      }
    }

    // Forward the request to the n8n webhook with timeout
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40'
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'Mogeeb-Website/1.0'
      },
      body: JSON.stringify({
        message: message.trim(),
        timestamp: timestamp || new Date().toISOString(),
        userId: userId || 'demo-user',
        sessionId: sessionId || `demo-${Date.now()}`
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      
      // Handle n8n response structure with better parsing
      let botResponse = 'عذراً، حدث خطأ في معالجة طلبك.'
      
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
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({
          response: botResponse,
          status: 'success'
        })
      }
    } else {
      console.error('N8N webhook error:', response.status, response.statusText)
      
      // Return a meaningful error based on status
      let errorMessage = 'عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.'
      if (response.status === 429) {
        errorMessage = 'عذراً، كثرة الطلبات. انتظر قليلاً ثم حاول مرة أخرى.'
      } else if (response.status >= 500) {
        errorMessage = 'عذراً، الخدمة غير متاحة حالياً. حاول مرة أخرى لاحقاً.'
      }
      
      return {
        statusCode: 200, // Return 200 to show the error message to user
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          response: errorMessage,
          status: 'error'
        })
      }
    }
  } catch (error) {
    console.error('Error in chat function:', error)
    
    // Handle specific error types
    let errorMessage = 'عذراً، حدث خطأ في معالجة طلبك. حاول مرة أخرى لاحقاً.'
    
    if (error.name === 'AbortError') {
      errorMessage = 'عذراً، استغرق الرد وقتاً أطول من المتوقع. حاول مرة أخرى.'
    } else if (error.message && error.message.includes('fetch')) {
      errorMessage = 'عذراً، مشكلة في الاتصال. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.'
    }
    
    return {
      statusCode: 200, // Return 200 to show the error message to user
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        response: errorMessage,
        status: 'error'
      })
    }
  }
}