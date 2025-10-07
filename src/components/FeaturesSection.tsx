'use client'

import { motion } from 'framer-motion'
import { Bot, MessageSquare, Zap, Globe, Shield, Cpu } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'Smart Arabic Chatbots',
    description: 'Intelligent conversational bots for Arabic users, built with advanced LLMs. Multi-platform support for websites, social media, and mobile apps with intelligent lead capture.',
    color: 'bg-blue-500'
  },
  {
    icon: MessageSquare,
    title: 'Social Media Integration',
    description: 'Seamless integration with social media platforms to automate customer interactions, respond to comments, and manage conversations across multiple channels.',
    color: 'bg-emerald-500'
  },
  {
    icon: Zap,
    title: 'AI-Driven Automations',
    description: 'Custom workflow automation solutions with n8n integration that streamline business operations, reduce manual work, and eliminate repetitive tasks.',
    color: 'bg-orange-500'
  },
  {
    icon: Globe,
    title: 'MENA Region Focus',
    description: 'Specialized solutions designed specifically for Middle East and North Africa markets, understanding local business needs and cultural context.',
    color: 'bg-purple-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Solutions',
    description: 'Helping companies reduce time and costs through intelligent automation, streamlined workflows, and efficient customer service management.',
    color: 'bg-indigo-500'
  },
  {
    icon: Cpu,
    title: 'Real-time Intelligence',
    description: 'Lightning-fast chatbot responses powered by cloud infrastructure, providing instant customer support and engagement across all platforms.',
    color: 'bg-green-500'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="section-large-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            AI-Powered Smart Chatbots for{' '}
            <span className="gradient-text">Every Purpose</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our smart chatbot solutions help SMEs and enterprises reduce costs and save time through intelligent automation, social media integration, and custom workflow solutions.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                className="group card-hover cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* Icon */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {IconComponent && <IconComponent className="w-8 h-8 text-white flex-shrink-0" />}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-orange transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <motion.div 
                  className="mt-6 flex items-center text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="font-semibold mr-2">Learn More</span>
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
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center pt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to transform your business with Arabic AI? Join hundreds of thousands of users.
          </p>
          <motion.button 
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your AI Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}