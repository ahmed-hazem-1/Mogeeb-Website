exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 
                      process.env.WEBHOOK_URL || 
                      process.env.N8N_WEBHOOK || 
                      'https://mogeeb.shop/webhook-test/d581640e-383a-4eb1-bbb6-a8ac9be9ad40'
    
    console.log('Testing webhook URL:', webhookUrl)
    
    // Test the webhook with a simple HEAD request
    try {
      const response = await fetch(webhookUrl, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mogeeb-Website-Test/1.0'
        }
      })
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          webhookUrl: webhookUrl,
          webhookStatus: response.status,
          webhookStatusText: response.statusText,
          available: response.ok,
          message: response.ok ? 'Webhook is available' : 'Webhook returned error: ' + response.status
        })
      }
    } catch (error) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          webhookUrl: webhookUrl,
          error: error.message,
          available: false,
          message: 'Failed to connect to webhook'
        })
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    }
  }
}