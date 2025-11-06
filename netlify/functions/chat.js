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

    // Forward the request to the n8n webhook
    // Production URL (uses /webhook/ not /webhook-test/)
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 
                      'https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40'
    
    // Debug logging for production
    console.log('=== Chat Function Request ===')
    console.log('N8N_WEBHOOK_URL from env:', process.env.N8N_WEBHOOK_URL ? 'SET' : 'NOT SET')
    console.log('Using webhook URL:', webhookUrl)
    console.log('Note: Netlify timeout is 26 seconds (Pro) or 10 seconds (Free)')
    
    let response
    try {
      console.log('Making request to webhook...')
      
      // Make ONE call with reasonable timeout (Netlify gives us 10-26 seconds)
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
          sessionId: sessionId || Date.now().toString()
        })
      })
      
      console.log('Received response from webhook with status:', response.status)
      
    } catch (error) {
      console.log('Request to webhook failed:', error.name, error.message)
      
      if (error.name === 'AbortError') {
        // Request timed out
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            response: 'عذراً، استغرق الرد وقتاً أطول من المتوقع. حاول مرة أخرى.',
            status: 'error'
          })
        }
      }
      
      // Other connection errors (webhook down, network issues, etc.)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          response: 'عذراً، الخدمة غير متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً.',
          status: 'error'
        })
      }
    }

    if (response.ok) {
      const data = await response.json()
      
      // Add detailed logging for debugging
      console.log('Raw N8N response:', JSON.stringify(data, null, 2))
      
      // Handle n8n response structure - SIMPLIFIED
      let botResponse = extractResponse(data)
      
      if (!botResponse) {
        console.warn('Could not extract response from n8n data')
        botResponse = 'أهلاً بك! عذراً، كان هناك خطأ في المعالجة. حاول مرة أخرى.'
      }
      
      console.log('Extracted bot response:', botResponse)
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          response: botResponse,
          status: 'success'
        })
      }
    } else {
      // Response not OK - log the actual response body for debugging
      let responseBody = ''
      try {
        responseBody = await response.text()
        console.error('N8N error response body:', responseBody)
      } catch (e) {
        console.error('Could not read error response body')
      }
      
      console.error('N8N webhook error:', response.status, response.statusText)
      
      // Return a meaningful error based on status
      let errorMessage = 'عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.'
      if (response.status === 404) {
        errorMessage = 'عذراً، خدمة الدردشة غير متاحة حالياً. يرجى التواصل مع الدعم الفني.'
        console.error('Webhook endpoint not found - check N8N configuration')
      } else if (response.status === 429) {
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

/**
 * Extract text response from various n8n response formats
 */
function extractResponse(data) {
  // Handle array response from n8n
  if (Array.isArray(data) && data.length > 0) {
    const firstItem = data[0]
    console.log('Handling array response, first item:', JSON.stringify(firstItem, null, 2))
    
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