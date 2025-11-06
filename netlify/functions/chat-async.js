exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

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

    const { message, requestId } = body;

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

    const webhookUrl = process.env.N8N_WEBHOOK_URL || 
                      process.env.WEBHOOK_URL || 
                      process.env.N8N_WEBHOOK || 
                      'https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40'
    
    console.log('Triggering webhook asynchronously...')
    
    // Trigger the webhook but don't wait for it
    // Instead, return a "processing" response immediately
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mogeeb-Website/1.0'
      },
      body: JSON.stringify({
        message: message.trim(),
        timestamp: new Date().toISOString(),
        userId: 'demo-user',
        sessionId: Date.now(),
        requestId: requestId || Date.now()
      })
    }).catch(error => {
      console.error('Webhook error:', error)
    })

    // Return immediate "processing" response
    return {
      statusCode: 202, // Accepted for processing
      headers,
      body: JSON.stringify({
        response: 'جاري معالجة طلبك... سأرد عليك في لحظات.',
        status: 'processing',
        requestId: requestId || Date.now()
      })
    }

  } catch (error) {
    console.error('Error in chat function:', error)
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: 'عذراً، حدث خطأ في معالجة طلبك. حاول مرة أخرى لاحقاً.',
        status: 'error'
      })
    }
  }
}