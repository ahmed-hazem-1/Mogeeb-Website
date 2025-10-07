'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Play, CheckCircle, Cloud, Brain, Workflow, Globe, Cpu } from 'lucide-react'

export default function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen bg-white flex items-center section-large-padding pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center px-6 py-3 bg-brand-orange/10 rounded-full border border-brand-orange/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-brand-orange mr-3" />
            <span className="text-brand-orange font-semibold text-sm">2025 • Smart Chatbots with LLMs</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Smart Chatbots{' '}
              <span className="block">
                <span className="gradient-text">for Every Purpose</span>
              </span>
              <span className="block text-5xl lg:text-6xl">
                Powered by LLMs
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Creating smart chatbots for different purposes using advanced LLM technology.{' '}
              <span className="text-brand-orange font-semibold">Reduce costs and save time</span> for SMEs and social media pages with intelligent automation.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button 
              onClick={scrollToDemo}
              className="btn-primary text-lg px-8 py-4 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 mr-3" />
              Try Live Demo
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              className="btn-outline text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { number: '24/7', label: 'Available' },
              { number: '95%', label: 'Accuracy' },
              { number: '<1s', label: 'Response' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-4xl font-bold gradient-text">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="pt-16 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p className="text-gray-500 font-medium">Technology partners powering our solutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                { name: 'Google Cloud', icon: Cloud },
                { name: 'Gemini AI', icon: Brain },
                { name: 'n8n Platform', icon: Workflow },
                { name: 'MENA SMEs', icon: Globe },
                { name: 'LLM Technology', icon: Cpu }
              ].map((partner, index) => {
                const IconComponent = partner.icon
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-gray-400 font-semibold text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 0.6, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{partner.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-40 right-20 w-24 h-24 bg-brand-teal/10 rounded-full blur-2xl"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-40 left-20 w-20 h-20 bg-brand-orange/10 rounded-full blur-xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}