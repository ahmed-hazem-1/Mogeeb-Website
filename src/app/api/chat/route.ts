import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json({
        error: 'Message is required',
        status: 'error'
      }, { status: 400 })
    }

    // Get webhook URL - Use test URL from env variable
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 
                       'https://mogeeb.shop/webhook-test/d581640e-383a-4eb1-bbb6-a8ac9be9ad40'
    
    console.log('=== Chat API Request ===')
    console.log('Webhook URL:', webhookUrl)
    console.log('Message:', body.message)
    console.log('Session ID:', body.sessionId)
    console.log('Timeout: 60 seconds')
    
    // Make ONE call to the webhook with extended timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout
    
    const sessionId = body.sessionId || Date.now().toString()
    const chatId = body.chatId || Date.now().toString()
    
    console.log('Using Session ID:', sessionId)
    console.log('Using Chat ID:', chatId)
    console.log('Types - Session ID:', typeof sessionId, ', Chat ID:', typeof chatId)
    
    let response
    try {
      console.log('Sending message to n8n webhook...')
      response = await fetch(webhookUrl, {
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
          sessionId: sessionId,
          chatId: chatId
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      console.log('N8N responded with status:', response.status)

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
        
        return NextResponse.json({
          response: botResponse,
          status: 'success'
        })
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
        
        return NextResponse.json({
          response: 'عذراً، خدمة الدردشة غير متاحة حالياً. يرجى المحاولة مرة أخرى.',
          status: 'error'
        }, { status: response.status })
      }
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error('Fetch error:', fetchError)
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({
          response: 'عذراً، استغرق الرد وقتاً أطول من المتوقع. حاول مرة أخرى.',
          status: 'error'
        }, { status: 408 })
      }
      
      return NextResponse.json({
        response: 'عذراً، مشكلة في الاتصال. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.',
        status: 'error'
      }, { status: 503 })
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error)
    
    return NextResponse.json({
      response: 'عذراً، حدث خطأ في معالجة طلبك. حاول مرة أخرى.',
      status: 'error'
    }, { status: 500 })
  }
}

/**
 * Extract text response from various n8n response formats
 */
function extractResponse(data: any): string {
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