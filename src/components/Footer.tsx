'use client'

import { motion } from 'framer-motion'
import { Linkedin, MessageCircle, Mail } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const contactMethods = [
    {
      name: 'واتساب',
      icon: MessageCircle,
      href: 'https://wa.me/201275012177',
      color: 'bg-green-600 hover:bg-green-700',
  description: 'اتصل بنا فوراً وتكلم معانا'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/company/mogeeb-ai',
      color: 'bg-blue-600 hover:bg-blue-700',
  description: 'تابعنا على لينكد إن'
    },
    {
      name: 'الإيميل',
      icon: Mail,
      href: 'mailto:career.mogeeb.ai@gmail.com',
      color: 'bg-orange-600 hover:bg-orange-700',
  description: 'ابعتلنا رسالة'
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Us Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              اتصل بنا
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              جاهز تبدأ؟ كلمنا دلوقتي ونشوف إزاي مُجيب ممكن يساعد مطعمك أو كافيهك.
            </motion.p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <motion.a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 group-hover:border-gray-600 transition-all duration-300">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl ${method.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors duration-300">
                      {method.name}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {method.description}
                    </p>
                    
                    <motion.div 
                      className="mt-6 flex items-center justify-center text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="font-semibold mr-2">Get in Touch</span>
                      <motion.svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.a>
              )
            })}
          </div>

          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                  <Image 
                    src="/logo.svg"
                    alt="Mogeeb.ai Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white english-text" style={{ fontFamily: 'Inter, system-ui, sans-serif', margin: '1rem' }}>mogeeb.ai</span>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-400">
                © 2025 Mogeeb.ai. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Available 24/7</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}