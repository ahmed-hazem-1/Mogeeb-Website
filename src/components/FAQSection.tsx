'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What makes Mogeeb.ai different from other chatbot platforms?',
    answer: 'Mogeeb.ai specializes in creating smart chatbots for different purposes using advanced LLM technology. We focus specifically on Arabic language processing with deep understanding of cultural context and MENA region business needs.'
  },
  {
    question: 'How accurate is the Arabic language processing?',
    answer: 'Our smart chatbots achieve 95% accuracy rates using advanced Large Language Models and custom Arabic training. We continuously improve our algorithms to provide the best conversational experience for Arabic-speaking users.'
  },
  {
    question: 'Can Mogeeb.ai integrate with existing business systems?',
    answer: 'Yes! Mogeeb.ai offers seamless integration with popular platforms through our n8n workflow automation. We support APIs, webhooks, social media platforms, and custom integrations to fit into your existing business infrastructure.'
  },
  {
    question: 'What kind of support do you provide for businesses?',
    answer: 'We provide dedicated support in both Arabic and English, with understanding of local business practices and cultural context. Our support includes technical assistance, chatbot optimization, and ongoing consultation for MENA market success.'
  },
  {
    question: 'Is my data secure with Mogeeb.ai?',
    answer: 'Absolutely. We employ enterprise-grade security with end-to-end encryption and robust data protection measures. Your conversations and data are processed securely on cloud infrastructure with 99.9% uptime guarantee.'
  },
  {
    question: 'How quickly can I implement Mogeeb.ai chatbots?',
    answer: 'Implementation typically takes 1-3 days for basic chatbot setup and 1-2 weeks for custom configurations. Our team provides hands-on support throughout the process, ensuring smooth integration and immediate value delivery.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-large-padding bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Find answers to common questions about our Arabic AI solutions and services
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-brand-orange" />
                  ) : (
                    <Plus className="w-6 h-6 text-brand-teal" />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <motion.p 
                        className="text-gray-600 leading-relaxed"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center pt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? Our Arabic AI experts are here to help.
          </p>
          <motion.button 
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Our Experts
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}