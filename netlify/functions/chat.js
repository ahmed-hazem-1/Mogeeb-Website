exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  try {
    const { message, timestamp, userId, sessionId } = JSON.parse(event.body)

    // Forward the request to the n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://biometrical-bettina-benignly.ngrok-free.dev/webhook/mogeeb-demo'
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'Mogeeb-Website/1.0'
      },
      body: JSON.stringify({
        message: message,
        timestamp: timestamp || new Date().toISOString(),
        userId: userId || 'demo-user',
        sessionId: sessionId || `demo-${Date.now()}`
      })
    })

    if (response.ok) {
      const data = await response.json()
      
      // Handle n8n response structure
      let botResponse = 'عذراً، حدث خطأ في معالجة طلبك.'
      
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
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          response: 'عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.',
          status: 'error'
        })
      }
    }
  } catch (error) {
    console.error('Error forwarding to webhook:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        response: 'عذراً، حدث خطأ في معالجة طلبك. حاول مرة أخرى لاحقاً.',
        status: 'error'
      })
    }
  }
}