exports.handler = async (event, context) => {
  // Enable CORS for all requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        error: 'Method Not Allowed',
        response: 'عذراً، هذه الطريقة غير مسموحة.',
        status: 'error'
      })
    }
  }

  try {
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          response: 'عذراً، لم أستطع فهم طلبك. حاول مرة أخرى.',
          status: 'error'
        })
      }
    }

    const { message, timestamp, userId, sessionId } = body;

    // Validate input
    if (!message || message.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          response: 'عذراً، لم أستطع فهم رسالتك. حاول مرة أخرى.',
          status: 'error'
        })
      }
    }

    // Forward the request to the n8n webhook with timeout
    // Try multiple possible environment variable names
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 
                      process.env.WEBHOOK_URL || 
                      process.env.N8N_WEBHOOK || 
                      'https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40'
    
    // Debug logging for production
    console.log('Environment variables check:')
    console.log('N8N_WEBHOOK_URL from env:', process.env.N8N_WEBHOOK_URL ? 'SET' : 'NOT SET')
    console.log('WEBHOOK_URL from env:', process.env.WEBHOOK_URL ? 'SET' : 'NOT SET')
    console.log('Using webhook URL:', webhookUrl)
    console.log('All env vars with N8N or WEBHOOK:', Object.keys(process.env).filter(key => 
      key.includes('N8N') || key.includes('WEBHOOK')))
    
    // Step 1: Quick check (10 seconds) to see if webhook is reachable
    const quickController = new AbortController()
    const quickTimeoutId = setTimeout(() => quickController.abort(), 10000) // 10 second timeout for initial check
    
    let response
    try {
      console.log('Making initial quick check to webhook...')
      response = await fetch(webhookUrl, {
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
        signal: quickController.signal
      })
      
      clearTimeout(quickTimeoutId)
      console.log('Webhook responded with status:', response.status)
      
      // If webhook responds (even if still processing), wait indefinitely for the actual response
      if (response.status === 200 || response.status === 202) {
        console.log('Webhook accepted the request, waiting for full response...')
        
        // Step 2: If webhook accepted the request, make another call without timeout
        const fullResponse = await fetch(webhookUrl, {
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
          })
          // No signal = no timeout, wait indefinitely
        })
        
        response = fullResponse // Use the full response for processing
        console.log('Received full response from webhook')
      }
      
    } catch (error) {
      clearTimeout(quickTimeoutId)
      console.log('Quick check failed:', error.name)
      
      if (error.name === 'AbortError') {
        // Webhook didn't respond within 10 seconds
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            response: 'عذراً، الخدمة غير متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً.',
            status: 'error'
          })
        }
      }
      
      // Other connection errors
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          response: 'عذراً، حدث خطأ في الاتصال. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.',
          status: 'error'
        })
      }
    }

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
        headers,
        body: JSON.stringify({
          response: botResponse,
          status: 'success',
          debug: {
            webhookUsed: webhookUrl,
            envVarSet: !!process.env.N8N_WEBHOOK_URL
          }
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
        headers,
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
      headers,
      body: JSON.stringify({
        response: errorMessage,
        status: 'error'
      })
    }
  }
}