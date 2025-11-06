const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { sessionId, userId } = body;

    if (!sessionId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Session ID is required',
          status: 'error'
        })
      };
    }

    // Get webhook URL from environment variable
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 
                       'https://mogeeb.shop/webhook-test/d581640e-383a-4eb1-bbb6-a8ac9be9ad40';
    
    console.log('=== Chat Listen Function ===');
    console.log('Session ID:', sessionId);
    console.log('Checking for incoming messages...');
    
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'Mogeeb-Website/1.0'
        },
        body: JSON.stringify({
          action: 'poll',
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          userId: userId || 'demo-user'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log('Received data from webhook:', data);
        
        // Extract message from response
        let incomingMessage = extractResponse(data);
        
        if (incomingMessage && incomingMessage.trim()) {
          console.log('Found incoming message:', incomingMessage);
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              hasMessage: true,
              message: incomingMessage,
              status: 'success'
            })
          };
        }
      }
      
      // No message available
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          hasMessage: false,
          status: 'success'
        })
      };
      
    } catch (fetchError) {
      console.error('Error polling webhook:', fetchError);
      
      // Return no message on error (don't disrupt the chatbot)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          hasMessage: false,
          status: 'success'
        })
      };
    }
  } catch (error) {
    console.error('Error in listen function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        hasMessage: false,
        status: 'error',
        error: error.message
      })
    };
  }
};

/**
 * Extract text response from various n8n response formats
 */
function extractResponse(data) {
  // Handle array response from n8n
  if (Array.isArray(data) && data.length > 0) {
    const firstItem = data[0];
    
    // Try different fields in order of preference
    if (firstItem.message) return firstItem.message;
    if (firstItem.text) return firstItem.text;
    if (firstItem.response) return firstItem.response;
    if (firstItem.output?.tool_calls?.[0]?.args?.text) {
      return firstItem.output.tool_calls[0].args.text;
    }
    if (firstItem.output) return JSON.stringify(firstItem.output);
  }
  
  // Handle direct object response
  if (typeof data === 'object' && data !== null) {
    if (data.message) return data.message;
    if (data.text) return data.text;
    if (data.response) return data.response;
    if (data.output) {
      if (typeof data.output === 'string') return data.output;
      if (data.output.message) return data.output.message;
      if (data.output.text) return data.output.text;
    }
  }
  
  // Handle string response
  if (typeof data === 'string') return data;
  
  // No response found
  return '';
}
