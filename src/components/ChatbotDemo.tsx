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
      text: 'مرحباً! أنا موجيب، مساعدك الذكي باللغة العربية. كيف يمكنني مساعدتك اليوم؟',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const demoResponses = [
    'شكراً لك على سؤالك! يمكنني مساعدتك في العديد من المجالات باللغة العربية.',
    'أنا هنا لمساعدتك! ما هو الموضوع الذي تود مناقشته؟',
    'بالطبع! يسعدني أن أساعدك. هل لديك أي استفسارات أخرى؟',
    'موجيب يستطيع فهم اللغة العربية بشكل متقدم. كيف يمكنني خدمتك؟',
    'رائع! أحب التحدث معك. ما هي اهتماماتك الرئيسية؟',
    'يمكنني مساعدتك في الترجمة، التلخيص، والإجابة على الأسئلة باللغة العربية.',
    'أستطيع فهم السياق والمشاعر في النصوص العربية بدقة عالية.'
  ]

  const quickQuestions = [
    'ما هي خدماتكم؟',
    'كيف تعمل تقنية الذكاء الاصطناعي؟',
    'هل تدعمون اللهجات المحلية؟'
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

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: demoResponses[Math.floor(Math.random() * demoResponses.length)],
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <section id="demo" className="section-large-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
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
              className="text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Experience the Power of{' '}
              <span className="gradient-text">Arabic AI</span>
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Try our advanced Arabic AI chatbot powered by state-of-the-art NLP models. 
              Experience natural conversations in Arabic with human-like understanding and responses.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Try these questions:</h3>
              <div className="flex flex-wrap gap-3">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="px-4 py-2 bg-gray-100 hover:bg-brand-orange hover:text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-brand-teal/5 rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-brand-orange/5 rounded-3xl transform -rotate-3"></div>
            
            {/* Chatbot Container */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden h-[600px] flex flex-col">
              {/* Header */}
              <div className="gradient-bg p-6 flex-shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="w-7 h-7 text-brand-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">موجيب AI Assistant</h3>
                    <p className="text-white/90 text-sm">مساعدك الذكي باللغة العربية</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        message.isUser ? 'gradient-bg' : 'bg-white border-2 border-brand-orange'
                      }`}>
                        {message.isUser ? 
                          <User className="w-4 h-4 text-white" /> : 
                          <Bot className="w-4 h-4 text-brand-orange" />
                        }
                      </div>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        message.isUser 
                          ? 'gradient-bg text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <p className="text-sm leading-relaxed" dir={message.isUser ? 'ltr' : 'rtl'}>
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
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white border-2 border-brand-orange rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
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
              <div className="flex-shrink-0 p-6 bg-white border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300"
                    dir="rtl"
                  />
                  <motion.button
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    className="gradient-bg p-4 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 bg-white shadow-lg rounded-full px-4 py-2 border border-gray-200"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Demo</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}