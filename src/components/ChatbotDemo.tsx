'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'أهلاً وسهلاً في مطعم الأصالة! أنا مُجيب، هرد على كل استفساراتك وآخذ أوردرك. إيه اللي تحب تطلبه النهاردة؟',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    'عايز كيلو كفتة وشوية رز',
    'الملوخية متوفرة النهاردة؟',
    'أسعار المشويات إيه؟',
    'التوصيل بكام؟'
  ]

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    try {
      // Use Netlify function for API calls (works in both dev and production)
      const apiEndpoint = '/.netlify/functions/chat'
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageText,
          timestamp: new Date().toISOString(),
          userId: 'demo-user',
          sessionId: `demo-${Date.now()}`
        })
      })

      if (response.ok) {
        const data = await response.json()
        const botResponse: Message = {
          id: messages.length + 2,
          text: data.response || 'عذراً، لم أتمكن من معالجة طلبك.',
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
      } else {
        // Error response from server
        const errorData = await response.json().catch(() => ({}))
        const botResponse: Message = {
          id: messages.length + 2,
          text: errorData.response || 'عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.',
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Network or other error
      const botResponse: Message = {
        id: messages.length + 2,
        text: 'عذراً، حدث خطأ في الاتصال. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <section id="demo" className="section-large-padding bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6 lg:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-brand-orange/10 rounded-full border border-brand-orange/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4 text-brand-orange mr-2" />
              <span className="text-brand-orange font-medium text-sm">Live Interactive Demo</span>
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
            >
              اتكلم مع{' '}
              <span className="gradient-text">مُجيب</span> دلوقتي
            </motion.h2>

            <motion.p 
              className="text-lg md:text-xl text-gray-600 arabic-text leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '2.2' }}
            >
              جرب بنفسك إزاي مُجيب بيرد على العملاء ويسجل الأوردرات. 
              <br /><br />
              اكتب أي حاجة عادية كأنك عميل عايز يطلب أكل، وشوف إزاي هيفهمك ويساعدك.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>جرب الأمثلة دي:</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="px-3 md:px-4 py-2 md:py-3 bg-gray-100 hover:bg-brand-orange hover:text-white rounded-xl text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 touch-target"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ minHeight: '44px', fontFamily: 'Cairo, system-ui, sans-serif' }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-orange">95%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-teal">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-orange">&lt;1s</div>
                <div className="text-sm text-gray-600">Response</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Chatbot Interface */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-brand-teal/5 rounded-3xl transform rotate-1 hidden md:block"></div>
            <div className="absolute inset-0 bg-brand-orange/5 rounded-3xl transform -rotate-1 hidden md:block"></div>
            
            {/* Chatbot Container */}
            <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-gray-100 overflow-hidden h-[500px] md:h-[600px] flex flex-col">
              {/* Header */}
              <div className="gradient-bg p-4 md:p-6 flex-shrink-0">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 md:w-7 md:h-7 text-brand-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-base md:text-lg english-text">مجيب AI Assistant</h3>
                    <p className="text-white/90 text-xs md:text-sm arabic-text">مساعدك الذكي باللغة العربية</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs md:text-sm font-medium english-text">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`flex items-start space-x-2 md:space-x-3 max-w-[85%] md:max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
                        message.isUser ? 'gradient-bg' : 'bg-white border-2 border-brand-orange'
                      }`}>
                        {message.isUser ? 
                          <User className="w-4 h-4 md:w-5 md:h-5 text-white" /> : 
                          <Bot className="w-4 h-4 md:w-5 md:h-5 text-brand-orange" />
                        }
                      </div>
                      <div className={`p-3 md:p-4 rounded-2xl shadow-sm ${
                        message.isUser 
                          ? 'gradient-bg text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <p className="text-sm md:text-sm leading-relaxed arabic-text" dir={message.isUser ? 'ltr' : 'rtl'} style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-white border-2 border-brand-orange rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="w-4 h-4 md:w-5 md:h-5 text-brand-orange" />
                      </div>
                      <div className="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex-shrink-0 p-3 md:p-6 bg-white border-t border-gray-200">
                <div className="flex space-x-2 md:space-x-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1 p-3 md:p-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300 text-sm md:text-base arabic-text touch-target"
                    dir="rtl"
                    style={{ fontFamily: 'Cairo, system-ui, sans-serif', minHeight: '48px' }}
                  />
                  <motion.button
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    className="gradient-bg p-3 md:p-4 rounded-xl md:rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 touch-target"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ minWidth: '48px', minHeight: '48px' }}
                  >
                    <Send className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-2 md:-top-4 -right-2 md:-right-4 bg-white shadow-lg rounded-full px-3 md:px-4 py-2 border border-gray-200 hidden sm:block"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm font-medium text-gray-700 english-text">Live Demo</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}