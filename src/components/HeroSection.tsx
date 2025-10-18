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
            style={{ marginTop: '1rem' }}
          >
            <Sparkles className="w-5 h-5 text-brand-orange mr-3" />
            <span className="text-brand-orange font-semibold text-sm">خصيصاً للمطاعم والكافيهات المصرية</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 arabic-text" style={{ fontFamily: 'Cairo, Tajawal, system-ui, sans-serif', lineHeight: '1.6', marginBottom: '2rem' }}>
              مساعدك الذكي{' '}
              <span className="block" style={{ marginTop: '1rem' }}>
                <span className="gradient-text">وصل أخيراً</span>
              </span>
              <span className="block text-4xl lg:text-5xl font-semibold" style={{ marginTop: '1.5rem', lineHeight: '1.8' }}>
                حوّل رسايل العملاء لأوردرات.. أوتوماتيك
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto arabic-text" style={{ fontFamily: 'Cairo, system-ui, sans-serif', lineHeight: '2.5', marginBottom: '2rem' }}>
              ماتشيلش هم الأوردرات تاني. <span className="text-brand-orange font-semibold">"مُجيب"</span> هيرد على العملاء ويسجل الأوردرات بدالك، 
              حتى لو كانوا بيتكلموا باللهجة المصرية العادية.
              <br /><br />
              <span className="text-brand-teal font-semibold">ركز في خدمة زباينك اللي في المحل، وسيب مُجيب يهتم بأوردرات التليجرام والواتساب.</span>
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
              className="btn-primary btn-arabic text-lg px-8 py-4 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
            >
              <Play className="w-6 h-6 mr-3" />
              جرب مُجيب دلوقتي
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              className="btn-outline btn-arabic text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              اعرف إزاي يشتغل
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
              { number: '24/7', label: 'شغال طول الوقت' },
              { number: '0', label: 'أخطاء في الأوردرات' },
              { number: 'فوري', label: 'رد على العميل' },
              { number: '100%', label: 'بيفهم المصري' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-4xl font-bold gradient-text arabic-number" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>{stat.number}</div>
                <div className="text-gray-600 font-medium arabic-text" style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>{stat.label}</div>
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