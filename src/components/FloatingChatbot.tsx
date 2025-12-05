'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageCircle, X, Minimize2, Maximize2, Bot } from 'lucide-react'
import MarkdownRenderer from './MarkdownRenderer'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'أهلاً وسهلاً! 👋 أنا مُجيب، هنا عشان أساعدك وأرد على كل استفساراتك. إيه اللي تحب تعرفه عننا؟',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const sessionIdRef = useRef<string>('')
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('mogeeb_chat_session')
    if (storedSessionId) {
      sessionIdRef.current = storedSessionId
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
      sessionIdRef.current = newSessionId
      localStorage.setItem('mogeeb_chat_session', newSessionId)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearTimeout(typingIntervalRef.current)
      }
    }
  }, [])

  // Animate typing effect for streaming messages
  const animateTyping = (fullText: string, messageId: string) => {
    let charIndex = 0
    let displayedText = ''

    const typeNextCharacter = () => {
      if (charIndex < fullText.length) {
        displayedText += fullText[charIndex]
        charIndex++

        // Update the message with animated text
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, text: displayedText } : msg
          )
        )

        // Continue typing with 8ms delay between characters
        typingIntervalRef.current = setTimeout(typeNextCharacter, 8)
      } else {
        // Typing complete
        setIsLoading(false)
      }
    }

    typeNextCharacter()
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const response = await fetch('https://mogeeb.shop/webhook/mogeeb_website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputText.trim(),
          sessionId: sessionIdRef.current,
          stream: true,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`)
      }

      // Handle streaming response with ReadableStream
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let fullResponse = ''
      let buffer = ''

      // Read stream chunks
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Decode chunk and add to buffer
        const chunk = decoder.decode(value, { stream: true })
        buffer += chunk

        // Parse complete newline-delimited JSON lines
        const lines = buffer.split('\n')
        buffer = lines[lines.length - 1] // Keep incomplete line in buffer

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim()
          if (!line) continue

          try {
            const jsonData = JSON.parse(line)
            if (jsonData.type === 'item' && jsonData.content) {
              fullResponse += jsonData.content
            }
          } catch (e) {
            console.error('JSON parse error:', e, 'Line:', line)
          }
        }
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        try {
          const jsonData = JSON.parse(buffer)
          if (jsonData.type === 'item' && jsonData.content) {
            fullResponse += jsonData.content
          }
        } catch (e) {
          console.error('Final buffer parse error:', e)
        }
      }

      if (fullResponse) {
        const botMessageId = `bot_${Date.now()}`
        
        // Add message with empty text first
        const botMessage: Message = {
          id: botMessageId,
          text: '',
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])

        // Start typing animation with the full response
        animateTyping(fullResponse, botMessageId)
      } else {
        const errorMessage: Message = {
          id: `error_${Date.now()}`,
          text: 'عذراً، لم نستطع الحصول على رد. حاول مرة أخرى.',
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: 'عذراً، حدث خطأ في الاتصال. تأكد من اتصالك بالإنترنت.',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    'مين أنتم؟',
    'كيف بتشتغلوا؟',
    'التوصيل متاح فين؟'
  ]

  const handleQuickQuestion = (question: string) => {
    setInputText(question)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 p-4 bg-brand-orange hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-brand-orange text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/20 rounded-lg flex items-center justify-center">
                  <img src="/mogeeb-logo.svg" alt="Mogeeb" className="w-6 h-6 object-contain rounded-md" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>
                    مُجيب
                  </h3>
                  <p className="text-xs text-white/80">متاح الآن</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                  ref={messagesContainerRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser
                            ? 'bg-brand-orange text-white rounded-br-none'
                            : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                        }`}
                      >
                        {message.isUser ? (
                          <p className="text-sm leading-relaxed" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>
                            {message.text}
                          </p>
                        ) : (
                          <div className="text-sm" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>
                            <MarkdownRenderer content={message.text} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="bg-white text-gray-900 rounded-lg rounded-bl-none border border-gray-200 px-4 py-2">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Questions - Only show when minimized or at start */}
            <AnimatePresence>
              {isMinimized || messages.length <= 1 ? null : (
                <motion.div
                  className="hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>

            {/* Input Area */}
            {!isMinimized && (
              <motion.div
                className="border-t border-gray-200 p-4 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Quick Questions */}
                {messages.length <= 1 && (
                  <div className="mb-3 space-y-2">
                    {quickQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full text-left text-xs px-3 py-2 rounded-lg bg-gray-100 hover:bg-brand-orange/10 text-gray-700 hover:text-brand-orange transition-colors"
                        style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="اكتب رسالتك..."
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange disabled:bg-gray-100 text-right"
                    style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className="p-2 bg-brand-orange hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
