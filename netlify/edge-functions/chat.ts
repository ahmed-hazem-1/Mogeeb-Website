import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });
  }

  try {
    const body = await request.json();
    const { message, timestamp, userId, sessionId } = body;

    // Validate input
    if (!message || message.trim().length === 0) {
      return new Response(JSON.stringify({
        response: 'عذراً، لم أستطع فهم رسالتك. حاول مرة أخرى.',
        status: 'error'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Get webhook URL from environment
    const webhookUrl = Deno.env.get('N8N_WEBHOOK_URL') || 'https://mogeeb.shop/webhook/d581640e-383a-4eb1-bbb6-a8ac9be9ad40';
    
    // Forward the request to the n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mogeeb-Website/1.0'
      },
      body: JSON.stringify({
        message: message.trim(),
        timestamp: timestamp || new Date().toISOString(),
        userId: userId || 'demo-user',
        sessionId: sessionId || `demo-${Date.now()}`
      })
    });

    if (response.ok) {
      const data = await response.json();
      
      // Handle n8n response structure
      let botResponse = 'عذراً، حدث خطأ في معالجة طلبك.';
      
      try {
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
          if (firstItem.text) {
            botResponse = firstItem.text;
          } else if (firstItem.response) {
            botResponse = firstItem.response;
          } else if (firstItem.message) {
            botResponse = firstItem.message;
          }
        } else if (data.text) {
          botResponse = data.text;
        } else if (data.response) {
          botResponse = data.response;
        } else if (data.message) {
          botResponse = data.message;
        } else if (typeof data === 'string') {
          botResponse = data;
        }
      } catch (parseError) {
        console.error('Error parsing n8n response:', parseError);
        botResponse = 'أهلاً بك! أنا مُجيب وجاهز لأساعدك. إيه اللي تحب تطلبه؟';
      }
      
      return new Response(JSON.stringify({
        response: botResponse,
        status: 'success'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      console.error('N8N webhook error:', response.status, response.statusText);
      
      return new Response(JSON.stringify({
        response: 'عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.',
        status: 'error'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error) {
    console.error('Error in chat function:', error);
    
    return new Response(JSON.stringify({
      response: 'عذراً، حدث خطأ في معالجة طلبك. حاول مرة أخرى لاحقاً.',
      status: 'error'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

export const config = {
  path: "/api/chat"
};