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

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL ? 'SET (length: ' + process.env.N8N_WEBHOOK_URL.length + ')' : 'NOT SET',
        webhookUrl: process.env.N8N_WEBHOOK_URL || 'https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40',
        allEnvKeys: Object.keys(process.env).filter(key => key.includes('N8N') || key.includes('WEBHOOK')),
        timestamp: new Date().toISOString()
      }
    })
  }
}